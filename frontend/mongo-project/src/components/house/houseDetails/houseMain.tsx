import { useAtom } from 'jotai';
import { homeAtom, idAtom } from '../../../store/jotai';
import { NavLink } from 'react-router-dom';
import { trpc } from '../../../trpc';

export function HouseDetailsMain() {
  const [home, setHome] = useAtom(homeAtom);
  const [homeId, setHomeId] = useAtom(idAtom);
  const home_details_query = trpc.home.get.useQuery(homeId ?? '');
  const deleteHomeFromPerson_mutation = trpc.home.delete.useMutation({
    onSuccess: () => {
      home_details_query.refetch();
    }
  });
  return (
    <div>
      <h1>House Details</h1>
      {home?.address}
      <hr />
      {home?.city}
      <hr />

      {home?.persons?.length === 0 ? (
        <div>no people in home</div>
      ) : (
        <div>persons:</div>
      )}
      {home?.persons?.map((person, index) => (
        <pre key={index}>
          <NavLink to={`/persons/${person.id}`}>{person.name}</NavLink>
          <button
            onClick={() =>
              deleteHomeFromPerson_mutation.mutate({
                home_id: homeId ?? '',
                person_id: person.id
              })
            }
          >
            Delete Home
          </button>
        </pre>
      ))}
    </div>
  );
}
