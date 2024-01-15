import API_JSON from '../../../../configs/API_JSON';

const URL = 'siswa';

export const requestGetSiswa = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const siswa = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return siswa;
  } catch (error) {
    console.log(error);
  }
};
