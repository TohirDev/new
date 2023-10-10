import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { token } from '../user/addingUsers';
import { AppCurrentVisits } from '../app';

function OquvchilarBalansi() {
  const [viloyat, setViloyat] = useState([]);
  const [tuman, setTuman] = useState([]);
  const isTrue = true;
  const theme = useTheme();
  const maktabData = [
    {
      id: 1,
      maktab: '19-maktab',
    },
    {
      id: 2,
      maktab: '11-maktab',
    },
    {
      id: 3,
      maktab: '15-maktab',
    },
    {
      id: 4,
      maktab: '1-maktab',
    },
  ];
  const sinflar = [
    {
      id: 1,
      maktab: '1-sinf',
    },
    {
      id: 2,
      maktab: '2-sinf',
    },
    {
      id: 3,
      maktab: '3-sinf',
    },
    {
      id: 4,
      maktab: '4-sinf',
    },
    {
      id: 5,
      maktab: '5-sinf',
    },
    {
      id: 6,
      maktab: '6-sinf',
    },
    {
      id: 7,
      maktab: '7-sinf',
    },
    {
      id: 8,
      maktab: '8-sinf',
    },
    {
      id: 9,
      maktab: '9-sinf',
    },
    {
      id: 10,
      maktab: '10-sinf',
    },
    {
      id: 11,
      maktab: '11-sinf',
    },
  ];
  const sameStyle = {
    margin: '0px 10px',
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

  return (
    <Card>
      <CardHeader title="O'quvchilar balansi" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Box style={sameStyle} sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Viloyatlar</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Viloyatlar">
                  {viloyat?.map((region) => (
                    <MenuItem onClick={() => getTumanByViloyatId(region?._id)} key={region._id} value={region._id}>
                      {region.nomi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box style={sameStyle} sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tumanlar</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Tumanlar">
                  {tuman?.map((region) => (
                    <MenuItem key={region._id} value={region._id}>
                      {region.nomi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box style={sameStyle} sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Maktablar</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Maktablar">
                  {maktabData?.map((maktab) => (
                    <MenuItem key={maktab.id} value={maktab.id}>
                      {maktab.maktab}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box style={sameStyle} sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sinflar</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Sinflar">
                  {sinflar?.map((maktab) => (
                    <MenuItem key={maktab.id} value={maktab.id}>
                      {maktab.maktab}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          {isTrue && (
            <Grid container spacing={3} sx={{ ml: 1, mt: 1 }}>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="1-toifa: Qizlar Millati"
                  chartData={[
                    { label: "O'zbek qizlar", value: 15344 },
                    { label: 'Rus qizlar', value: 4435 },
                    { label: 'Qozoq', value: 2443 },
                    { label: 'Qoraqolpoq', value: 1543 },
                    { label: "Qirg'iz", value: 1043 },
                    { label: 'Tojik', value: 1443 },
                    { label: 'Turkman', value: 1345 },
                    { label: 'Boshqa', value: 1456 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppCurrentVisits
                  title="2-toifa: Maktab bo'yicha o'quvchilar ijtimoiy holati"
                  chartData={[
                    { label: 'Tayanch harakati shikastlangan odamlar', value: 10344 },
                    { label: 'Zaif eshituvchilar', value: 4435 },
                    { label: "Ko'zi ojizlar", value: 2443 },
                    { label: 'Eshitishda nuqsoni borlar', value: 2443 },
                    { label: 'Nutqida nuqsoni borlar', value: 2443 },
                    { label: 'Boshqa turdagi nogironlar', value: 2443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="3-toifa: Iqtidorli o'quvchilar"
                  chartData={[
                    { label: 'Mahalliy', value: 109 },
                    { label: 'Hududiy', value: 101 },
                    { label: 'Respublika', value: 20 },
                    { label: 'Xalqaro', value: 2 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="4-toifa: Besh tashabbus"
                  chartData={[
                    { label: '1-tashabbus', value: 5344 },
                    { label: '2-tashabbus', value: 4344 },
                    { label: '3-tashabbus', value: 3344 },
                    { label: '4-tashabbus', value: 2344 },
                    { label: '5-tashabbus', value: 2244 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="5-toifa: O'quvchilarni xulq atvori"
                  chartData={[
                    { label: "Yolg'onchilik", value: 10344 },
                    { label: "O'g'rilik", value: 4435 },
                    { label: 'Giyohvandlik', value: 2443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="6-toifa: O'quvchilarning oilaviy holati"
                  chartData={[
                    { label: 'Erta turmush qurgan', value: 10344 },
                    { label: 'Ajrim yoqasida', value: 4435 },
                    { label: 'Ajrashgan', value: 2443 },
                    { label: "Erta tug'ruqlar soni", value: 2443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="7-toifa: O'quvchilar o'rtasida huquq buzarlik"
                  chartData={[
                    { label: 'Muntazam dars qoldiradiganlar', value: 10344 },
                    { label: "Onlay qimor o'ynaydigalar", value: 5435 },
                    { label: 'Jinoyat sodir etganlar', value: 1443 },
                    { label: "Maktab ichki ro'yxatiga olinganlar", value: 4443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OquvchilarBalansi;
