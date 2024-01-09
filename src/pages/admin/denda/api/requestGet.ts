import API_JSON from '../../../../configs/API_JSON';

const URL = 'denda';

export const requestGet = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const denda = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return denda;
  } catch (error) {
    console.log(error);
  }
};
