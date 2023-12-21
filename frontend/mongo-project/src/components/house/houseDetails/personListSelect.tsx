import { useAtom } from 'jotai';
import { personListAtom } from '../../../store/jotai';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface SelectFieldProps {
  register: UseFormRegister<any>;
  errors: {
    person_id?: FieldError;
  };
}

export function PersonListSelect({ register, errors }: SelectFieldProps) {
  const [personList, _] = useAtom(personListAtom);
  return (
    <select {...register('person_id')}>
      {personList.map((person, index) => (
        <option key={index} value={person.id}>
          {person?.name} - {person?.bio}
        </option>
      ))}
    </select>
  );
}
