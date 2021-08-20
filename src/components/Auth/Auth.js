import React,{useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles'
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signIn,signUp} from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


function Auth(props) {
    const classes = useStyles();
    const [showPassword,setShowPassword] =useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const [formData,setFormData]=useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleShowPassWord(){
        setShowPassword(!showPassword);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(isSignup){
            dispatch(signUp(formData,history));
        } else{
            dispatch(signIn(formData,history));
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value, 
        })
    }

    function switchModel(){
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    function googleSuccess (res){
        const result=res?.profileObj;
        const token=res?.tokenId;

        try{
            dispatch({
                type:'AUTH',
                data: {result,token},
            })
            history.push('/');
        }catch(err){
            console.log(err)
        }
        console.log(res);

    }

    function googleFailure(){
        console.log("Google Sign In was unsuccessful. Let try again")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First name" handleChange={handleChange} autofocus half></Input>
                                    <Input name="lastName" label="Last name" handleChange={handleChange} half></Input>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassWord={handleShowPassWord}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup?'Sign Up':'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="277899755985-qi6uhm9dfqkq78kbmitap72gk0d907lu.apps.googleusercontent.com"
                        render ={(renderProps)=>(
                            <Button className={classes.googleButton} color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" fullWidth>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    >

                    </GoogleLogin>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchModel}>
                                {isSignup?'Already have an account? Sign In':"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
            );
}

            export default Auth;