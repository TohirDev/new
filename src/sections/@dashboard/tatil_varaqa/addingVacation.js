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
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { token } from '../user/addingUsers';

function AddingVacation({ onCloses, onOpen, onRequest }) {
  const sameStyle = {
    margin: '10px 0',
  };
  const [usersData, setUsersData] = useState([]);
  const [tatilVaraqaId, setTatilVarqa] = useState('');
  const [malumotNomaId, setMalumotNoma] = useState('');
  const { register, handleSubmit, reset } = useForm();
  const createVaraqa = (varaqa) => {
    fetch('https://iiv-backend-fdji.onrender.com/api/varaqalar/add', {
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
        tatilVaraqa: '',
        malumotNoma: '',
      });
    });
  };

  const sendTatilVaraqa = (data) => {
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
        setTatilVarqa(result?.data?._id);
        console.log(result?.data?._id, 'id');
      })
      .catch((err) => console.log(err));
  };
  const sendMalumotNoma = (data) => {
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
        setMalumotNoma(result?.data?._id);
        console.log(result?.data?._id, 'id');
      })
      .catch((err) => console.log(err));
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
      <form
        onSubmit={handleSubmit((data) => {
          createVaraqa({ ...data, tatilVaraqa: tatilVaraqaId, malumotNoma: malumotNomaId });
          console.log({ ...data, tatilVaraqa: tatilVaraqaId, malumotNoma: malumotNomaId });
        })}
      >
        <DialogTitle>Ta'til varaqa Qo'shish</DialogTitle>
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

          <TextField type="file" style={sameStyle} fullWidth onChange={sendTatilVaraqa} />
          <Typography variant="caption">Ta'til varaqa</Typography>
          <TextField type="file" style={sameStyle} fullWidth onChange={sendMalumotNoma} />
          <Typography variant="caption">Ma'lumotnoma</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            placeholder="spravka"
            onClick={() => {
              onCloses();
              reset({
                user: '',
                tatilVaraqa: '',
                malumotNoma: '',
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

AddingVacation.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onCloses: PropTypes.func.isRequired,
  onRequest: PropTypes.func.isRequired,
};

export default AddingVacation;
