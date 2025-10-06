export type Item = {
  id?: number;
  name?: string;
  qty?: number;
  price?: number;
};

export type Plan = {
  id?: number;
  year?: number;
  month?: number;
  status?: null | "planning" | "shopping" | "completed";
  items?: Item[];
};
