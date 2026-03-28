import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'heritage-linen-blazer',
    name: 'Heritage Linen Structured Blazer',
    description:
      'A masterfully tailored blazer crafted from premium European linen. Features a structured shoulder, single-button closure, and hand-finished lapels for an effortlessly refined silhouette.',
    price: 345,
    compareAtPrice: 420,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCl7RJHnQpA8LnfYYbVy23qQxNqFiGsfa88iEbrUozaVfs8OkPOnLUd5-_pPRMqRoU3BT1xe7dv9gsY8MwJnQBEZ-SPMvBXdXqTkBmQp3tCNx0wSNbmIPZy5nqTkDWvJ-JGYCNZFj_hI3rGfA9qYvapw_9zERTO2l2FzcvF_rPuAzES0GkJ11vnntDPBmuE-q21ENw5unnBoMOF5FVtmAVITbjW_9Jp3ZQgSTiqyTpE7brBk0iqCp1IqfrPCln4nEJnTxLIgsBTMg',
    ],
    category: 'Outerwear',
    tags: ['blazer', 'linen', 'structured', 'new-season', 'editorial-pick'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Ivory', hex: '#FFFFF0' },
    ],
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    featured: true,
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'merino-crewneck',
    name: 'Merino Crewneck',
    description:
      'Ultra-soft extra-fine merino wool crewneck knitted in Italy. The relaxed fit and ribbed cuffs deliver understated luxury for layering or wearing solo.',
    price: 185,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaxzGcNGmiX0pc6Lbfy8coBM1QS9caCqaCpHucO_poO50kGefrFIow1etslDR0TtXKCZF3IrWBiZjuP_RzAXSILJ9i-PqU0k_GLK7zMN3SnIe1A4x5ONRAy7dtH_pcQAXtv_dAqUu1s_yvH_KDGU2I7zHD58qukpNN8h7YdWEYMib_BabFWMGxMLzITVL2PKdnwhrgknI4lcRfA2C2cU_hefIRN-JF0jHqsUlTDN17JC3TZ4bH5JuBdl0iTXbR1309p3MJeWFMgw',
    ],
    category: 'Knitwear',
    tags: ['merino', 'knitwear', 'crewneck', 'essentials'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Forest', hex: '#228B22' },
      { name: 'Oatmeal', hex: '#D2C6A5' },
      { name: 'Navy', hex: '#000080' },
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    featured: true,
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'heirloom-totebag',
    name: 'Heirloom Totebag',
    description:
      'Handcrafted from full-grain vegetable-tanned leather, this tote develops a rich patina over time. Unlined interior with a magnetic closure and interior zip pocket.',
    price: 310,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCXaEv-Xo0_Cu4l0j-TO_V96q9TNG2HTo3gBy0wZLTGG6XTHCwV35M1SR6ZemIO5qyiaaVE_6qHY3KDyUOn8I0rox3AMuzxtaRXZCzB-h9zrRJXBnUepum5q2wTt-jkzro4ZCKoZhuaJnA2AHsB-uhPeYtnXWBQJDSQCn06l0BBzStEZSyJn6Pv7uOCgSIAR1f_JEeo5tsVrwYWZNKoqVbwRAAjEo9BT3VF0IaWhYk-sGnmu8CBlvEsF0THWwM9wnq_8mFFCobQ',
    ],
    category: 'Accessories',
    tags: ['leather', 'tote', 'handcrafted', 'heritage'],
    sizes: ['One Size'],
    colors: [
      { name: 'Caramel', hex: '#FFD59A' },
      { name: 'Espresso', hex: '#3C1414' },
    ],
    rating: 4.9,
    reviewCount: 63,
    inStock: true,
    featured: true,
    createdAt: '2026-02-20T00:00:00Z',
  },
  {
    id: 'studio-sneaker',
    name: 'Studio Sneaker',
    description:
      'Minimalist low-profile sneaker crafted from premium Italian calfskin leather with a cushioned rubber sole. Clean lines and a timeless design for everyday wear.',
    price: 125,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBR5sbazr06g7ONdxFCQo-UZ1Z8roEKHHsmNSPfW3z4sJ4SKDRozA-v3JiTeQ0c85fPGV986UsSKo0Yufu8LjSN1Ir44cGeRroB_hBxc1tGfDN0n5rqrqtkzvgW8BnC5_Wk6NgU-MYOnAhXCSNVV1t4nzf8lzPH-I61MkSz9upm7k2AiSo1XDFQK5EUldv0iP8XQgD11Pu5PaBCJvzi9-xirpWZVOGt_XUX6CRWxGf2-1klTTtQaJoJ-iPWAF0RgtfUfJAalMY7TQ',
    ],
    category: 'Footwear',
    tags: ['sneaker', 'leather', 'minimalist', 'everyday'],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Pebble', hex: '#BDB8AD' },
    ],
    rating: 4.8,
    reviewCount: 201,
    inStock: true,
    featured: true,
    createdAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'sculpted-cotton-vest',
    name: 'Sculpted Cotton Vest',
    description:
      'Architectural cotton vest with a sculpted hem and hidden snap closure. A versatile layering piece that bridges the gap between structured and relaxed dressing.',
    price: 128,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYY6xGVDVV6WbxbvBtMEGlHU8QfOv5g0HD_hFUcyXgFflUM2Ir-yCwh9hSLDlL9UbkcU6_cMuhCUdz_iPj-yM_WNG8B7gsWrr0rmJwzResI9N45P7W1PirfreheO-fpbGzwAY6-GI2mQQzF6Pe2dMVNvP8TIuerzRTCA9AVQ_KbsnyW8NYJGHICY8LKeijmd8bELT7-uyIZbVUcYIa9m0RN73pyP5FwzRemaVVSW6Cj_cAQ--r6Sziw8h8Th_HCEVpktDEayQS-g',
    ],
    category: 'Minimalist',
    tags: ['vest', 'cotton', 'layering', 'minimalist'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Stone', hex: '#928E85' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    featured: false,
    createdAt: '2026-03-05T00:00:00Z',
  },
  {
    id: 'camel-drape-overcoat',
    name: 'Camel Drape Overcoat',
    description:
      'A statement overcoat in sumptuous camel wool-cashmere blend. The draped silhouette falls below the knee with a single-button closure and notch lapels.',
    price: 345,
    compareAtPrice: 450,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaOmD3Q573VfMT10G8pJfOjYDDaz_17WN6qU1yLpmvHsLUItfwNttVQte-IyK-uAcaCx_gT_zWyvscp4EnOnHTC7dqUjcaiFkPxjKBZH5n3O0gBfnUwet6N3xWvYI9k1hOMNrOiBCzzO9g3JsuYxn2NjUZXHkG1T-s72aTF17irAALnXGz3j6z1WPCrAoq3aXMqF1MjsXcJOKwRFYjJkK-ReGMfGs9lO1JmWrmkNjh-9gFwtY1f6IM_cRYsAovVWWuIREJHZyCIQ',
    ],
    category: 'Outerwear',
    tags: ['overcoat', 'camel', 'wool', 'cashmere', 'new'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Charcoal', hex: '#36454F' },
    ],
    rating: 4.8,
    reviewCount: 72,
    inStock: true,
    featured: false,
    createdAt: '2026-03-12T00:00:00Z',
  },
  {
    id: 'pleated-silk-blouse',
    name: 'Pleated Silk Blouse',
    description:
      'Delicately pleated silk blouse with a relaxed fit and concealed button placket. The luminous fabric catches light beautifully for an elevated evening look.',
    price: 189,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxoJi0gVw8VFSusd3gTU8tudgaykxyJCBFzUHBEQUqCY-euDgSCcjhjjl4Wr_FK3LI6sm-vKwy_lXmldwQDP1YX_R8WCYroq5WFPNN-nxfahHZh0CJSth6e-3RJRlhp4_62mashEdv9sw18-WVwfrlZcDJYWuPDCv3xcvLTrTLD00TPLdV2Ka09HLYpCl5lQMmEYOPhJumxrLKiq9DTZScjLANCv0ZcnHaMJ7dpX0nGGX_m82LGmle5BpmRsZ8zThiNJUPqkCUUA',
    ],
    category: 'Evening',
    tags: ['silk', 'blouse', 'pleated', 'evening', 'elegant'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Blush', hex: '#DE5D83' },
      { name: 'Midnight', hex: '#191970' },
    ],
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    featured: false,
    createdAt: '2026-03-08T00:00:00Z',
  },
  {
    id: 'chiffon-maxi-dress',
    name: 'Chiffon Maxi Dress',
    description:
      'Flowing chiffon maxi dress in a soft coral tone with a flattering empire waist and tiered skirt. Fully lined with adjustable spaghetti straps for a custom fit.',
    price: 285,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLdlLiWtagolh9Knakz4mQ9JB2fJuJ0fyCCMFPzMZ82-o4chUfxXjWgRST3_LKtP5Prj_pmiR0UEGEl_LZydfKPIUeQ3gJbDfDnGyxaGrC76ScHfPZMYGjNMYlO9UjO-gm6M9FWLwcV8E9DUiePmn4IBaFUkMY6LqBaA4azPTyUOPRNotpRPWtrZ-Qz9Yh75K7uv_j_XxC6K14XAgpXTjOG5F46-VXW7ckJ4Tq-N0CQiOvCiwiGFQssRi32zNPj6jIknWnzORLwg',
    ],
    category: 'Dresses',
    tags: ['chiffon', 'maxi', 'dress', 'summer', 'coral'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Sage', hex: '#BCB88A' },
      { name: 'Ivory', hex: '#FFFFF0' },
    ],
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    featured: false,
    createdAt: '2026-03-15T00:00:00Z',
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const categories = [
  'Outerwear',
  'Knitwear',
  'Accessories',
  'Footwear',
  'Minimalist',
  'Evening',
  'Dresses',
] as const;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
