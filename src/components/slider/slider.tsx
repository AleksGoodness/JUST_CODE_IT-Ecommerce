import 'swiper/swiper-bundle.css';
import './slider.css';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SliderProps {
  images: string[];
}

export const Slider = ({ images }: SliderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={3}
        spaceBetween={10}
        style={{ maxWidth: '700px', width: '100%' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              alt={`Slide ${(index + 1).toString()}`}
              onClick={() => {
                handleOpenModal(image);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') handleOpenModal(image);
              }}
              role="presentation"
              src={image}
              style={{
                width: '100%',
                maxWidth: '250px',
                height: 'auto',
                borderRadius: '15px',
                cursor: 'pointer',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal
        aria-describedby="parent-modal-description"
        aria-labelledby="parent-modal-title"
        onClose={handleCloseModal}
        open={isOpen}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            alt="Modal"
            src={selectedImage}
            style={{ maxWidth: '60%', maxHeight: '60vh', borderRadius: '10px' }}
          />
          <CloseIcon
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              cursor: 'pointer',
              color: 'white',
              fontSize: 30,
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
