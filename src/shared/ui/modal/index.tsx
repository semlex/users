import { CloseOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

interface ModalProps extends DialogProps {
  title?: string;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const close = () => {
    onClose?.({}, 'backdropClick');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography variant={'h5'}>{title}</Typography>
          <IconButton onClick={close} color={'info'}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </Toolbar>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
