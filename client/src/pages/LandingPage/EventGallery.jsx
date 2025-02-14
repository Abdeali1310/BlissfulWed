import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { Box, Button, Typography, CircularProgress, Grid } from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const EventGallery = () => {
  const { event } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filters = ['couple', 'guests', 'family', 'moments','ceremony'];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const query = filter !== 'All' ? `?filter=${filter}` : '';
        const res = await axios.get(`/api/gallery/${event}${query}`);

        // Check if the response is an array, if not set it to an empty array
        if (Array.isArray(res.data)) {
          setImages(res.data);
        } else {
          setImages([]);
          console.error('API did not return an array:', res.data);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setImages([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [event, filter]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>{event} Gallery</Typography>
      
      <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
        {filters.map((item) => (
          <Grid item key={item}>
            <Button 
              variant={filter === item ? 'contained' : 'outlined'} 
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          </Grid>
        ))}
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {images.length > 0 ? (
            images.map((img, index) => (
              <Box 
                key={img._id} 
                sx={{ padding: '0.5rem', cursor: 'pointer' }}
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={img.url} 
                  alt={img.category} 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} 
                />
              </Box>
            ))
          ) : (
            <Typography variant="h6">No images found for this event.</Typography>
          )}
        </Masonry>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((img) => ({ src: img.url }))}
        index={currentIndex}
      />
    </Box>
  );
};

export default EventGallery;