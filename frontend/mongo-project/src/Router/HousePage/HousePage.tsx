import { NavLink } from 'react-router-dom';
import { trpc } from '../../trpc';
import { Dialog } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HomeI } from '../../interfaces/home';
import { useAtom } from 'jotai';
import {
  dialogStatusAtom,
  homeListAtom,
  personListAtom
} from '../../store/jotai';

export function HousePage() {
  const [isOpenAddHouse, setIsOpenAddHouse] = useAtom(dialogStatusAtom);
  const [homeList, setHomeList] = useAtom(homeListAtom);
  const [personList, setPersonList] = useAtom(personListAtom);

  const homes_query = trpc.home.list.useQuery();
  const persons_query = trpc.person.list_names.useQuery();

  useEffect(() => {
    if (homes_query.data) setHomeList(homes_query.data);
  }, [homes_query.data, setHomeList]);

  useEffect(() => {
    if (persons_query.data) setPersonList(persons_query.data);
  }, [persons_query.data, setPersonList]);

  const create_house_mutation = trpc.home.createHouse.useMutation({
    onSuccess: () => {
      homes_query.refetch();
      setIsOpenAddHouse(false);
    }
  });
  const { register, handleSubmit } = useForm<HomeI>();

  if (homes_query.data === undefined || homes_query.isLoading)
    return <div>Loading...</div>;
  return (
    <main>
      <h1>House Page</h1>
      {homeList.map((home, index) => (
        <div key={index}>
          <NavLink to={`/house/${home.id}`}>
            {home.address}- {home.city}- {home.rooms}
          </NavLink>
          <hr />
        </div>
      ))}
      <hr />
      <button onClick={() => setIsOpenAddHouse(true)}>open dialog</button>
      <Dialog open={isOpenAddHouse} onClose={() => setIsOpenAddHouse(false)}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            if (persons_query.data === undefined || data.persons === undefined)
              return;
            const persons = data.persons.map((personArr) => {
              const index_of_person = personList.findIndex(
                (person) => person.id === personArr.id
              );
              const person = personList[index_of_person];
              return {
                id: personArr.id,
                name: person.name
              };
            });
            create_house_mutation.mutate({
              address: data.address,
              rooms: parseInt(data.rooms.toString()),
              city: data.city ?? '',
              persons: persons ?? []
            });
          })}
        >
          address <input type='text' {...register('address')} />
          <br />
          city <input type='text' {...register('city')} />
          <br />
          rooms <input type='number' {...register('rooms')} />
          <hr />
          <select {...register('persons')} multiple>
            {personList.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          <button type='submit'>submit</button>
        </form>
      </Dialog>
    </main>
  );
}
