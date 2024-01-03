class Auth {
  setToken = (token: string) => {
    return window.localStorage.setItem('token', token);
  };

  getToken = () => {
    return window.localStorage.getItem('token');
  };

  removeToken = () => {
    return window.localStorage.removeItem('token');
  };
}

export default new Auth();
