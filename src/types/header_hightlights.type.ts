export type HeaderHighlight = {
  id: number;
  text: string;
  type: "promo" | "info" | "inspiration";
  active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
};

export type HeaderHighlights = HeaderHighlight[];
