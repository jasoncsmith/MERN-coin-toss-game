import React from 'react';
import {
    TextField,
    Grid,
    InputAdornment,
    IconButton,
    TextFieldProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    half?: boolean;
    handleShowPassword?: (e: React.MouseEvent<HTMLElement>) => void;
    handleBlur?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    InputProps?: any;
}

const Input = ({
    name,
    value,
    label,
    autoFocus,
    type = 'text',
    error,
    half,
    handleChange,
    handleShowPassword,
    handleBlur,
}: TextFieldProps & InputProps) => (
    <Grid
        item
        xs={12}
        sm={half ? 6 : 12}
    >
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            value={value}
            error={error}
            onBlur={handleBlur}
            InputProps={
                name === 'password' || name === 'oldPassword'
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton onClick={handleShowPassword}>
                                      {type === 'password' ? (
                                          <Visibility />
                                      ) : (
                                          <VisibilityOff />
                                      )}
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }
                    : {}
            }
        />
    </Grid>
);

export default Input;
