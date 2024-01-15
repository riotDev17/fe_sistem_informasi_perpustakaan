import { requestGetRakBuku } from '../pages/admin/masterBuku/rakBuku/api/requestGetRakBuku';
import { useEffect, useState } from 'react';
import SelectSearch from '../components/forms/Select/SelectSearch';

interface RakBukuSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error: string;
  isInputFilled: string;
  onChange: (e: any) => void;
}

const RakBukuSelect = ({ id, name, label, placeholder, error, isInputFilled, onChange, value }: RakBukuSelectProps) => {
  const [rakBuku, setRakBuku] = useState<any[]>([]);

  useEffect(() => {
    requestGetRakBuku().then((rakBukuData) => {
      const transformedData = rakBukuData.map((item: any) => ({
        value: item.id_rak_buku,
        label: item.nama_rak_buku,
      }));
      setRakBuku(transformedData);
    });
  }, []);

  return (
    <>
      <SelectSearch id={id} name={name} label={label} value={value} onChange={onChange} placeholder={placeholder} options={rakBuku} error={error} isInputFilled={isInputFilled} />
    </>
  );
};

export default RakBukuSelect;
