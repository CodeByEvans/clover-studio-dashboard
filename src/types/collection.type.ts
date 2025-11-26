export type Collections = Collection[];

export type Collection = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  order: number;
  created_at: string;
  updated_at: string;
};
