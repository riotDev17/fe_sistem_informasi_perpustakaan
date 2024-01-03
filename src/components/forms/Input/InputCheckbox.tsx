import React from 'react';

interface InputCheckboxProps {
  id: string;
  name: string;
  text: string;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({ id, name, text }) => {
  return (
    <>
      <div className="mb-5">
        <label className="flex items-center cursor-pointer">
          <input id={id} name={name} type="checkbox" className="form-checkbox" />
          <span className=" text-white-dark">{text}</span>
        </label>
      </div>
    </>
  );
};

export default InputCheckbox;
