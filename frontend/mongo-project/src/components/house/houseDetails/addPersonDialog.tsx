import { useAtom } from 'jotai';
import { dialogStatusAtom, idAtom, personListAtom } from '../../../store/jotai';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { trpc } from '../../../trpc';
import { useForm } from 'react-hook-form';
import { PersonListSelect } from './personListSelect';

export function AddPersonDialog() {
  const [openDialog, setOpenDialog] = useAtom(dialogStatusAtom);
  const [homeId, _] = useAtom(idAtom);
  const [personList, __] = useAtom(personListAtom);

  const home_details_query = trpc.home.get.useQuery(homeId ?? '');

  const house_query_add = trpc.home.addPerson.useMutation({
    onSuccess: () => {
      home_details_query.refetch();
    }
  });
  const { handleSubmit, register } = useForm<{ person_id: string }>();
  return (
    <main>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
          <DialogContent>
            <PersonListSelect register={register} />
          </DialogContent>
          <DialogActions>
            <Button type='submit' onClick={() => setOpenDialog(false)}>
              Add Person
            </Button>
            <Button onClick={() => setOpenDialog(false)}>close</Button>
          </DialogActions>
        </form>
      </Dialog>
    </main>
  );
}
