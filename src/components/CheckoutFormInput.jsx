export const CheckoutFormInput = ({ label, className, hasError, errorMessage, ...props }) => {
  return (
    <div className={`flex flex-col my-2 ${className}`}>
      <label className="font-bold">{label}</label>
      <input {...props} />
      <div>
        {hasError && <p className="text-xs text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
};
