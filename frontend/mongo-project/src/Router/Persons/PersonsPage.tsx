import { NavLink } from 'react-router-dom';
import { trpc } from '../../trpc';
import { useAtom } from 'jotai';
import { personListAtom } from '../../store/jotai';
import { useEffect } from 'react';

export function PersonsPage() {
  const person_list_query = trpc.person.list.useQuery();
  const [personList, setPersonList] = useAtom(personListAtom);

  useEffect(() => {
    if (person_list_query.data) setPersonList(person_list_query.data);
  }, [person_list_query.data, setPersonList]);

  if (personList === undefined || person_list_query.isLoading)
    return <div>Loading...</div>;
  return (
    <main>
      <h1>PersonsPage</h1>
      {personList.map((person, index) => (
        <NavLink to={`/persons/${person.id}`} key={index}>
          <h3>{person.name}</h3>
          <p>{person.bio}</p>
        </NavLink>
      ))}
      <NavLink to='/post'>Post page</NavLink>
    </main>
  );
}
