import React,{useState,useEffect} from 'react';
import { AppBar, Typography ,Toolbar,Button,Avatar} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import {Link,useHistory,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

function Navbar(props) {
    const classes = useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch= useDispatch();
    const history=useHistory();
    const location = useLocation();

    useEffect(()=>{
        const token=user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location,user?.token])

    function handleLogout() {
        dispatch({
            type:'LOGOUT',
        })
        history.push('/');
        setUser(null);
    }

    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
                    <img className={classes.image} src={memories} alt="memories" ></img>
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ?(
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant='h6'>
                                {user.result.name}
                            </Typography>
                            <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                        </div>
                    ):(
                        <Button component={Link} to='/auth' variant="contained" color="primary">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;