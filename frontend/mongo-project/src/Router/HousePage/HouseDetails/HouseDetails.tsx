import { useParams } from 'react-router-dom';
import { trpc } from '../../../trpc';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  dialogStatusAtom,
  homeAtom,
  idAtom,
  personListAtom
} from '../../../store/jotai';
import { AddPersonDialog } from '../../../components/house/houseDetails/addPersonDialog';
import { HouseDetailsMain } from '../../../components/house/houseDetails/houseMain';

export function HouseDetailsPage() {
  const { id } = useParams();
  const [homeId, setHomeId] = useAtom(idAtom);
  const [home, setHome] = useAtom(homeAtom);
  const [personList, setPersonList] = useAtom(personListAtom);
  const [_, setOpenDialog] = useAtom(dialogStatusAtom);

  const home_details_query = trpc.home.get.useQuery(homeId ?? '');
  const person_list_query = trpc.person.list.useQuery();

  useEffect(() => {
    setHomeId(id);
  }, []);
  useEffect(() => {
    if (home_details_query.data) {
      setHome(home_details_query.data);
    }
  }, [home_details_query.data, setHome]);

  useEffect(() => {
    if (person_list_query.data) setPersonList(person_list_query.data);
  }, [person_list_query.data, setPersonList]);

  if (home_details_query.isLoading || personList === undefined)
    return <h1>Loading...</h1>;
  if (home === undefined) return <h1>Page does not exist</h1>;

  return (
    <main>
      <HouseDetailsMain />
      <AddPersonDialog />
      <button onClick={() => setOpenDialog(true)}>Add Person</button>
    </main>
  );
}
