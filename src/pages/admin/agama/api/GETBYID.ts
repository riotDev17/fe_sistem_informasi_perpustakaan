import API from '../../../../configs/api';

export const GETBYID = async (id_agama: string) => {
  try {
    const response = await API.get(`/api/agama/${id_agama}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};