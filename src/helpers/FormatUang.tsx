const FormatUang = (val: number) => {
  const uang: string = `Rp. ${val?.toLocaleString('id-ID') || '0'}`;
  return uang;
};

export default FormatUang;
