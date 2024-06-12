// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import CongratulationsJohn from '@/views/dashboards/ecommerce/Congratulations'


const Dashboard = async () => {

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
                <CongratulationsJohn />
            </Grid>

        </Grid>
    )
}

export default Dashboard
