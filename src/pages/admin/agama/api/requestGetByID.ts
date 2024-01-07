import API from '../../../../configs/api';

const URL = 'agama';

export const requestGetByID = async (id_agama: string) => {
  try {
    const response = await API.get(`/api/${URL}/${id_agama}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
