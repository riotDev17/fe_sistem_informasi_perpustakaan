import API from '../../../../configs/api';

export const GET = async () => {
  try {
    const response = await API.get('/api/admin');
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
