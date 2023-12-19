import { useParams } from 'react-router-dom';
import { trpc } from '../../../trpc';
import { useState } from 'react';
import { Dialog } from '@mui/material';
import { useForm } from 'react-hook-form';

export function PersonsDetailsPage() {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [homesArr, setHomesArr] = useState<string[]>([]);
  const person_query = trpc.person.get.useQuery(id ?? '');
  const person_query_add_mutation = trpc.person.addHome.useMutation({
    onSuccess: () => {
      person_query.refetch();
    }
  });
  const home_list_query = trpc.home.list.useQuery();
  const deleteHomeFromPerson_mutation = trpc.home.delete.useMutation({
    onSuccess: () => {
      person_query.refetch();
    }
  });
  const { register, handleSubmit } = useForm<{ home_id: string }>();
  if (person_query.isLoading || home_list_query.data === undefined)
    return <div>Loading...</div>;
  if (person_query === undefined || person_query.data === undefined)
    return <div>Page does not exists</div>;
  return (
    <main>
      <h1>PersonsDetailsPage-{id}</h1>
      <h2>{person_query.data?.name}</h2>
      <h3>Number of houses: {person_query.data?.homes.length}</h3>
      <p>{person_query.data?.bio}</p>
      {person_query.data?.homes.map((home, index) => {
        //add the current home ids to the homesArr
        if (homesArr.indexOf(home.id) === -1)
          setHomesArr([...homesArr, home.id]);
        return (
          <div key={index}>
            address = {home.address} - rooms = {home.rooms} - {home.id}
            <button
              onClick={() =>
                deleteHomeFromPerson_mutation.mutate({
                  home_id: home.id,
                  person_id: id ?? ''
                })
              }
            >
              Delete Home
            </button>
          </div>
        );
      })}
      <hr />
      <button onClick={() => setOpenDialog(true)}>Open Dialog</button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            const index_of_home = home_list_query.data?.findIndex(
              (home) => home.id === data.home_id
            );
            const home = home_list_query.data[index_of_home];
            person_query_add_mutation.mutate({
              home_id: data.home_id,
              person_id: person_query.data?.id ?? '',
              rooms: home.rooms,
              address: home.address
            });
          })}
        >
          <select {...register('home_id')}>
            <option>Please select</option>
            {home_list_query.data.map((home, index) => {
              //ensure that only the list of homes that haven't already been added appear
              if (homesArr.indexOf(home.id) !== -1) return;
              return (
                <option key={index} value={home.id}>
                  city:{home.city} - address:{home.address} - rooms:{home.rooms}
                </option>
              );
            })}
          </select>
          <button type='submit' onClick={() => setOpenDialog(false)}>
            Add Home
          </button>
          <button onClick={() => setOpenDialog(false)}>close</button>
        </form>
      </Dialog>
    </main>
  );
}
