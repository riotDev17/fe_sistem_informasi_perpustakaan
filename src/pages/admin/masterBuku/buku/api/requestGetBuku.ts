import API_JSON from '../../../../../configs/API_JSON';

const URL = 'buku';

export const requestGetBuku = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const buku = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return buku;
  } catch (error) {
    console.log(error);
  }
};
