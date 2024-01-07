import API from '../../../../configs/api';

const URL = 'denda';

export const requestGetByID = async (id_denda: string) => {
  try {
    const response = await API.get(`/api/${URL}/${id_denda}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
