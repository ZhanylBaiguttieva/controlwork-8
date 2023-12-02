export interface Quote{
  id: string;
  category: string;
  author: string;
  description: string;
}

export interface ListQuote {
  [id: string]: Quote;
}