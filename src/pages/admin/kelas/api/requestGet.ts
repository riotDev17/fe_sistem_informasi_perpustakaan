import API from '../../../../configs/api';

const URL = 'kelas';

export const requestGet = async () => {
  try {
    const response = await API.get(`/api/${URL}`);
    const kelas = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return kelas;
  } catch (error) {
    console.log(error);
  }
};
