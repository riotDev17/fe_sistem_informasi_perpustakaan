import API_JSON from '../../../../configs/API_JSON';

const URL = 'riwayat';

export const requestGetRiwayatPengembalian = async () => {
  try {
    const response = await API_JSON.get(`/api/${URL}`);
    const riwayat = response.data.data.map((item: any, index: number) => ({ ...item, index }));
    return riwayat;
  } catch (error) {
    console.log(error);
  }
};
