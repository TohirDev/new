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
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import { token } from '../user/addingUsers';
// /* eslint-disable */
function AddingInformation({ onCloses, onOpen, onRequest }) {
  const [usersData, setUsersData] = useState([]);
  const [buyId, setBuyId] = useState('');
  const [kochirmaId, setKochirmaId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const sameStyle = {
    margin: '10px 0',
  };

  const sendKochirma = (data) => {
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
      .then((result) => {
        setKochirmaId(result?.data?._id);
      })
      .catch((err) => console.log(err));
  };
  const sendBuyruqdanKochirma = (data) => {
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
      .then((result) => {
        setBuyId(result?.data?._id);
      })
      .catch((err) => console.log(err));
  };

  const createMalumot = (malumot) => {
    fetch('https://iiv-backend-fdji.onrender.com/api/malumotlar/add', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(malumot),
    }).then(() => {
      onRequest();
      onCloses();
      reset({
        user: '',
        tugilganYili: '',
        jinsi: '',
        malumoti: '',
        mutaxasisligi: '',
        unvoni: '',
        ishBoshlagan: '',
        boshqarmadan: '',
        ketganMalumot: '',
        kelganYili: '',
      });
    });
  };

  const onSubmit = (data) => {
    createMalumot(data);
    // console.log(data);
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
        // console.log(result.data.map((e) => e._id));
      });
  }, []);

  return (
    <Dialog open={onOpen} onClose={onCloses}>
      <form onSubmit={handleSubmit((data) => onSubmit({ ...data, boshqarmadan: buyId, ketganMalumot: kochirmaId }))}>
        <DialogTitle>Malumot Qo'shish</DialogTitle>
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
          {errors.name && (
            <Typography variant="caption" color="red">
              Foydalanuvchini kiriting
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
              <DateField {...register('tugilganYili', { required: true })} fullWidth label="Tug'ilgan yili" />
            </DemoContainer>
          </LocalizationProvider>
          <Box style={sameStyle} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Jinsi</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Jinsi"
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
          <TextField
            style={sameStyle}
            placeholder="Ma'lumoti"
            fullWidth
            {...register('malumoti', { required: true })}
          />
          <TextField
            style={sameStyle}
            placeholder="Mutaxassisligi"
            fullWidth
            {...register('mutaxasisligi', { required: true })}
          />
          <TextField style={sameStyle} placeholder="Unvoni" fullWidth {...register('unvoni', { required: true })} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
              <DateField {...register('ishBoshlagan', { required: true })} fullWidth label="IIIda qachondan" />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            type="file"
            style={sameStyle}
            placeholder="Buyruqdan ko'chirma"
            fullWidth
            onChange={sendBuyruqdanKochirma}
          />
          <Typography variant="caption">Buyruqdan ko'chirma</Typography>

          <TextField
            type="file"
            style={sameStyle}
            placeholder="Ketganiligda ma'lumot"
            fullWidth
            onChange={sendKochirma}
          />
          <Typography variant="caption">Ketganiligda ma'lumot</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
              <DateField {...register('kelganYili', { required: true })} fullWidth label="Kelgan Yili" />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              onCloses();
              reset({
                user: '',
                tugilganYili: '',
                jinsi: '',
                malumoti: '',
                mutaxasisligi: '',
                unvoni: '',
                ishBoshlagan: '',
                boshqarmadan: '',
                ketganMalumot: '',
                kelganYili: '',
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

AddingInformation.propTypes = {
  onOpen: PropTypes.bool,
  onCloses: PropTypes.func,
  onRequest: PropTypes.func,
};

export default AddingInformation;
