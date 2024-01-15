import API_JSON from '../../../../configs/API_JSON';

const URL = 'kelas';

export const requestGetKelas = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const kelas = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return kelas;
  } catch (error) {
    console.log(error);
  }
};
