import { useParams } from 'react-router-dom';
import { trpc } from '../../../trpc';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  dialogStatusAtom,
  homeListAtom,
  idAtom,
  personAtom
} from '../../../store/jotai';
import { AddHouseDialog } from '../../../components/Person/personDetails/addHouseDialog';
import { PersonDetailsMain } from '../../../components/Person/personDetails/personMain';

export function PersonsDetailsPage() {
  const { id } = useParams();
  const [personId, setPersonId] = useAtom(idAtom);
  const [__, setOpenDialog] = useAtom(dialogStatusAtom);
  const [person, setPerson] = useAtom(personAtom);
  const [___, setHomeList] = useAtom(homeListAtom);

  const person_query = trpc.person.get.useQuery(personId ?? '');
  const home_list_query = trpc.home.listShort.useQuery();

  useEffect(() => {
    setPersonId(id);
  }, []);

  useEffect(() => {
    if (person_query.data) setPerson(person_query.data);
  }, [person_query.data, setPerson]);

  useEffect(() => {
    if (home_list_query.data) setHomeList(home_list_query.data);
  }, [home_list_query.data, setHomeList]);

  if (person_query.isLoading || person === undefined)
    return <div>Loading...</div>;
  if (person === undefined) return <div>Page does not exists</div>;
  return (
    <main>
      <PersonDetailsMain />
      <AddHouseDialog />
      <button onClick={() => setOpenDialog(true)}>Open Dialog</button>
    </main>
  );
}
