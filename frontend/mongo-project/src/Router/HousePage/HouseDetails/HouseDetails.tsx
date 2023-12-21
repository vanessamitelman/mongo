import { NavLink, useParams } from 'react-router-dom';
import { trpc } from '../../../trpc';
import { useForm } from 'react-hook-form';
import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  dialogStatusAtom,
  homeAtom,
  idAtom,
  isLoadingAtom,
  personListAtom
} from '../../../store/jotai';
import { AddPersonDialog } from '../../../components/house/houseDetails/addPersonDialog';

export function HouseDetailsPage() {
  const { id } = useParams();
  const [__, setHomeId] = useAtom(idAtom);
  const [home, setHome] = useAtom(homeAtom);
  const [personList, setPersonList] = useAtom(personListAtom);
  const [_, setOpenDialog] = useAtom(dialogStatusAtom);

  const home_details_query = trpc.home.get.useQuery(id ?? '');
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
      <h1>House Details</h1>
      {home.address}
      <hr />
      {home.city}
      <hr />

      {home.persons?.length === 0 ? (
        <div>no people in home</div>
      ) : (
        <div>persons:</div>
      )}
      {home.persons?.map((person, index) => (
        <pre key={index}>
          <NavLink to={`/persons/${person.id}`}>{person.name}</NavLink>
        </pre>
      ))}
      <AddPersonDialog />
      <button onClick={() => setOpenDialog(true)}>Add Person</button>
    </main>
  );
}
