import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { token } from '../user/addingUsers';
import { useMahallaStore } from '../../../store/mahalla';

function AddingMahalla({ onCloses, onOpen, onRequest }) {
  const sameStyle = {
    margin: '10px 0',
  };

  const [usersData, setUsersData] = useState([]);
  const [mahallaModal, setMahallaModal] = useMahallaStore((state) => [state.mahallaModal, state.setMahallaModal]);

  const { register, handleSubmit, reset } = useForm();
  const createMahalla = (mahalla) => {
    fetch('https://iiv-backend-fdji.onrender.com/api/mahallalar/add', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mahalla),
    }).then(() => {
      onRequest();
      onCloses();
      reset({
        user: '',
        nomi: '',
      });
    });
  };

  useEffect(() => {
    fetch('https://iiv-backend-fdji.onrender.com/api/users/get-all-user-info', {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUsersData(result.data);
      });
  }, []);

  return (
    <Dialog open={onOpen} onClose={onCloses}>
      <DialogTitle>Mahalla {mahallaModal?._id ? 'Tahrirlash' : "Qo'shish"}</DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          createMahalla(data);
        })}
      >
        <DialogContent>
          <Box style={sameStyle} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Foydalanuvchilar</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Foydalanuvchilar"
                fullWidth
                {...register('user', { required: true })}
              >
                {usersData?.map((user) => (
                  <MenuItem key={user._id} value={mahallaModal ? mahallaModal?.user?._id : user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField style={sameStyle} placeholder="Mahalla nomi" fullWidth {...register('nomi', { required: true })} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              onCloses();
              reset({
                user: '',
                nomi: '',
              });
              setMahallaModal(undefined);
            }}
          >
            Yopish
          </Button>
          <Button variant="contained" color="info" type="submit">
            {/* {mahallaModal._id ? "Qo'shish" : 'Tahrirlash'} */}
            {mahallaModal?._id ? 'Tahrirlash' : "Qo'shish"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddingMahalla.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onCloses: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};

export default AddingMahalla;
