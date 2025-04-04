"use client";

export enum InputColor {
  PRIMARY = "bg-primary",
  SECONDARY = "bg-secondary",
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  color?: InputColor;
  iconLeft?: React.ReactNode;
  propsContainer?: React.HTMLProps<HTMLDivElement>;
}

function Input({
  placeholder,
  iconLeft,
  color = InputColor.SECONDARY,
  propsContainer,
  className,
  ...propsInput
}: InputProps) {
  const { className: classNameContainer, ...props } = propsContainer || {
    className: "",
  };
  return (
    <div
      className={`${color} flex flex-row  rounded-3xl h-14 shrink-0 gap-4 px-6 items-center ${classNameContainer}`}
      {...props}
    >
      <div>{iconLeft}</div>
      <input
        className={`${color} flex flex-1 focus:outline-none border-none text-white text-18 ${className}`}
        placeholder={placeholder}
        {...propsInput}
      />
    </div>
  );
}

export default Input;
