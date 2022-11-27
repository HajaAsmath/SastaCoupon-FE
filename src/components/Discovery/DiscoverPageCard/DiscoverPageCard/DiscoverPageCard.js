import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './DiscoverPageCard.css'
import { Link } from 'react-router-dom';

export default function DiscoverPageCard(props) {

    const {couponId, couponName, couponImage, couponPrice} = props;

    return     <Card className="landing-card" sx={{ minWidth: 250, maxHeight:256, borderRadius: 10, backgroundColor: '#F7FAFC', boxShadow: '0', margin: '5px' }}>
    <CardMedia sx={{height: 126,width: 'inherit', margin: '0 auto'}}
      component="img"
      image={couponImage}
      alt="green iguana"
    />
    <Box className='card-content'>
    <CardContent sx={{textAlign: 'left', padding: '5px 16px'}}>
      <span>
        {couponName}
      </span>
      <p>
          {couponPrice} Credits
      </p>
    </CardContent>
    </Box>
  </Card>
}

