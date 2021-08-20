import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



function Input(props) {
    const { half, name, handleChange,label,autoFocus,type,handleShowPassWord } = props;
    return (
        <Grid item xs={12} sm={half?6:12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name==='password' ?{
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassWord}>
                                {type==='password'?<Visibility/>:<VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }:null}
            >
            </TextField>

        </Grid>
    );
}

export default Input;