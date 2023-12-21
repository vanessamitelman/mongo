import { useAtom } from 'jotai';
import { dialogStatusAtom, idAtom, personListAtom } from '../../../store/jotai';
import { Dialog } from '@mui/material';
import { trpc } from '../../../trpc';
import { useForm } from 'react-hook-form';
import { PersonListSelect } from './personListSelect';

export function AddPersonDialog() {
  const [openDialog, setOpenDialog] = useAtom(dialogStatusAtom);
  const [homeId, setHomeId] = useAtom(idAtom);
  const [personList, setPersonList] = useAtom(personListAtom);

  const home_details_query = trpc.home.get.useQuery(homeId ?? '');

  const house_query_add = trpc.home.addPerson.useMutation({
    onSuccess: () => {
      home_details_query.refetch();
    }
  });
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<{ person_id: string }>();
  return (
    <main>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div style={{ width: '50vw', height: '50vh' }}>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);

              const index_of_person = personList.findIndex(
                (person) => person.id === data.person_id
              );
              const person = personList[index_of_person];
              house_query_add.mutate({
                person_id: data.person_id,
                name: person.name,
                home_id: home_details_query.data?.id ?? ''
              });
            })}
          >
            <PersonListSelect register={register} errors={errors} />
            <button type='submit'>Submit</button>
          </form>
          <button onClick={() => setOpenDialog(false)}>Close</button>
        </div>
      </Dialog>
    </main>
  );
}
