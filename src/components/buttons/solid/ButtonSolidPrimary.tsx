import { forwardRef, ForwardedRef } from 'react';

interface ButtonSolidPrimaryProps {
  onClick?: () => void;
  text: string;
}

const ButtonSolidPrimary = forwardRef(({ onClick, text }: ButtonSolidPrimaryProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <>
      <button ref={ref} onClick={onClick} type="submit" className="btn btn-primary w-full">
        {text}
      </button>
    </>
  );
});

export default ButtonSolidPrimary;
