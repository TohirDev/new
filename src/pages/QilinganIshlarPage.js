/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// import { useForm } from 'react-hook-form';
import Scrollbar from '../components/scrollbar/Scrollbar';
import Iconify from '../components/iconify';
// import PDF from '../../public/assets/icons/ic_flag_de.svg';
import AddingQilinganIshlar from '../sections/@dashboard/qilinganIshlar/addingQilinganIshlar';
import { token } from '../sections/@dashboard/user/addingUsers';
// import {} from '../../../../../../MVD-backend/server/uploads'
function QilinganIshlarPage() {
  const [open, setOpen] = useState(false);
  const [ishlarData, setIshlarData] = useState([]);
  // const { register, handleSubmit } = useForm();

  const getIshlar = () => {
    fetch('https://iiv-backend-fdji.onrender.com/api/ishlar/get-all-ish', {
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
      .then((data) => setIshlarData(data?.data))
      .catch((error) => console.log(error));
  };

  const deleteIshById = (id) => {
    fetch(`https://iiv-backend-fdji.onrender.com/api/ishlar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(() => {
      getIshlar();
    });
  };

  useEffect(() => {
    getIshlar();
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Qilingan ishlar
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpen(true)}>
          Qo'shish
        </Button>
      </Stack>
      <Card>
        <AddingQilinganIshlar onOpen={open} onCloses={() => setOpen(false)} onRequest={() => getIshlar()} />
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Foydalanuvchi</TableCell>
                  <TableCell>Qaysi tur</TableCell>
                  <TableCell>Soni</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Vaqti</TableCell>
                  <TableCell>O'chirish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ishlarData.map((ish) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableRow key={ish?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {ish?.user?.name}
                    </TableCell>
                    <TableCell>{ish?.modda}</TableCell>
                    <TableCell>{ish?.soni}</TableCell>
                    <TableCell>
                      <Link target="_blank" href={`https://iiv-backend-fdji.onrender.com/uploads/${ish?.file?.name}`}>
                        {ish?.file?.name}
                      </Link>
                    </TableCell>
                    <TableCell>{ish?.createdAt?.slice(0, 10)}</TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="error" onClick={() => deleteIshById(ish?._id)}>
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

export default QilinganIshlarPage;
