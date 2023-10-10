import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import Iconify from '../../../components/iconify';

export const token = localStorage.getItem('token');
function AddingUsers({ onCloses, onOpen, onRefetch }) {
  const sameStyle = {
    margin: '10px 0',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [viloyat, setViloyat] = useState([]);
  const [tuman, setTuman] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const createUser = (sendUser) => {
    if (sendUser.tuman?.length <= 0) delete sendUser.tuman;
    if (sendUser.viloyat?.length <= 0) delete sendUser.viloyat;
    fetch('https://iiv-backend-fdji.onrender.com/api/users/register', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendUser),
    }).then(() => {
      onRefetch();
      onCloses();
      reset({
        name: '',
        roles: '',
        password: '',
        email: '',
      });
    });
  };

  useEffect(() => {
    fetch('https://iiv-backend-fdji.onrender.com/api/viloyatlar/get-all-viloyatlar', {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => setViloyat(res.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTumanByViloyatId = (id) => {
    fetch(`https://iiv-backend-fdji.onrender.com/api/viloyatlar/getTumanVilById/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => setTuman(res?.data?.tumanlar))
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    createUser(data);
    // console.log(data);
  };

  return (
    <Dialog open={onOpen} onClose={onCloses}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Foydalanuvchilar Qo'shish</DialogTitle>
        <DialogContent>
          <TextField
            inputMode="text"
            name="name"
            style={sameStyle}
            placeholder="F.I.O"
            fullWidth
            {...register('name', { required: true })}
          />
          {errors.name && (
            <Typography variant="caption" color="red">
              I.F.O kiriting
            </Typography>
          )}
          <TextField
            inputMode="email"
            name="email"
            style={sameStyle}
            placeholder="Email"
            fullWidth
            {...register('email', { required: true })}
          />
          {errors.email && (
            <Typography variant="caption" color="red">
              Email kiriting
            </Typography>
          )}
          <Box style={sameStyle} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rollar</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Rollar"
                {...register('roles', { required: true })}
              >
                <MenuItem key={0} value={'psix'}>
                  Psixolog
                </MenuItem>
                <MenuItem key={1} value={'res'}>
                  Admin
                </MenuItem>
                <MenuItem key={2} value={'vil'}>
                  Viloyat admin
                </MenuItem>
                <MenuItem key={3} value={'tum'}>
                  Tuman admin
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {errors.role && (
            <Typography variant="caption" color="red">
              Role kiriting
            </Typography>
          )}
          <TextField
            name="password"
            label="Password"
            style={sameStyle}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', { required: true })}
          />
          {errors.password && (
            <Typography variant="caption" color="red">
              Parol kiriting
            </Typography>
          )}
          <Box style={sameStyle} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Viloyatlar</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Viloyatlar"
                {...register('viloyat')}
              >
                {viloyat?.map((region) => (
                  <MenuItem onClick={() => getTumanByViloyatId(region?._id)} key={region._id} value={region._id}>
                    {region.nomi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {errors.viloyat && (
            <Typography variant="caption" color="red">
              Viloyatni kiriting
            </Typography>
          )}
          <Box style={sameStyle} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tumanlar</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tumanlar"
                {...register('tuman')}
              >
                {tuman?.map((region) => (
                  <MenuItem key={region._id} value={region._id}>
                    {region.nomi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {errors.tuman && (
            <Typography variant="caption" color="red">
              Tuman kiriting
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              reset({
                name: '',
                roles: '',
                password: '',
                email: '',
              });
              onCloses();
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

AddingUsers.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  onCloses: PropTypes.func.isRequired,
  onRefetch: PropTypes.func.isRequired,
};

export default AddingUsers;
