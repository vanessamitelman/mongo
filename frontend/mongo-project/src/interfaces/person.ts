import { HomeI } from './home';

export interface PersonI {
  id: string;
  name: string;
  bio?: string | null;
  age?: number;
  homes?: HomeI[];
}
