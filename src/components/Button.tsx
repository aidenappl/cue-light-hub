"use client";
interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: "primary" | "secondary" | "secondary-outline" | "danger" | "none";
  className?: string;
  type?: "submit" | "button";
  href?: string;
  id?: string;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    onClick = () => {},
    style = "primary",
    className = "",
    loading = false,
    id,
    href,
  } = props;

  const colourClasses = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white ",
    secondary: "bg-slate-600 hover:bg-slate-500 text-white",
    "secondary-outline":
      "bg-gray-100 border !border-slate-200 hover:bg-slate-200 text-black",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    none: "bg-transparent hover:bg-gray-200 text-gray-900 bg-slate-150",
  };

  return href ? (
    <a
      onClick={onClick}
      id={id}
      className={`${className} inline-flex items-center justify-center rounded-md text-sm font-semibold py-2.5 px-4  text-nowrap ${colourClasses[style]}`}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></div>
      ) : (
        props.children
      )}
    </a>
  ) : (
    <button
      onClick={onClick}
      id={id}
      className={`${className} inline-flex items-center border-transparent border justify-center rounded-md text-sm font-semibold py-2.5 px-4  text-nowrap ${colourClasses[style]}`}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
