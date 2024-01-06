import API from '../../../../configs/api';

export const GET = async () => {
  try {
    const response = await API.get('/api/agama');
    const agama = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return agama;
  } catch (error) {
    console.log(error);
    return [];
  }
};
