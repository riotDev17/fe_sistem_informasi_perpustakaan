import API_JSON from '../../../../../configs/API_JSON';

const URL = 'buku';

export const requestGetByID = async (id_buku: string) => {
  try {
    const response = await API_JSON.get(`/api/${URL}/${id_buku}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
