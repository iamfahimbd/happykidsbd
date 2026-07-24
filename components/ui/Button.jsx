export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "bg-primary hover:bg-secondary text-white",

    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  return (
    <button
      className={`
        rounded-full
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        shadow-soft
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}