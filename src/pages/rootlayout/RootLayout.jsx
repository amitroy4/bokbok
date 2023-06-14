import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import './rootlayout.css'
import { getAuth } from "firebase/auth";

const RootLayout = () => {

    const auth = getAuth();
    const cUser = auth.currentUser;
    return (

        <Grid container spacing={2}>
            <Grid className='list' item xs={1}>
                <div className='listalign'>
                    <img className='imgsz' src={cUser.photoURL} />
                    <h4>{cUser.displayName}</h4>
                    <ul>
                        <li><Link to="/bokbok/home" className='lc'>Home</Link></li>
                        <li><Link to="/bokbok/message" className='lc'>Message</Link></li>
                    </ul>
                </div>
            </Grid>
            <Grid item xs={11}>
                <Outlet />
            </Grid>
        </Grid>

    )
}

export default RootLayout