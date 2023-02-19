import { useState } from "react";
import { isBoolean } from "lodash";

const useToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (value) => {
    setValue((currentValue) => (isBoolean(value) ? value : !currentValue));
  };

  return [value, toggleValue];
};

export default useToggle;
