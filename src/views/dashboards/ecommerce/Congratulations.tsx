// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const CongratulationsJohn = () => {
  return (
    <Card>
      <Grid container>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant='h5' className='mbe-0.5'>
              Total Calls Handled
            </Typography>
            <Typography variant='subtitle1' className='mbe-2'>
              ALL Calls managed in the last 30 days
            </Typography>
            <Typography variant='h4' color='primary.main' className='mbe-1'>
              3,245
            </Typography>
            <Button variant='contained' color='primary'>
              +5% from last month
            </Button>
          </CardContent>
        </Grid>
        {/* <Grid item xs={4}>
          <div className='relative bs-full is-full'>
            <img
              alt='Congratulations John'
              src='/images/illustrations/characters/6.png'
              className='max-bs-[150px] absolute block-end-0 inline-end-6 max-is-full'
            />
          </div>
        </Grid> */}
      </Grid>
    </Card>
  )
}

export default CongratulationsJohn
