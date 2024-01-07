import { lazy } from 'react';
import Error404 from '../pages/Error404';

const Dashboard = lazy(() => import('../pages/admin/dashboard/Index'));

// Agama
const Agama = lazy(() => import('../pages/admin/agama/Index'));
const FormAddAgama = lazy(() => import('../pages/admin/agama/Form/FormAdd'));
const FormEditAgama = lazy(() => import('../pages/admin/agama/Form/FormEdit'));

// Kelas
const Kelas = lazy(() => import('../pages/admin/kelas/Index'));
const FormAddKelas = lazy(() => import('../pages/admin/kelas/Form/FormAdd'));
const FormEditKelas = lazy(() => import('../pages/admin/kelas/Form/FormEdit'));

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
    path: '/agama/tambah-agama',
    element: <FormAddAgama />,
  },
  {
    path: '/agama/edit-agama/:id_agama',
    element: <FormEditAgama />,
  },
  {
    path: '/kelas',
    element: <Kelas />,
  },
  {
    path: '/kelas/tambah-kelas',
    element: <FormAddKelas />,
  },
  {
    path: '/kelas/edit-kelas/:id_kelas',
    element: <FormEditKelas />,
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
    path: '/profile/:id_admin',
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
