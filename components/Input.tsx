import React from 'react';

interface IInput {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      className={`
        w-full 
        p-4 
        text-lg 
        bg-black 
        border-2 
        border-neutral-800 
        rounded-md 
        outline-none
        text-white
        focus:border-sky-500
        focus:border-2
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
    `}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
