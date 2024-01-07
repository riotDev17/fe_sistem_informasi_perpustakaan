import API from '../../../../../configs/api';

const URL = 'rak-buku';

export const requestGetByID = async (id_rak_buku: string) => {
  try {
    const response = await API.get(`/api/${URL}/${id_rak_buku}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
