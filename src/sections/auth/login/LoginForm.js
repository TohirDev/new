import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    localStorage.getItem('token') && navigate('/dashboard/app');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [data, setData] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  async function requestToken(tokenData) {
    fetch('https://iiv-backend-fdji.onrender.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenData),
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        if (result.data !== undefined) {
          localStorage.setItem('token', result.data);
        }
        if (localStorage.getItem('token')) {
          navigate('/dashboard/app');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        requestToken(data);

        console.log(JSON.stringify(data));
      })}
    >
      <Stack spacing={3}>
        <TextField name="email" label="Email address" {...register('email', { required: true })} />

        <TextField
          name="password"
          label="Password"
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
      <Typography variant="caption" color="red">
        {data?.message}
      </Typography>
    </form>
  );
}
