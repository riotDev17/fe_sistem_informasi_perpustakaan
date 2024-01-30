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

// Rak Buku
const RakBuku = lazy(() => import('../pages/admin/rakBuku/Index'));
const FormAddRakBuku = lazy(() => import('../pages/admin/rakBuku/Form/FormAdd'));
const FormEditRakBuku = lazy(() => import('../pages/admin/rakBuku/Form/FormEdit'));

// Buku
const Buku = lazy(() => import('../pages/admin/masterBuku/buku/Index'));
const FormAddBuku = lazy(() => import('../pages/admin/masterBuku/buku/Form/FormAdd'));
const FormEditBuku = lazy(() => import('../pages/admin/masterBuku/buku/Form/FormEdit'));

// Siswa
const Siswa = lazy(() => import('../pages/admin/siswa/Index'));
const FormAddSiswa = lazy(() => import('../pages/admin/siswa/Form/FormAdd'));
const FormEditSiswa = lazy(() => import('../pages/admin/siswa/Form/FormEdit'));
const CetakKartuSiswa = lazy(() => import('../pages/admin/siswa/CetakKartuSiswa'));

// Peminjaman Buku
const PeminjamanBuku = lazy(() => import('../pages/admin/masterPeminjamanBuku/peminjaman/Index'));
const FormPeminjamanBuku = lazy(() => import('../pages/admin/masterPeminjamanBuku/peminjaman/Form/FormPeminjamanBuku'));
const RiwayatPeminjamanBuku = lazy(() => import('../pages/admin/masterPeminjamanBuku/riwayatPeminjaman/Index'));

const RiwayatPengembalian = lazy(() => import('../pages/admin/riwayatPengembalian/Index'));
const Profile = lazy(() => import('../pages/admin/profile/Index'));
const Login = lazy(() => import('../pages/admin/auth/SignIn'));

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },

  // Agama
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

  // Kelas
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

  // Rak Buku
  {
    path: '/rak-buku',
    element: <RakBuku />,
  },
  {
    path: '/rak-buku/tambah-rak-buku',
    element: <FormAddRakBuku />,
  },
  {
    path: '/rak-buku/edit-rak-buku/:id_rak_buku',
    element: <FormEditRakBuku />,
  },

  // Buku
  {
    path: '/buku',
    element: <Buku />,
  },
  {
    path: '/buku/tambah-buku',
    element: <FormAddBuku />,
  },
  {
    path: '/buku/edit-buku/:id_buku',
    element: <FormEditBuku />,
  },

  // Siswa
  {
    path: '/siswa',
    element: <Siswa />,
  },
  {
    path: '/siswa/tambah-siswa',
    element: <FormAddSiswa />,
  },
  {
    path: '/siswa/edit-siswa/:id_siswa',
    element: <FormEditSiswa />,
  },
  {
    path: '/siswa/cetak-kartu-siswa/:id_siswa',
    element: <CetakKartuSiswa />,
  },

  // Peminjaman Buku
  {
    path: '/peminjaman-buku',
    element: <PeminjamanBuku />,
  },
  {
    path: '/peminjaman-buku/tambah-peminjaman-buku/:id_siswa',
    element: <FormPeminjamanBuku />,
  },
  {
    path: '/riwayat-peminjaman-buku',
    element: <RiwayatPeminjamanBuku />,
  },

  {
    path: '/riwayat-pengembalian-buku',
    element: <RiwayatPengembalian />,
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
