const FormatJam = (jam?: string): string | undefined => {
  return jam?.substr(0, 5);
};

export default FormatJam;
