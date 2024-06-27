interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
}

function Button({
  label,
  onClick,
  disabled = false,
  color = "bg-indigo-500",
  textColor = "text-slate-50",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${color} ${textColor} rounded-lg px-7 py-2 hover:opacity-80`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
