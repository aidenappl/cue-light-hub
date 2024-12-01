"use client";
interface InputProps {
  placeholder?: string;
  value?: string;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  onEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setValue?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea = (props: InputProps) => {
  const {
    placeholder,
    onChange = () => {},
    id,
    className = "",
    label,
    value,
    resize = "none",
    onEnter = () => {},
    setValue = () => {},
    onKeyDown = () => {},
    name,
  } = props;
  return (
    <div>
      {label ? (
        <label
          htmlFor="email"
          className="block font-medium text-gray-900 text-sm/6"
        >
          {label}
        </label>
      ) : null}
      <textarea
        name={name}
        className={`${className} py-2.5 block w-full h-[150px] max-h-[300px] px-3 ${
          label ? "mt-2" : ""
        }bg-white rounded-md shadow-sm appearance-none text-slate-900 sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200`}
        id={id}
        style={{ resize }}
        value={value}
        onChange={(e) => {
          onChange(e);
          setValue(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          onKeyDown(e);
          if (e.key === "Enter" && props.onEnter) {
            onEnter(e);
          }
        }}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default Textarea;
