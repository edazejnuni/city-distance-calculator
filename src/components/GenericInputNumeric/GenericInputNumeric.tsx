import React from "react";
import "./GenericInputNumeric.scss";
import plus from "../../assets/images/plus.png";
import minus from "../../assets/images/minus.png";
import { InputFieldsLabel } from "../../assets/styled-components/main";

interface GenericInputNumericProps {
  value: number;
  onValueChange: (newValue: number) => void;
  onBlur?: any;
  className?: string;
}

const GenericInputNumeric: React.FC<GenericInputNumericProps> = ({
  value,
  onValueChange,
  onBlur,
  className,
}) => {
  const handleDecrease = () => {
    if (value > 0) {
      onValueChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onValueChange(value + 1);
  };

  return (
    <div className="numeric">
      <InputFieldsLabel>Passengers</InputFieldsLabel>
      <div className={className}>
        <button type="button" onClick={handleDecrease}>
          <img src={minus} alt="" className="minus" />
        </button>
        <input
          type="text"
          value={value}
          onBlur={onBlur}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue)) {
              onValueChange(newValue);
            }
          }}
        />
        <button type="button" onClick={handleIncrease}>
          <img src={plus} alt="" />
        </button>
      </div>
    </div>
  );
};

export default GenericInputNumeric;
