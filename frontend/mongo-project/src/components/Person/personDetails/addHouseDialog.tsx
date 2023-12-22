import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useAtom } from 'jotai';
import { dialogStatusAtom, homeListAtom, idAtom } from '../../../store/jotai';
import { trpc } from '../../../trpc';
import { useForm } from 'react-hook-form';
import { HouseListSelect } from './houseListSelect';

export function AddHouseDialog() {
  const [openDialog, setOpenDialog] = useAtom(dialogStatusAtom);
  const [personId, _] = useAtom(idAtom);
  const [homeList, __] = useAtom(homeListAtom);

  const person_query = trpc.person.get.useQuery(personId ?? '');
  const { register, handleSubmit } = useForm<{ home_id: string }>();
  const person_query_add_mutation = trpc.person.addHome.useMutation({
    onSuccess: () => {
      person_query.refetch();
    }
  });

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <form
        onSubmit={handleSubmit((data) => {
          const index_of_home = homeList?.findIndex(
            (home) => home.id === data.home_id
          );
          const home = homeList[index_of_home];
          person_query_add_mutation.mutate({
            home_id: data.home_id,
            person_id: person_query.data?.id ?? '',
            rooms: home.rooms,
            address: home.address
          });
        })}
      >
        <DialogContent>
          <HouseListSelect register={register} />
        </DialogContent>
        <DialogActions>
          <Button type='submit' onClick={() => setOpenDialog(false)}>
            Add Home
          </Button>
          <Button onClick={() => setOpenDialog(false)}>close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
