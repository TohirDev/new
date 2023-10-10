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

// import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { token } from '../user/addingUsers';
// /* eslint-disable */
function AddingQilinganIshlar({ onCloses, onOpen, onRequest }) {
  const sameStyle = {
    margin: '10px 0',
  };
  const [fileId, setFileId] = useState('');

  const sendPDF = (data) => {
    const formData = new FormData();
    formData.append('pdf', data?.target?.files[0]);
    fetch('https://iiv-backend-fdji.onrender.com/api/pdflar/upload', {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => setFileId(result?.data?._id))
      .catch((err) => console.log(err));
  };

  const [usersData, setUsersData] = useState([]);
  const moddalar = [
    {
      id: 1,
      modda: '47-modda',
    },
    {
      id: 2,
      modda: '47-prim 1-moddasi',
    },
    {
      id: 3,
      modda: '47-prim 3-moddasi',
    },
    {
      id: 4,
      modda: '47-prim 6-moddasi',
    },
    {
      id: 5,
      modda: '47-prim 7-moddasi',
    },
    {
      id: 6,
      modda: '49-prim 1-moddasi',
    },
  ];
  const { register, handleSubmit, reset } = useForm();
  const createIsh = (ish) => {
    fetch('https://iiv-backend-fdji.onrender.com/api/ishlar/add', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ish),
    }).then(() => {
      onRequest();
      onCloses();
      reset({
        user: '',
        modda: '',
        soni: '',
        file: '',
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
      <DialogTitle>Ish Qo'shish</DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          createIsh({ ...data, file: fileId });
          console.log({ ...data, file: fileId });

          setFileId('');
        })}
      >
        <DialogContent sx={{ minWidth: '400px' }}>
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
          <Box style={sameStyle} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Qaysi tur</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Qaysi tur"
                {...register('modda', { required: true })}
              >
                {moddalar.map((modda) => (
                  <MenuItem key={modda.id} value={modda.modda}>
                    {modda.modda}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField style={sameStyle} placeholder="Soni" fullWidth {...register('soni', { required: true })} />
          <TextField type="file" style={sameStyle} placeholder="Ketganiligda ma'lumot" fullWidth onChange={sendPDF} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              onCloses();
              reset({
                user: '',
                modda: '',
                soni: '',
                file: '',
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

AddingQilinganIshlar.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onCloses: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};

export default AddingQilinganIshlar;
