import API_JSON from '../../../../configs/API_JSON';

const URL = 'denda';

export const requestGetByIDDenda = async (id_denda: string) => {
  try {
    const response = await API_JSON.get(`/api/${URL}/${id_denda}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
