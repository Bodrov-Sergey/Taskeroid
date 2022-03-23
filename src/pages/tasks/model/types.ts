export type Document = {
  id: number;
  url: string;
  name: string;
  status: 'waiting' | 'canceled' | 'ok';
  description?: string;
  is_archived?: boolean;
};
