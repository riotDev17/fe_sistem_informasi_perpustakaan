const FormatNumberWithCommas = (value: any) => {
  const formattedValue = value === 0 ? '' : value.toString();

  // Gunakan ekspresi reguler yang memastikan titik sebagai pemisah setiap tiga digit angka
  return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default FormatNumberWithCommas;
