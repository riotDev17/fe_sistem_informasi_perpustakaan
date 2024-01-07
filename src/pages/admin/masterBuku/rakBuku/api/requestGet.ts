import API from '../../../../../configs/api';

const URL = 'rak-buku';

export const requestGet = async () => {
  try {
    const response = await API.get(`/api/${URL}`);
    const rakBuku = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return rakBuku;
  } catch (error) {
    console.log(error);
  }
};
