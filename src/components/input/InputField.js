import React from "react";
import { useSelector } from "react-redux";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Select,
  TextField,
  TextareaAutosize,
  InputLabel,
  Checkbox,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
  FormHelperText,
  FormLabel,
} from "@mui/material";

import { selectTranslations } from "../App/appSlice";

import { formTypes } from "../../js/constants";
import { renderOptions } from "../../js/utils";

const {
  select,
  checkbox,
  multicheckBox,
  switchField,
  textArea,
  date,
  icon,
  image,
  radio,
} = formTypes;
const Input = ({
  type,
  classes = "",
  name = "",
  value = "",
  label = "",
  placeholder = "",
  handleChange = null,
  options = [],
  required = false,
  disabled = false,
  hasNone = false,
  rowsMin = 3,
  variant = "outlined",
  defaultValue = "",
  error = "",
  children,
}) => {
  if (!handleChange) handleChange = () => console.log("missing handler");

  const t = useSelector(selectTranslations);

  switch (type) {
    case select:
      return (
        <div className={classes}>
          <FormControl
            className="w-full"
            error={!!error}
            variant={variant}
            required={required}
            disabled={disabled}
          >
            <InputLabel id="select-label">{label}</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={value}
              name={name}
              onChange={handleChange}
              label={label}
            >
              {hasNone && <MenuItem value="">{t("form.none")}</MenuItem>}
              {options.map(renderOptions)}
            </Select>
            {error && <FormHelperText>{t(error)}</FormHelperText>}
          </FormControl>
        </div>
      );

    case date:
      return (
        <div className={classes}>
          <TextField
            label={label}
            className={`w-full ${classes}`}
            type="date"
            name={name}
            value={value}
            variant={variant}
            onChange={handleChange}
            disabled={disabled}
            InputLabelProps={{
              shrink: true,
            }}
            noValidate
          />
        </div>
      );

    case checkbox:
      return (
        <div className={classes}>
          <label
            className="block text-sm font-bold mb-2"
            onChange={handleChange}
          >
            <Checkbox checked={value} value={value} name={name} />
            {`${label}`}
          </label>
        </div>
      );

    case multicheckBox:
      return (
        <div className={classes}>
          <label
            className="block text-sm font-bold mb-2"
            onChange={handleChange}
          >
            <FormGroup>
              {options.map((o, i) => (
                <FormControlLabel
                  control={<Checkbox value={value} name={name} />}
                  label="Gilad Gray"
                />
              ))}
            </FormGroup>
            <Checkbox value={value} name={name} />
            {`${label}`}
          </label>
        </div>
      );

    case switchField:
      return (
        <div
          className={`${classes} relative w-full border-2 border-gray-lighter rounded`}
        >
          <FormControl
            variant={variant}
            className="w-full h-full"
            disabled={disabled}
          >
            <label className="absolute left-2 -top-1/4 block text-sm bg-white px-2">
              {label} {required && "*"}
            </label>
            <Switch
              checked={value}
              name={name}
              onChange={handleChange}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </FormControl>
        </div>
      );

    case textArea:
      return (
        <TextareaAutosize
          className={`bg-white ${classes}`}
          rowsMin={rowsMin}
          onChange={handleChange}
          name={name}
          label={label}
          placeholder={placeholder}
          value={value}
          variant={variant}
          disabled={disabled}
          required={required}
        />
      );

    case icon:
      return (
        <div
          className={`${classes} relative w-full border-2 border-gray-lighter rounded`}
        >
          <FormControl
            variant={variant}
            className="w-full h-full"
            disabled={disabled}
          >
            <label className="absolute left-2 -top-1/4 block text-sm bg-white px-2">
              {label} {required && "*"}
            </label>
            <div className="center-content h-full">{children}</div>
          </FormControl>
        </div>
      );

    case image:
      return (
        <div
          className={`${classes} relative w-full border-2 border-gray-lighter rounded`}
        >
          <FormControl
            variant={variant}
            className="w-full h-full"
            disabled={disabled}
          >
            <label className="absolute left-2 -top-1/4 block text-sm bg-white px-2">
              {label} {required && "*"}
            </label>
            <div className="center-content h-full">{children}</div>
          </FormControl>
        </div>
      );

    case radio:
      return (
        <div className={classes}>
          <FormControl>
            <FormLabel id="radio-label">{label}</FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-label"
              defaultValue={defaultValue || options[0].value}
              name="radio-buttons-group"
            >
              {options.map((o, i) => (
                <FormControlLabel
                  key={i}
                  value={o.value}
                  control={<Radio />}
                  label={o.label}
                  onChange={handleChange}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      );

    default:
      return (
        <div className={classes}>
          <TextField
            error={!!error}
            helperText={t(error)}
            name={name}
            className={`w-full ${classes}`}
            type={type}
            required={required}
            disabled={disabled}
            label={label}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            variant={variant}
          />
        </div>
      );
  }
};

export default Input;
