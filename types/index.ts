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
}
