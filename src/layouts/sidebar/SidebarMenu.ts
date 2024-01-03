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
    title: 'Peminjaman Buku',
    icon: 'material-symbols:book',
    link: '/peminjaman-buku',
  },
  {
    title: 'Denda',
    icon: 'mdi:dollar',
    link: '/denda',
  },
  {
    title: 'Riwayat Peminjaman',
    icon: 'material-symbols:history',
    link: '/riwayat-peminjaman',
  },
];
