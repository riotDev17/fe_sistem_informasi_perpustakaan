import API_JSON from '../../../../../configs/API_JSON';

const URL = 'rak-buku';

export const requestGetRakBuku = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const rakBuku = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return rakBuku;
  } catch (error) {
    console.log(error);
  }
};
