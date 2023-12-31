import React from 'react';
import IconLoader from '../../Icons/IconLoader';

interface ButtonLoaderDefaultProps {
  text: string;
  backgroundColor?: string;
}

const ButtonLoaderCircle: React.FC<ButtonLoaderDefaultProps> = ({ text, backgroundColor }) => {
  return (
    <>
      <button type="button" className={`btn ${backgroundColor} btn-lg ltr:ml-4 rtl:mr-4`} disabled>
        <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
        {text}
      </button>
    </>
  );
};

export default ButtonLoaderCircle;
