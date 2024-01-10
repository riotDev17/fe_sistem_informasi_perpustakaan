import API_JSON from '../../../../configs/API_JSON';

export const requestGet = async () => {
  try {
    const response = await API_JSON.get('/api/admin');
    const admin = response.data;
    return admin;
  } catch (error) {
    console.log(error);
  }
};
