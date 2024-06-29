// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import CongratulationsJohn from '@/views/dashboards/ecommerce/Congratulations'
import ResolvedIssues from '@/views/dashboards/ecommerce/ResolvedIssues'
import DonutChartGeneratedLeads from '@/views/dashboards/ecommerce/DonutChartGeneratedLeads'
import WebsiteAnalyticsSlider from '@/views/dashboards/analytics/WebsiteAnalyticsSlider'
import LineAreaDailySalesChart from '@/views/dashboards/analytics/LineAreaDailySalesChart'
// import BarChartRevenueGrowth '@/views/dashboards/crm/BarChartRevenueGrowth'
import ApexAreaChart from '@/views/charts/apex/ApexAreaChart'

const Dashboard = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
                <CongratulationsJohn />
            </Grid>
            <Grid item xs={12} md={4}>
                <DonutChartGeneratedLeads serverMode='light' />
            </Grid>
            {/* <Grid item xs={12} md={4}>
        <BarChartRevenueGrowth serverMode='light' /> {/* Adjust the serverMode prop as needed */}
            {/* </Grid> */}

            <Grid item xs={12} md={4}>
                <ResolvedIssues />
            </Grid>
            <Grid item xs={12} md={8}>
                {' '}
                {/* Add the new card to the layout */}
                <WebsiteAnalyticsSlider />
            </Grid>
            <Grid item xs={12} md={4}>
                <LineAreaDailySalesChart />
            </Grid>
            <Grid item xs={12} md={12}>
                <ApexAreaChart />
            </Grid>

            {/* Empty grid item to take up remaining space */}
        </Grid>
    )
}

export default Dashboard
