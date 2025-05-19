
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dataAiHint?: string;
}

export interface Console extends Product {
  type: 'Standard' | 'Digital Edition';
  storage: string;
}

export interface Game extends Product {
  genre: string;
  platform: string;
  releaseDate: string;
}

export interface Accessory extends Product {
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type CartItem = {
  product: Product;
  quantity: number;
};
