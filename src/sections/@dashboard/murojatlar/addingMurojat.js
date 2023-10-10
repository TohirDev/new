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
import { useForm } from 'react-hook-form';
import { token } from '../user/addingUsers';

function AddingMurojat({ onCloses, onOpen, onRequest }) {
  const sameStyle = {
    margin: '10px 0',
  };

  const [usersData, setUsersData] = useState([]);
  const [murojatIdPdf, setMurojatIdPdf] = useState('');

  const { register, handleSubmit, reset } = useForm();

  const createMurojat = (murojat) => {
    fetch('https://iiv-backend-fdji.onrender.com/api/murojatlar/add', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(murojat),
    }).then(() => {
      onRequest();
      onCloses();
      reset({
        user: '',
        nomi: '',
        manzili: '',
        pdf: '',
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

  const sendMurojatPdf = (data) => {
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
      .then((result) => setMurojatIdPdf(result?.data?._id))
      .catch((err) => console.log(err));
  };

  return (
    <Dialog open={onOpen} onClose={onCloses}>
      <DialogTitle>Murojat Qo'shish</DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          createMurojat({ ...data, pdf: murojatIdPdf });
          console.log({ ...data, pdf: murojatIdPdf });
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
          <TextField style={sameStyle} placeholder="Nomi" fullWidth {...register('nomi', { required: true })} />
          <TextField style={sameStyle} placeholder="Manzili" fullWidth {...register('manzili', { required: true })} />
          <TextField type="file" style={sameStyle} fullWidth onChange={sendMurojatPdf} />
          <Typography variant="caption">PDF</Typography>
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
                manzili: '',
                pdf: '',
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

AddingMurojat.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onCloses: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};

export default AddingMurojat;
