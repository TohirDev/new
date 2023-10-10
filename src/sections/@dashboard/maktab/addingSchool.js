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
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { token } from '../user/addingUsers';
// /* eslint-disable */
function AddingSchool({ onCloses, onOpen, onRequest }) {
  const sameStyle = {
    margin: '10px 0',
  };

  const [usersData, setUsersData] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const createMaktab = (varaqa) => {
    fetch('https://iiv-backend-fdji.onrender.com/api/maktablar/add', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(varaqa),
    }).then(() => {
      onRequest();
      onCloses();
      reset({
        user: '',
        nomi: '',
        sinf: '',
        oquvchi: '',
        jinsi: '',
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
      <DialogTitle>Maktab Qo'shish</DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          createMaktab(data);
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
                {...register('user', { required: true })}
              >
                {usersData.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField style={sameStyle} placeholder="Maktab" fullWidth {...register('nomi', { required: true })} />
          <TextField style={sameStyle} placeholder="Sinflar" fullWidth {...register('sinf', { required: true })} />
          <TextField
            style={sameStyle}
            placeholder="O'quvchilar"
            fullWidth
            {...register('oquvchi', { required: true })}
          />
          <Box style={sameStyle} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Jinsi</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Foydalanuvchilar"
                {...register('jinsi', { required: true })}
              >
                <MenuItem key={'erkak'} value={'erkak'}>
                  Erkak
                </MenuItem>
                <MenuItem key={'ayol'} value={'ayol'}>
                  Ayol
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
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
                sinf: '',
                oquvchi: '',
                jinsi: '',
              });
            }}
          >
            Yopish
          </Button>
          <Button variant="contained" color="info" type="submit">
            Qo'shish
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddingSchool.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onCloses: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};

export default AddingSchool;
