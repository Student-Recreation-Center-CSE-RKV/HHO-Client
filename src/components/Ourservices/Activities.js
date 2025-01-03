import React, { useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, responsiveFontSizes} from '@mui/material';
import { useEffect,useState,useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import { Navigation, Autoplay,EffectFade } from 'swiper/modules'; // Import Swiper modules

import 'swiper/css'; // Core Swiper styles
import 'swiper/css/pagination'; // Pagination styles
import 'swiper/css/navigation'; // Navigation styles

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { AppContext } from '../../context/Context';



const Activities = () => {
  const [activities,setActivities] = useState([])
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const {apiUrl} = useContext(AppContext);
    useEffect(()=>{
      setTimeout(() => {
        if (prevRef.current && nextRef.current) {
          prevRef.current.style.display = 'block';
          nextRef.current.style.display = 'block';
        }
      }, 100);
    },[])


    useEffect(() => {
        const fetchActivities = async() => {
            try {
                const res = await axios.get(`${apiUrl}/api/activities/getAll`);
                setActivities(res.data.data);
            } catch (error) {
                console.log("Error fetching activities:", error);
            }
        }
        fetchActivities();
    },[])

  return (
    <Box sx={{ padding: { xs: '20px', md: '50px' }, textAlign: 'center', position: 'relative' }}>
      {/* Heading */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#fa9a34",
          fontFamily: '"Anton", sans-serif',
          fontWeight: 300,
          fontSize: { xs: '32px', md: '50px' },
          textShadow: '0px 4px 10px rgba(0,0,0,0.2)',
          letterSpacing: '3px',
          fontStyle: 'normal',
          marginBottom: '30px',
        }}
      >
        Activities and Initiatives
      </Typography>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
        }}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // Re-assign refs when Swiper initializes
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {activities?.map((activity, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                backgroundColor: '#f5f5f5',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                '&:hover': { boxShadow: '0px 6px 16px orange' },
                borderRadius: '10px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={activity.image}
                alt={activity.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  {activity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activity.description}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <IconButton
        ref={prevRef}
        sx={{
          position: 'absolute',
          top: '15%',
          right: '70px',
          zIndex: 10,
          backgroundColor: "lightgray",
          borderRadius:"10%",
          padding:"4px 6px",
          "&:hover":{
            backgroundColor:"#fa9a34",
            border:"none"
          }
        }}
      >
        <ArrowLeftIcon />
      </IconButton>

      <IconButton
        ref={nextRef}
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10px',
          zIndex: 10,
          backgroundColor: "lightgray",
          borderRadius:"10%",
          padding:"4px 6px",
          "&:hover":{
            backgroundColor:"#fa9a34",
            border:"none"
          }
        }}
      >
        <ArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default Activities;