import { useRef } from 'react';

const TextInput = ({ label, name, ...props }) => {
  const inputRef = useRef(null);

  return (
    <div className='flex flex-col gap-1 m-4'>
      <label htmlFor={name} className='flex gap-0.5 items-center'>
        {label}
        {props.required && <span className='text-primary-red text-sm'>*</span>}
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        className='px-4 py-3 border rounded-lg focus-within:border-secondary-blue focus-within:shadow-secondary-blue focus-within:shadow-shadow-primary transition-all ease-out duration-150'
      >
        <input
          className='w-full focus:outline-none'
          ref={inputRef}
          id={name}
          name={name}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextInput;
