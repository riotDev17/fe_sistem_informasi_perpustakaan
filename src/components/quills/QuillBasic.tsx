import ReactQuill from 'react-quill';

interface QuillBasicProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: string;
  isInputFilled: string;
}

const QuillBasic: React.FC<QuillBasicProps> = ({ id, label, value, onChange, error, isInputFilled }) => {
  const isFilled = value !== '';

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <ReactQuill theme="snow" id={id} value={value} onChange={onChange} />

      {error && <span className="text-danger">{error}</span>}
      {isFilled && !error && <span className="text-success">{isInputFilled}</span>}
    </>
  );
};

export default QuillBasic;
