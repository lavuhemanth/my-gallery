import React from "react";

const InputField = ({
  name,
  type,
  value,
  onChange,
  refs,
  error,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <input
        ref={refs}
        value={value}
        type={type}
        placeholder={placeholder}
        className="form-control"
        name={name}
        id={name}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger ">{error}</div>}
    </div>
  );
};

export default InputField;
