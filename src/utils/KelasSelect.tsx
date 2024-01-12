import { requestGet } from '../pages/admin/kelas/api/requestGet';
import { useEffect, useState } from 'react';
import SelectSearch from '../components/forms/Select/SelectSearch';

interface KelasSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error: string;
  isInputFilled: string;
  onChange: (e: any) => void;
}

const KelasSelect = ({ id, name, label, placeholder, error, isInputFilled, onChange, value }: KelasSelectProps) => {
  const [kelas, setKelas] = useState<any[]>([]);

  useEffect(() => {
    requestGet().then((kelasData) => {
      const transformedData = kelasData.map((item: any) => ({
        value: item.id_kelas,
        label: item.nama_kelas,
      }));
      setKelas(transformedData);
    });
  }, []);

  return (
    <>
      <SelectSearch id={id} name={name} label={label} value={value} onChange={onChange} placeholder={placeholder} options={kelas} error={error} isInputFilled={isInputFilled} />
    </>
  );
};

export default KelasSelect;
