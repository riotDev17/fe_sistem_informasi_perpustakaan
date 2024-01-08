import API from '../../../../../configs/API_JSON';

const URL = 'buku';

export const requestGet = async () => {
  try {
    const response = await API.get(`/api/${URL}`);
    const buku = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return buku;
  } catch (error) {
    console.log(error);
  }
};
