import { useAtom } from 'jotai';
import { countAtom } from '../../store/jotai';
import { NavLink } from 'react-router-dom';

export function PostPage() {
  const [count, setCount] = useAtom(countAtom);

  // Increment function using Jotai's `set` function
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Decrement function using Jotai's `set` function
  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div>
      <h1>post page</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <NavLink to='/persons'>Persons Page</NavLink>
    </div>
  );
}
