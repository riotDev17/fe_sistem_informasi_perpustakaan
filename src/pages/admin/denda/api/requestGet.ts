import API from '../../../../configs/api';

const URL = 'denda';

export const requestGet = async () => {
  try {
    const response = await API.get(`/api/${URL}`);
    const denda = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return denda;
  } catch (error) {
    console.log(error);
  }
};
