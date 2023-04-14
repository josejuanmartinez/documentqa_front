import React from "react"
import { useSignIn } from 'react-auth-kit'
import {
    Checkbox,
    Grid,
    TextField,
    FormControlLabel,
    Paper,
    Button
} from '@mui/material';
import {SUCCESS} from "../constants/const";
import Notify from "../utils/notifications";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Login} from "../api/api";

export const SignInComponent = () => {
    const signIn = useSignIn()
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [checked, setChecked] = React.useState(true);

    const navigate = useNavigate();
    const handleChangeKeep = (event:any) => {
        setChecked(event.target.checked);
    };
    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event:any) => {
        setPassword(event.target.value);
    };

    async function onSubmit (e:any): Promise<void> {
        e.preventDefault()
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        await Login(formData).then(data => {
            if (data.code === SUCCESS) {
                if (signIn(
                    {
                        token: data.result.token,
                        expiresIn: data.result.expiresIn,
                        tokenType: "Bearer",
                        authState: data.result.authUserState,
                        //refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                        //refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                    }
                )) {
                    Notify(toast.TYPE.SUCCESS, data.message);
                    navigate("/");
                } else {
                    Notify(toast.TYPE.ERROR, data.message);
                }
            } else {
                Notify(toast.TYPE.ERROR, data.message);
            }
            }
        );
    }

    return (
        <div style={{ padding: 30 }}>
            <Paper>
                <Grid container={true} spacing={3} direction={'column'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'}>
                    <Grid item xs={12}>
                        <TextField label="E-mail"
                                   value={email}
                                   onChange={handleEmailChange}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type={'password'} value={password}
                                   onChange={handlePasswordChange}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChangeKeep}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label="Keep me logged in"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={onSubmit}> Login </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};