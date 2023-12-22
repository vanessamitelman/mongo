import { useAtom } from 'jotai';
import { homeAtom, personListAtom } from '../../../store/jotai';
import { UseFormRegister } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SelectFieldProps {
  register: UseFormRegister<{ person_id: string }>;
}

export function PersonListSelect({ register }: SelectFieldProps) {
  const [personList, _] = useAtom(personListAtom);

  const [home, __] = useAtom(homeAtom);
  const filteredPersonList = personList.filter(
    (person) =>
      !home?.persons?.some((homePerson) => homePerson.id === person.id)
  );
  return (
    <FormControl sx={{ m: 5, minWidth: 220 }}>
      <InputLabel id='people'>Person:</InputLabel>
      <Select labelId='people' label='Person' {...register('person_id')}>
        {filteredPersonList.map((person, index) => {
          return (
            <MenuItem key={index} value={person.id}>
              {person?.name} - {person?.bio}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
