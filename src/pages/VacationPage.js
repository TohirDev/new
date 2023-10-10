// /* eslint-disable */

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
import { token } from '../sections/@dashboard/user/addingUsers';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import AddingVacation from '../sections/@dashboard/tatil_varaqa/addingVacation';

function VacationPage() {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState([]);
  const getVaraqa = () => {
    fetch('https://iiv-backend-fdji.onrender.com/api/varaqalar/get-all-varaqa', {
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
      .catch((error) => console.log(error));
  };

  const deleteVaraqa = (id) => {
    fetch(`https://iiv-backend-fdji.onrender.com/api/varaqalar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(() => {
      getVaraqa();
    });
  };

  useEffect(() => {
    getVaraqa();
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Ta'til Varaqa
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Ta'til Varaqa Qo'shish
        </Button>
      </Stack>
      <AddingVacation onOpen={open} onCloses={() => setOpen(false)} onRequest={() => getVaraqa()} />
      <Card>
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ism Familiya</TableCell>
                  <TableCell>Tatil Varaqa</TableCell>
                  <TableCell>Spravka</TableCell>
                  <TableCell>Tahrirlash</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.map((row) => (
                  <TableRow key={row?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.user?.name}
                    </TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        href={`https://iiv-backend-4ila.onrender.comuploads/${row?.tatilVaraqa?.name}`}
                      >
                        {row?.tatilVaraqa?.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        href={`https://iiv-backend-4ila.onrender.comuploads/${row?.malumotNoma?.name}`}
                      >
                        {row?.malumotNoma?.name}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="inherit" sx={{ mr: 2 }} onClick={() => console.log(row.id)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => deleteVaraqa(row._id)}>
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
}

export default VacationPage;
