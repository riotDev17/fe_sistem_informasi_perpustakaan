import API_JSON from '../../../../configs/API_JSON';

const URL = 'kelas';

export const requestGetByID = async (id_kelas: string) => {
  try {
    const response = await API_JSON.get(`/api/${URL}/${id_kelas}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
