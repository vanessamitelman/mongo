import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { trpc } from '../../../trpc';
import { useForm } from 'react-hook-form';
import { Dialog } from '@mui/material';

export function HouseDetailsPage() {
  //prevent adding duplicate person to same house
  const [personsArr, setPersonsArr] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { id } = useParams();
  const home_details_query = trpc.home.get.useQuery(id ?? '');
  const house_query_add = trpc.home.addPerson.useMutation({
    onSuccess: () => {
      home_details_query.refetch();
    }
  });
  const person_list_query = trpc.person.list.useQuery();

  const deletePersonFromHome_mutation = trpc.home.delete.useMutation({
    onSuccess: () => {
      home_details_query.refetch();
      person_list_query.refetch();
    }
  });

  const { handleSubmit, register } = useForm<{ person_id: string }>();

  if (home_details_query.isLoading || person_list_query.data === undefined)
    return <h1>Loading...</h1>;
  if (home_details_query.data === undefined)
    return <h1>Page does not exist</h1>;
  return (
    <main>
      <h1>House Details</h1>
      {home_details_query.data.address}
      <hr />
      {home_details_query.data?.city}
      <hr />
      persons -{' '}
      {home_details_query.data?.persons?.map((person, index) => {
        if (personsArr.indexOf(person.id) === -1)
          setPersonsArr([...personsArr, person.id]);

        return (
          <pre key={index}>
            <NavLink to={`/persons/${person.id}`}>{person.name}</NavLink>
            <button
              onClick={() =>
                deletePersonFromHome_mutation.mutate({
                  home_id: home_details_query.data?.id ?? ' ',
                  person_id: person.id
                })
              }
            >
              Delete Person from House
            </button>
          </pre>
        );
      })}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div style={{ width: '50vw', height: '50vh' }}>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);

              const index_of_person = person_list_query.data?.findIndex(
                (person) => person.id === data.person_id
              );
              const person = person_list_query.data[index_of_person];
              if (personsArr.indexOf(data.person_id) !== -1) return;
              house_query_add.mutate({
                person_id: data.person_id,
                name: person.name,
                home_id: home_details_query.data?.id ?? ''
              });
            })}
          >
            <select {...register('person_id')}>
              <option>Please Select</option>
              {person_list_query?.data?.map((person, index) => {
                if (personsArr.indexOf(person.id) !== -1) return;
                return (
                  <option key={index} value={person.id}>
                    {person?.name} - {person?.bio}
                  </option>
                );
              })}
            </select>
            <button type='submit'>Submit</button>
          </form>
          <button onClick={() => setOpenDialog(false)}>Close</button>
        </div>
      </Dialog>
      <button onClick={() => setOpenDialog(true)}>Add Person</button>
    </main>
  );
}
