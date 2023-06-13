import React from 'react'
import Grid from '@mui/material/Grid';
import Userlist from '../../components/Userlist';

const Home = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Userlist />
            </Grid>
            <Grid item xs={4}>
                <h1>dgdsv</h1>
            </Grid>
            <Grid item xs={4}>
                <h1>fsfsf</h1>
            </Grid>
        </Grid>

    )
}

export default Home