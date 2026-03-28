import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limitParam = searchParams.get('limit');
    const category = searchParams.get('category');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query parameter "q" is required.' },
        { status: 400 }
      );
    }

    if (query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters.' },
        { status: 400 }
      );
    }

    const limit = Math.min(Math.max(parseInt(limitParam || '20', 10), 1), 100);

    // Sanitize the query for full-text search
    const sanitized = query
      .trim()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .join(' & ');

    // Try full-text search first
    let dbQuery = supabase
      .from('products')
      .select('*')
      .textSearch('name', sanitized, { type: 'websearch', config: 'english' });

    if (category) {
      dbQuery = dbQuery.eq('category', category);
    }

    let { data: products, error } = await dbQuery.limit(limit);

    // Fallback to ilike if full-text search returns no results
    if ((!products || products.length === 0) && !error) {
      const ilikePattern = `%${query.trim()}%`;

      let fallbackQuery = supabase
        .from('products')
        .select('*')
        .or(`name.ilike.${ilikePattern},description.ilike.${ilikePattern}`);

      if (category) {
        fallbackQuery = fallbackQuery.eq('category', category);
      }

      const fallbackResult = await fallbackQuery.limit(limit);
      products = fallbackResult.data;
      error = fallbackResult.error;
    }

    if (error) {
      console.error('Search query error:', error);
      return NextResponse.json(
        { error: 'Search failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: products || [],
      query: query.trim(),
      count: products?.length || 0,
    });
  } catch (error) {
    console.error('Search GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
