export interface HomeI {
  id: string;
  address: string;
  city?: string;
  rooms: number;
  persons?: {
    id: string;
    name: string;
  }[];
}
