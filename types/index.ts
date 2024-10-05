export {};

declare global {
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  interface User {
    id: string;
    username: string;
    password: string;
  }

  interface Listing {
    id: string;
    description: string;
    initialPrice: number;
    open: boolean;
    userId: string;
    bidCount: number;
    bidders?: string[];
    product: Product;
  }

  interface Bid {
    id: string;
    price: number;
    listingId: string;
    userId: string;
  }
}
