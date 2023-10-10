import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Stack,
  Typography,
  Button,
  TableBody,
  Link,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AddingInformation } from '../sections/@dashboard/malumot';
import Iconify from '../components/iconify';
import LoaderPage from './Loader';

function DisplayingInformation() {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const [loader, setLoader] = useState(false);

  const getMalumotlar = () => {
    setLoader(true);
    fetch('https://iiv-backend-fdji.onrender.com/api/malumotlar/get-all-malumotlar', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
  };

  const deleteMalumot = (id) => {
    fetch(`https://iiv-backend-fdji.onrender.com/api/malumotlar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(() => {
      getMalumotlar();
    });
  };

  useEffect(() => {
    getMalumotlar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AddingInformation onCloses={() => setOpen(false)} onOpen={open} onRequest={() => getMalumotlar()} />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Ma'lumot
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Yangi ma'lumot qo'shish
        </Button>
      </Stack>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Ism Familiya</TableCell>
                <TableCell>Tug'ilgan Yili</TableCell>
                <TableCell>Jinsi</TableCell>
                <TableCell>Ma'lumoti</TableCell>
                <TableCell>Mutaxasisligi</TableCell>
                <TableCell>Unvoni</TableCell>
                <TableCell>IIIda qachondan</TableCell>
                <TableCell>Buyruqdan ko'chirma</TableCell>
                <TableCell>Ketganligida Ma'lumot</TableCell>
                <TableCell>kelganYili</TableCell>
                <TableCell>Tahrirlash Tugmalari</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <>
                  <TableRow>
                    <TableCell colSpan={11}>
                      <LoaderPage />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                user.map((row) => (
                  <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.user?.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tugilganYili.slice(0, 10)}
                    </TableCell>
                    <TableCell>{row.jinsi}</TableCell>
                    <TableCell>{row.malumoti}</TableCell>
                    <TableCell>{row.mutaxasisligi}</TableCell>
                    <TableCell>{row.unvoni}</TableCell>
                    <TableCell>{row.ishBoshlagan.slice(0, 10)}</TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        href={`https://iiv-backend-fdji.onrender.com/uploads/${row?.boshqarmadan?.name}`}
                      >
                        {`${row?.boshqarmadan?.name?.slice(0, 10)}...`}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        href={`https://iiv-backend-fdji.onrender.com/uploads/${row?.ketganMalumot?.name}`}
                      >
                        {`${row?.ketganMalumot?.name?.slice(0, 10)}...`}
                      </Link>
                    </TableCell>
                    <TableCell>{row.kelganYili.slice(0, 10)}</TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="inherit" sx={{ mr: 2 }} onClick={() => console.log(row.id)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => deleteMalumot(row._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default DisplayingInformation;
