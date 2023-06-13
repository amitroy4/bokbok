import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';

const RootLayout = () => {
    return (

        <Grid container spacing={2}>
            <Grid item xs={1}>
                <div>
                    <ul>
                        <li><Link to="/bokbok/home">Home</Link></li>
                        <li><Link to="/bokbok/message">Message</Link></li>
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