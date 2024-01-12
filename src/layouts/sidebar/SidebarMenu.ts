export const SidebarMenu = [
  {
    title: 'Dashboard',
    icon: 'ic:round-dashboard',
    link: '/',
  },
  {
    title: 'Agama',
    icon: 'mdi:religion-christian',
    link: '/agama',
  },
  {
    title: 'Kelas',
    icon: 'streamline:class-lesson-solid',
    link: '/kelas',
  },
  {
    title: 'Master Buku',
    icon: 'iconoir:book-solid',
    link: '#',
    child: [
      {
        childTitle: 'Rak Buku',
        childLink: '/rak-buku',
      },
      {
        childTitle: 'Buku',
        childLink: '/buku',
      },
    ],
  },
  {
    title: 'Siswa',
    icon: 'ph:student-fill',
    link: '/siswa',
  },
  {
    title: 'Master Peminjaman Buku',
    icon: 'material-symbols:book',
    link: '#',
    child: [
      {
        childTitle: 'Peminjaman',
        childLink: '/peminjaman-buku',
      },
      {
        childTitle: 'Riwayat Peminjaman',
        childLink: '/riwayat-peminjaman-buku',
      },
    ],
  },
  {
    title: 'Denda',
    icon: 'mdi:dollar',
    link: '/denda',
  },
  {
    title: 'Riwayat Pengembalian',
    icon: 'material-symbols:history',
    link: '/riwayat-pengembalian',
  },
];
