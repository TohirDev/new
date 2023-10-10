// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Foydalanuvchilar',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Malumot',
    path: '/dashboard/information',
    icon: icon('ic_cart'),
  },
  {
    title: "Ta'til varaqa",
    path: '/dashboard/tatil_varaqa',
    icon: icon('ic_blog'),
  },
  {
    title: 'Maktab',
    path: '/dashboard/maktab',
    icon: icon('ic_cart'),
  },
  {
    title: 'Mahalla',
    path: '/dashboard/mahalla',
    icon: icon('ic_cart'),
  },
  {
    title: 'JPS',
    path: '/dashboard/jps',
    icon: icon('ic_cart'),
  },
  {
    title: 'Murojaatlar',
    path: '/dashboard/murojat',
    icon: icon('ic_cart'),
  },
  {
    title: 'Qilingan ishlar',
    path: '/dashboard/ishlar',
    icon: icon('ic_cart'),
  },
  {
    title: "O'quvchilar balansi",
    path: '/dashboard/balans',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
