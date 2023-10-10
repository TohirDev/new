import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
// sections
import { AppCurrentVisits, AppWidgetSummary, AppConversionRates } from '../sections/@dashboard/app';

import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line import/order
import { Icon } from 'leaflet';
import { uzbData } from './uzb';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const center = [40.12442709646927, 67.87769254689282];
  const pupUps = [
    {
      id: 1,
      geo: [40.12442709646927, 67.87769254689282],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 2,
      geo: [41.18913787242496, 69.18116326412513],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 3,
      geo: [39.77366088379456, 66.89763474240752],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 4,
      geo: [41.06520868848897, 71.56958948116214],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 5,
      geo: [40.46925158508445, 71.70683726579423],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 6,
      geo: [40.93400383119693, 72.27412810894019],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 7,
      geo: [38.86205403249329, 65.80274959034251],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 8,
      geo: [40.101966145291264, 65.35114059442306],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 9,
      geo: [39.769876804811055, 64.44065031739264],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 10,
      geo: [41.629628497603896, 60.593523702924884],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 11,
      geo: [42.54928433086732, 59.55816107357102],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
    {
      id: 12,
      geo: [37.33577404703163, 67.39998787228755],
      tumanlar: [
        {
          name: 'Arnasoy tumani',
          number: 3,
        },
        {
          name: 'Baxmat tumani',
          number: 10,
        },
        {
          name: "Do'stlik tumani",
          number: 3,
        },
        {
          name: 'Forish tumani',
          number: 6,
        },
        {
          name: "G'allaorol tumani",
          number: 11,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: 'Jizzax tumani',
          number: 9,
        },
        {
          name: "Mirzacho'l tumani",
          number: 3,
        },
        {
          name: 'Paxtakor tumani',
          number: 4,
        },

        {
          name: 'Yangiobod tumani',
          number: 4,
        },
        {
          name: 'Zafarobod tumani',
          number: 4,
        },

        {
          name: 'Zarband tumani',
          number: 4,
        },
        {
          name: 'Zomin tumani',
          number: 4,
        },
      ],
    },
  ];
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/149/149059.png',
    iconSize: [30, 30],
  });

  return (
    <>
      <Helmet>
        <title>IIB</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Viloyatlar" total={12} color="info" icon={'tdesign:data'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tumanlar" total={210} color="info" icon={'carbon:user-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Xodimlar" total={300} color="info" icon={'carbon:user-data'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Maktablar" total={1230} color="info" icon={'fluent:data-area-20-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8} key={1}>
            <MapContainer
              center={center}
              zoom={7}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              }}
            >
              <TileLayer
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Wnj1VB2TZlK2apMlLIne"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              />
              {pupUps.map((e) => (
                // eslint-disable-next-line react/jsx-key
                <Marker key={e?.id} position={e.geo} icon={customIcon}>
                  <Popup minWidth={300}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                      >
                        <h3>Hodimlar soni</h3>
                        {e?.tumanlar?.map((tuman) => (
                          // eslint-disable-next-line react/jsx-key
                          <div
                            key={tuman?.name}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
                            <span style={{ marginBottom: '5px', marginRight: 'auto', fontWeight: 'bold' }}>
                              {tuman.name}:
                            </span>
                            <span style={{ fontSize: '18px' }}>{tuman.number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {uzbData.features.map((state) => {
                const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

                return (
                  // eslint-disable-next-line react/jsx-key
                  <Polygon key={state.properties.ADM1_EN} positions={coordinates} />
                );
              })}
            </MapContainer>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Maktablar"
              chartData={[
                { label: "Vilayat bo'yicha maktablar", value: 10344 },
                { label: 'Erkak', value: 4435 },
                { label: 'Ayol', value: 2443 },
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
            <AppConversionRates
              title="Viloyatlar statistikasi"
              // subheader="(+43%) than last year"
              chartData={[
                { label: 'Qoraqalpog‘iston Respublikasi', value: 400 },
                { label: 'Andijon viloyati', value: 430 },
                { label: 'Buxoro viloyati', value: 448 },
                { label: 'Jizzax viloyati', value: 470 },
                { label: 'Qashqadaryo viloyati', value: 540 },
                { label: 'Navoiy viloyati', value: 580 },
                { label: 'Namangan viloyati', value: 690 },
                { label: 'Samarqand viloyati', value: 1100 },
                { label: 'Surxandaryo viloyati', value: 1200 },
                { label: 'Sirdaryo viloyati', value: 1380 },
                { label: 'Toshkent viloyati', value: 1480 },
                { label: 'Farg‘ona viloyati', value: 1580 },
                { label: 'Xorazm viloyati', value: 1680 },
                { label: 'Toshkent shahri', value: 1880 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Murojatlar"
              chartData={[
                { label: 'Qoraqalpog‘iston Respublikasi', value: 1400 },
                { label: 'Andijon viloyati', value: 1430 },
                { label: 'Buxoro viloyati', value: 1448 },
                { label: 'Jizzax viloyati', value: 1470 },
                { label: 'Qashqadaryo viloyati', value: 1540 },
                { label: 'Navoiy viloyati', value: 1580 },
                { label: 'Namangan viloyati', value: 1690 },
                { label: 'Samarqand viloyati', value: 1100 },
                { label: 'Surxandaryo viloyati', value: 1200 },
                { label: 'Sirdaryo viloyati', value: 1380 },
                { label: 'Toshkent viloyati', value: 1480 },
                { label: 'Farg‘ona viloyati', value: 1580 },
                { label: 'Xorazm viloyati', value: 1680 },
                { label: 'Toshkent shahri', value: 1880 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
