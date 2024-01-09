import API_JSON from '../../../../../configs/API_JSON';

const URL = 'rak-buku';

export const requestGetByID = async (id_rak_buku: string) => {
  try {
    const response = await API_JSON.get(`/api/${URL}/${id_rak_buku}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
