interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="rounded-lg px-7 py-2 bg-indigo-500 text-slate-50 hover:opacity-80"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
