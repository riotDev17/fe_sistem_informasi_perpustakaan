import { requestGetBuku } from '../pages/admin/buku/api/requestGetBuku';
import { useEffect, useState } from 'react';
import SelectSearch from '../components/forms/Select/SelectSearch';

interface BukuSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error: string;
  isInputFilled: string;
  onChange: (e: any) => void;
}

const BukuSelect = ({ id, name, label, placeholder, error, isInputFilled, onChange, value }: BukuSelectProps) => {
  const [buku, setBuku] = useState<any[]>([]);

  useEffect(() => {
    requestGetBuku().then((bukuData) => {
      const transformedData = bukuData.map((item: any) => ({
        value: item.id_buku,
        label: item.judul_buku,
      }));

      setBuku(transformedData);
    });
  }, []);

  return (
    <>
      <SelectSearch id={id} name={name} label={label} value={value} onChange={onChange} placeholder={placeholder} options={buku} error={error} isInputFilled={isInputFilled} />
    </>
  );
};

export default BukuSelect;
