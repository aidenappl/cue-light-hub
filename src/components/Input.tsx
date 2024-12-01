"use client";

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    placeholder,
    onChange = () => {},
    id,
    className = '',
    label,
    value,
    onEnter = () => {},
    onKeyDown = () => {},
    type = 'text',
    name,
  } = props;
  return (
    <div>
      {label ? (
        <label htmlFor='email' className='block font-medium text-gray-900 text-sm/6'>
          {label}
        </label>
      ) : null}
      <input
        name={name}
        className={`${className} block w-full h-10 px-3 ${label ? 'mt-2' : ''}bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200`}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={e => {
          onKeyDown(e);
          if (e.key === 'Enter' && props.onEnter) {
            onEnter(e);
          }
        }}
        placeholder={placeholder}></input>
    </div>
  );
};

export default Input;
