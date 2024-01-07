import API from '../../../../configs/api';

const URL = 'kelas';

export const requestGetByID = async (id_kelas: string) => {
  try {
    const response = await API.get(`/api/${URL}/${id_kelas}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
