// constants/options.ts
import { PriceRange, Product, Sex, SortKey } from '../types';

//ユーザー登録定数
export const ACCOUNT_FIELDS = [
  { name: 'last_name', label: '姓' },
  { name: 'first_name', label: '名' },
  { name: 'last_name_kana', label: '姓（フリガナ）' },
  { name: 'first_name_kana', label: '名（フリガナ）' },
  { name: 'email', label: 'メールアドレス' },
  { name: 'password', label: 'パスワード' },
  { name: 'tel', label: '電話番号' }
];

export const ADDRESS_FIELDS = [
  { name: 'postal', label: '郵便番号' },
  { name: 'prefecture', label: '都道府県' },
  { name: 'city', label: '市区町村' },
  { name: 'address', label: '番地' },
  { name: 'building', label: 'アパート・マンション・部屋番号' }
];

// Products定数
export const SEX_OPTIONS: Sex[] = ['すべて', 'メンズ', 'レディース', 'ユニセックス'];

export const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: '並び変え', value: 'default' },
  { label: '新着順', value: 'new' },
  { label: '価格の安い順', value: 'price-asc' },
  { label: '価格の高い順', value: 'price-desc' },
];

export const PRICE_RANGE_OPTIONS = [
  { label: '~￥1,000', value: '0-1000' as PriceRange },
  { label: '~￥5,000', value: '0-5000' as PriceRange },
  { label: '~￥10,000', value: '0-10000' as PriceRange },
  { label: '￥10,000以上', value: '10000-' as PriceRange },
];

export const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', '2XL'] as const;

export const CATEGORY_OPTIONS = [
  { id: 'all', name: 'すべて' },
  { id: 'shirt', name: 'シャツ' },
  { id: 'skirt', name: 'スカート' },
  { id: 'jacket', name: 'ジャケット' },
  { id: 'bottoms', name: 'ボトムス' },
  { id: 'outer', name: 'アウター' },
  { id: 'shoes', name: 'シューズ' },
  { id: 'socks', name: '靴下' },   
  { id: 'accessories', name: 'アクセサリー' },
];

export const dummyProducts: Product[] = [
  {
    productId: 'dummy-1',            
    name: 'ダミー商品A',
    price: 1980,
    genreType: 'MAN',                  
    category: {
      categoryId: 'shirt',             
      name: 'シャツ'
    },
    images: ['/images/dummy1.jpg'],    
    summary: 'おしゃれなダミー商品Aの概要',
    detail: 'ダミー商品Aの詳細説明',
    sizes: [
      { code: 'M', name: 'Medium' },
      { code: 'L', name: 'Large' }
    ],
    isFavorite: false                  
  },
  {
    productId: 'dummy-2',
    name: 'ダミー商品B',
    price: 2980,
    genreType: 'WOMAN',
    category: {
      categoryId: 'skirt',
      name: 'スカート'
    },
    images: ['/images/dummy2.jpg'],
    summary: 'おしゃれなダミー商品Bの概要',
    detail: 'ダミー商品Bの詳細説明',
    sizes: [
      { code: 'S', name: 'Small' },
      { code: 'M', name: 'Medium' }
    ],
    isFavorite: false
  },
  {
    productId: 'dummy-3',
    name: 'ダミー商品C',
    price: 9800,
    genreType: 'ALL',
    category: {
      categoryId: 'jacket',
      name: 'ジャケット'
    },
    images: ['/images/dummy3.jpg'],
    summary: 'おしゃれなダミー商品Cの概要',
    detail: 'ダミー商品Cの詳細説明',
    sizes: [
      { code: '1', name: 'M' },
      { code: '2', name: 'L' },
      { code: '3', name: 'XL' }
    ],
    isFavorite: false
  },
];