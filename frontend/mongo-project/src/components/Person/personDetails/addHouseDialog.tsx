import { Dialog } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai'; // Import useAtom from Jotai
import { dialogStatusAtom } from '../../../store/jotai';

export interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  homeList: any[]; // Replace 'any[]' with your specific type for homeList
  // Add other necessary props
}

export function AddHouseDialog<DialogComponentProps>() {
  const [openDialog, setOpenDialog] = useAtom(dialogStatusAtom);

  const { register, handleSubmit } = useForm<{ home_id: string }>();

  // Rest of your dialog content and logic here...
  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        setOpenDialog(false);
      }}
    >
      {/* Your dialog content */}
    </Dialog>
  );
}
