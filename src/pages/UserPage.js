/* eslint-disable */

import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { AddingUsers } from 'src/sections/@dashboard/user';
import LoaderPage from './Loader';

export default function UserPage() {
  const [open, setOpen] = useState(false);

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const [user, setUser] = useState([]);
  const token = localStorage.getItem('token');
  let [loader, setLoader] = useState(false);
  const getUsers = () => {
    setLoader(true);
    fetch('https://iiv-backend-fdji.onrender.com/api/users/get-all-user-info', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status${response?.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        throw new Error('Response in not JSON');
      })
      .then((data) => {
        setUser(data.data);

        // console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('token');
        console.log('token expired');
      })
      .finally(() => setLoader(false));
  };

  const deleteUser = (id) => {
    fetch(`https://iiv-backend-fdji.onrender.com/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(() => {
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Foydalanuvchilar
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
            Yangi Foydalanuvchi Qo'shish
          </Button>
        </Stack>
        <Scrollbar>
          <AddingUsers onOpen={open} onCloses={() => setOpen(false)} onRefetch={() => getUsers()} />
          <TableContainer component={Paper}>
            <Table sx={{ Width: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>F.I.O</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Viloyat</TableCell>
                  <TableCell>Tuman</TableCell>
                  <TableCell>Taxrirlash/O'chirish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loader ? (
                  <>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <LoaderPage />
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  user.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {(() => {
                          switch (row.roles[0]) {
                            case 'res':
                              return 'Admin';
                            case 'vil':
                              return 'Viloyat admin';
                            case 'tum':
                              return 'Tuman admin';
                            default:
                              return 'Psixolog';
                          }
                        })()}
                      </TableCell>
                      <TableCell>{row?.viloyat?.nomi}</TableCell>

                      <TableCell>{row?.tuman?.nomi}</TableCell>
                      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          variant="contained"
                          color="inherit"
                          sx={{ mr: 2 }}
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="contained" color="error" onClick={() => deleteUser(row._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
      </Container>
    </>
  );
}
