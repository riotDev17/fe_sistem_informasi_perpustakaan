import API_JSON from '../../../../configs/API_JSON';

const URL = 'siswa';

export const requestGetByID = async (id_siswa: string) => {
  try {
    const response = await API_JSON.get(`/api/${URL}/${id_siswa}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
