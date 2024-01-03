import { lazy } from 'react';
import Error404 from '../pages/Error404';

const Dashboard = lazy(() => import('../pages/admin/dashboard/Index'));
const Agama = lazy(() => import('../pages/admin/agama/Index'));
const Kelas = lazy(() => import('../pages/admin/kelas/Index'));
const RakBuku = lazy(() => import('../pages/admin/masterBuku/rakBuku/Index'));
const Buku = lazy(() => import('../pages/admin/masterBuku/buku/Index'));
const Siswa = lazy(() => import('../pages/admin/siswa/Index'));
const PeminjamanBuku = lazy(() => import('../pages/admin/peminjamanBuku/Index'));
const Denda = lazy(() => import('../pages/admin/denda/Index'));
const RiwayatPeminjaman = lazy(() => import('../pages/admin/riwayatPeminjaman/Index'));
const Profile = lazy(() => import('../pages/admin/profile/Index'));
const Login = lazy(() => import('../pages/admin/auth/SignIn'));

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/agama',
    element: <Agama />,
  },
  {
    path: '/kelas',
    element: <Kelas />,
  },
  {
    path: '/rak-buku',
    element: <RakBuku />,
  },
  {
    path: '/buku',
    element: <Buku />,
  },
  {
    path: '/siswa',
    element: <Siswa />,
  },
  {
    path: '/peminjaman-buku',
    element: <PeminjamanBuku />,
  },
  {
    path: '/denda',
    element: <Denda />,
  },
  {
    path: '/riwayat-peminjaman',
    element: <RiwayatPeminjaman />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/auth/admin/login',
    element: <Login />,
    layout: 'blank',
  },
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
];

export { routes };
