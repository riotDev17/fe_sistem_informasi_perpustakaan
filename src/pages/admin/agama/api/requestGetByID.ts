import API_JSON from '../../../../configs/API_JSON';

const URL = 'agama';

export const requestGetByID = async (id_agama: string) => {
  try {
    const response = await API_JSON.get(`/api/${URL}/${id_agama}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
