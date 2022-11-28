import { Box, Card, CardActions, CardContent, Skeleton } from "@mui/material";

export default function LandingPageCardSkeleton() {
    return <Card className="landing-card" sx={{ minWidth: 250, maxHeight:256, borderRadius: 10, backgroundColor: '#F7FAFC', boxShadow: '0', margin: '5px' }}>
    <Skeleton sx={{height: 126,width: 220, margin: '0 auto'}}/>
    <Box className='card-content' sx={{backgroundColor: 'white'}}>
    <CardContent sx={{textAlign: 'left', padding: '5px 16px'}}>
      <Skeleton variant='text'/>
      <Skeleton variant='text'/>
    </CardContent>
    <CardActions sx={{justifyContent: 'flex-end', paddingRight: 3}}>
        <Skeleton variant='rectangular' sx={{borderRadius: 50, width: 84, height: 28, float: 'right'}}/>
    </CardActions>
    </Box>
  </Card>
}