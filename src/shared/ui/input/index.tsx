import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type MUIInputProps<Variant extends TextFieldVariants> = {
  variant?: Variant;
} & Omit<TextFieldProps, 'variant'>;

interface InputProps<T extends FieldValues, Variant extends TextFieldVariants>
  extends Omit<MUIInputProps<Variant>, 'onChange'> {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

const Input = <T extends FieldValues, Variant extends TextFieldVariants>({
  name,
  label,
  control,
  ...otherProps
}: InputProps<T, Variant>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...otherProps}
          helperText={error ? error?.message || '' : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default Input;
