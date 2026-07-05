export type Order = {
  id: string;
  type: string;
  card: string;
  date: string;
  amount: string;
  cardCode?: string | null;
  cardPin?: string | null;
  quantity?: number;
  status?: string;
  brandImage?: string | null;
  createdAt?: string;
};
