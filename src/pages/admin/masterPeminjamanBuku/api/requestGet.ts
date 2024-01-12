import API_JSON from '../../../../configs/API_JSON';

const URL = 'peminjaman-buku';

export const requestGet = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const peminjamanBuku = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return peminjamanBuku;
  } catch (error) {
    console.log(error);
  }
};
