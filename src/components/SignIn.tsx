import React from "react"
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import {
    Checkbox,
    Grid,
    TextField,
    FormControlLabel,
    Paper,
    Button
} from '@mui/material';
import {SERVER_URL, SUCCESS} from "../constants/const";
import {features} from "../constants/features";
import Notify from "../utils/notifications";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

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

    const onSubmit = (e:any) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        //TODO: Move to API!
        axios.post(`${SERVER_URL}/login`, formData)
            .then((res)=>{
                if(res.data.code === SUCCESS){
                    if(signIn(
                        {
                            token: res.data.result.token,
                            expiresIn:res.data.result.expiresIn,
                            tokenType: "Bearer",
                            authState: res.data.result.authUserState,
                            //refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                            //refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                        }
                    )){
                        Notify(toast.TYPE.SUCCESS, res.data.message);
                        navigate("/");
                    }else {
                        Notify(toast.TYPE.ERROR, res.data.message);
                    }
                } else {
                    Notify(toast.TYPE.ERROR, res.data.message);
                }
            })
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