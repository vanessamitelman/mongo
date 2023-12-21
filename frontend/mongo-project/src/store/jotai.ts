import { atom } from 'jotai';
import { PersonI } from '../interfaces/person';
import { HomeI } from '../interfaces/home';

export const countAtom = atom(0);

export const idAtom = atom<string | undefined>(undefined);
export const personAtom = atom<PersonI | undefined>(undefined);
export const personListAtom = atom<PersonI[]>([]);

export const homeAtom = atom<HomeI | undefined>(undefined);
export const homeListAtom = atom<HomeI[]>([]);

export const dialogStatusAtom = atom<boolean>(false);

export const isLoadingAtom = atom<boolean>(true);
