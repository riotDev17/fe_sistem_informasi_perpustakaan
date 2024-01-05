import { forwardRef, ForwardedRef } from 'react';

interface ButtonSolidPrimaryProps {
  onClick?: () => void;
  text: string;
  width?: string;
}

const ButtonSolidPrimary = forwardRef(({ onClick, text, width }: ButtonSolidPrimaryProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <>
      <button ref={ref} onClick={onClick} type="submit" className={`btn btn-primary ${width}`}>
        {text}
      </button>
    </>
  );
});

export default ButtonSolidPrimary;
