import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { SortOption } from '@/types';

const VALID_SORT_OPTIONS: SortOption[] = ['newest', 'price-low', 'price-high', 'rating', 'popular'];

function getSortConfig(sort: string): { column: string; ascending: boolean } {
  switch (sort) {
    case 'price-low':
      return { column: 'price', ascending: true };
    case 'price-high':
      return { column: 'price', ascending: false };
    case 'rating':
      return { column: 'rating', ascending: false };
    case 'popular':
      return { column: 'review_count', ascending: false };
    case 'newest':
    default:
      return { column: 'created_at', ascending: false };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const sort = searchParams.get('sort') || 'newest';
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const featured = searchParams.get('featured');
    const inStock = searchParams.get('in_stock');

    // Validate sort option
    if (!VALID_SORT_OPTIONS.includes(sort as SortOption)) {
      return NextResponse.json(
        { error: `Invalid sort option. Must be one of: ${VALID_SORT_OPTIONS.join(', ')}` },
        { status: 400 }
      );
    }

    const limit = Math.min(Math.max(parseInt(limitParam || '20', 10), 1), 100);
    const offset = Math.max(parseInt(offsetParam || '0', 10), 0);

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }

    if (subcategory) {
      query = query.eq('subcategory', subcategory);
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min) && min >= 0) {
        query = query.gte('price', min);
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max) && max >= 0) {
        query = query.lte('price', max);
      }
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (inStock === 'true') {
      query = query.eq('in_stock', true);
    }

    // Apply sorting
    const { column, ascending } = getSortConfig(sort);
    query = query.order(column, { ascending });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: products, error, count } = await query;

    if (error) {
      console.error('Products query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: products || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
