import Swal from 'sweetalert2';
import auth from '../../../../configs/auth';
import API_JSON from '../../../../configs/API_JSON';

export const requestLogin = async (username: string, password: string): Promise<any> => {
  try {
    const data = { username, password };
    const response = await API_JSON.post('/auth/admin/login', data);

    if (response.status === 200) {
      const { data } = response;
      const token = data.data.token;
      const username = data.data.username;

      auth.setToken(token);
      auth.setUsername(username);

      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'success',
        title: `Selamat Datang ${username}`,
        padding: '10px 20px',
      });

      return true;
    }
  } catch (error) {
    console.log(error);
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
    });
    toast.fire({
      icon: 'error',
      title: 'Username atau Password Salah',
      padding: '10px 20px',
    });

    return false;
  }
};
