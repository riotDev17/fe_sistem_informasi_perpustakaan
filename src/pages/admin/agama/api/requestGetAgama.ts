import API_JSON from '../../../../configs/API_JSON';

const URL = 'agama';

export const requestGetAgama = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const agama = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return agama;
  } catch (error) {
    console.log(error);
  }
};
