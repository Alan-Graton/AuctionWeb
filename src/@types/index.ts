export interface Bids {
  id: number;
  id_item: number;
  price: number;
  author: string;
}

export type ItemStatus = "active" | "inactive";

export interface Item {
  id: number;
  title: string;
  description: string;
  status: ItemStatus;
  bids: Bids[];
}
