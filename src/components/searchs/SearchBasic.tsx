import React from 'react';
import IconSearch from '../Icons/IconSearch';
import IconXCircle from '../Icons/IconXCircle';

interface SearchBasicProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  value?: string;
  width?: string;
}

const SearchBasic: React.FC<SearchBasicProps> = ({ onChange, placeholder, value, width }) => {
  return (
    <>
      <div className={`sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden ${width} `}>
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest placeholder:dark:text-white dark:text-white border border-gray-300"
            placeholder={placeholder}
          />
          <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary dark:text-white ">
            <IconSearch className="mx-auto" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBasic;
