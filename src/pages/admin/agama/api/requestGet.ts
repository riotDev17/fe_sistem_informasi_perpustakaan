import API from '../../../../configs/api';

const URL = 'agama';

export const requestGet = async () => {
  try {
    const response = await API.get(`/api/${URL}`);
    const agama = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return agama;
  } catch (error) {
    console.log(error);
  }
};
