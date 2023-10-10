import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import { token } from '../sections/@dashboard/user/addingUsers';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import AddingMahalla from '../sections/@dashboard/mahalla/addingMahalla';

const MahallaPage = () => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState([]);
  const getMahalla = () => {
    fetch('https://iiv-backend-fdji.onrender.com/api/mahallalar/get-all-mahalla', {
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
      .then((data) => setUser(data.data))
      .catch((error) => console.log(error));
  };

  const deleteMahalla = (id) => {
    fetch(`https://iiv-backend-fdji.onrender.com/api/mahallalar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(() => {
      getMahalla();
    });
  };

  useEffect(() => {
    getMahalla();
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Mahalla
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Qo'shish
        </Button>
      </Stack>
      <AddingMahalla onOpen={open} onCloses={() => setOpen(false)} onRequest={() => getMahalla()} />
      <Card>
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>I.F.O</TableCell>
                  <TableCell>Mahalla nomi</TableCell>
                  <TableCell>Tahrirlash/O'chirish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((row) => (
                  <TableRow key={row?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.user?.name}
                    </TableCell>
                    <TableCell>{row.nomi}</TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="inherit" sx={{ mr: 2 }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => deleteMahalla(row._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
};

export default MahallaPage;
