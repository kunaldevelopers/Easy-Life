import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon: Icon,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-300
            ${Icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
            ${
              focused
                ? "ring-2 ring-primary-500 border-transparent shadow-lg"
                : "border-gray-200"
            }
            ${error ? "border-red-500 ring-2 ring-red-200" : ""}
            focus:outline-none hover:border-gray-300 hover:shadow-md
            placeholder:text-gray-400
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
