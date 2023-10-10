/* eslint-disable jsx-a11y/alt-text */
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';
import IMG from './img.png';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  return (
    <>
      <Helmet>
        <title> Kirish</title>
      </Helmet>

      <StyledRoot>
        {/* <img style={{ width: '90px', height: '60px' }} src={IMG} /> */}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 0, mb: 5, textAlign: 'center' }}>
              E-INSPEKTOR PSIXOLOG AXBOROT TIZIMI
            </Typography>
            <img src={IMG} alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Tizimga kirish
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}