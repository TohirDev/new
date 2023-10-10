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
  Link,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { token } from '../sections/@dashboard/user/addingUsers';
import AddingMurojat from '../sections/@dashboard/murojatlar/addingMurojat';

const MurojatlarPage = () => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState([]);
  const getMurojat = () => {
    fetch('https://iiv-backend-fdji.onrender.com/api/murojatlar/get-all-murojatlar', {
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
        setUser(data?.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteMurojat = (id) => {
    fetch(`https://iiv-backend-fdji.onrender.com/api/murojatlar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(() => {
      getMurojat();
    });
  };

  useEffect(() => {
    getMurojat();
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Murojaatlar
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Qo'shish
        </Button>
      </Stack>
      <AddingMurojat onOpen={open} onCloses={() => setOpen(false)} onRequest={() => getMurojat()} />
      <Card>
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>I.F.O</TableCell>
                  <TableCell>Nomi</TableCell>
                  <TableCell>Manzili</TableCell>
                  <TableCell>PDF</TableCell>
                  <TableCell>Tahrirlash/O'chirish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.map((row) => (
                  <TableRow key={row?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.user?.name}
                    </TableCell>
                    <TableCell>{row?.nomi}</TableCell>
                    <TableCell>{row?.manzili}</TableCell>
                    <TableCell>
                      <Link target="_blank" href={`https://iiv-backend-fdji.onrender.com/uploads/${row?.pdf?.name}`}>
                        {row?.pdf?.name}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="inherit" sx={{ mr: 2 }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => deleteMurojat(row?._id)}>
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

export default MurojatlarPage;
