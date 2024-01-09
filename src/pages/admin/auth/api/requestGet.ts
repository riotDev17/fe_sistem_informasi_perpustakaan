import API_JSON from '../../../../configs/API_JSON';

export const requestGet = async () => {
  try {
    const response = await API_JSON.get('/api/admin');
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
