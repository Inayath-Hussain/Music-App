import { Navigate } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { authorize_api } from '../utilities/endpoints';
import './login.css';


const Login = () => {

    return (
        !localStorage.getItem('code') ?
            <div className='loginContainer'>
                <Card sx={{ padding: '30px', borderRadius: '5px', backgroundColor: '#FDF4E3' }}>
                    <CardContent>
                        <Typography variant='h4'>
                            Login To Your Spotify Account
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button variant='contained'
                            size='large'
                            sx={{ backgroundColor: '#1DB954', ":hover": { backgroundColor: '#1ED760' } }}
                            href={authorize_api}>LogIn</Button>
                    </CardActions>
                </Card>
            </div>
            :
            <Navigate to='/' />
    );
}

export default Login;