export const SidebarMenu = [
  {
    title: 'Dashboard',
    icon: 'ic:round-dashboard',
    link: '/',
  },
  {
    title: 'Master',
    icon: 'material-symbols:database',
    link: '#',
    child: [
      {
        childTitle: 'Agama',
        childLink: '/agama',
      },
      {
        childTitle: 'Kelas',
        childLink: '/kelas',
      },
      {
        childTitle: 'Rak Buku',
        childLink: '/rak-buku',
      },
    ],
  },
  {
    title: 'Buku',
    icon: 'iconoir:book-solid',
    link: '/buku',
  },
  {
    title: 'Siswa',
    icon: 'ph:student-fill',
    link: '/siswa',
  },
  {
    title: 'Peminjaman Buku',
    icon: 'material-symbols:book',
    link: '/peminjaman-buku',
  },
  {
    title: 'Riwayat',
    icon: 'material-symbols:history',
    link: '#',
    child: [
      {
        childTitle: 'Peminjaman Buku',
        childLink: '/riwayat-peminjaman-buku',
      },
      {
        childTitle: 'Pengembalian Buku',
        childLink: '/riwayat-pengembalian-buku',
      },
    ],
  },
];
