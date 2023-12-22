import { useAtom } from 'jotai';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { homeListAtom, personAtom } from '../../../store/jotai';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SelectFieldProps {
  register: UseFormRegister<{ home_id: string }>;
}

export function HouseListSelect({ register }: SelectFieldProps) {
  const [homeList, _] = useAtom(homeListAtom);
  const [person, __] = useAtom(personAtom);

  const filteredHouseList = homeList.filter(
    (home) => !person?.homes?.some((personHome) => personHome.id === home.id)
  );

  return (
    <FormControl sx={{ m: 5, minWidth: 220 }}>
      <InputLabel id='homes'>Home:</InputLabel>
      <Select labelId='homes' {...register('home_id')} label='Home'>
        {filteredHouseList.map((home, index) => {
          return (
            <MenuItem key={index} value={home.id}>
              address:{home.address} - rooms:{home.rooms}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
