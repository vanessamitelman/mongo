import { useAtom } from 'jotai';
import { idAtom, personAtom } from '../../../store/jotai';
import { trpc } from '../../../trpc';

export function PersonDetailsMain() {
  const [person, _] = useAtom(personAtom);
  const [personId, __] = useAtom(idAtom);

  const person_query = trpc.person.get.useQuery(personId ?? '');

  const deleteHomeFromPerson_mutation = trpc.home.delete.useMutation({
    onSuccess: () => {
      person_query.refetch();
    }
  });

  return (
    <div>
      <h1>Persons Details</h1>
      <h2>{person?.name}</h2>
      <h3>Number of houses: {person?.homes?.length}</h3>
      <p>{person?.bio}</p>

      {person?.homes?.length === 0 && (
        <div>There are no homes defined for this person</div>
      )}
      {person?.homes?.map((home, index) => {
        return (
          <div key={index}>
            address = {home.address} - rooms = {home.rooms}
            <button
              onClick={() =>
                deleteHomeFromPerson_mutation.mutate({
                  home_id: home.id,
                  person_id: personId ?? ''
                })
              }
            >
              Delete Home
            </button>
          </div>
        );
      })}
    </div>
  );
}
