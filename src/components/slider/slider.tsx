import './slider.css';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SliderProps {
  images: string[];
}

const Slider = ({ images }: SliderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenModal = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
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
          <SwiperSlide key={index} style={{ height: '230px' }}>
            <img
              alt={`Slide ${(index + 1).toString()}`}
              onClick={() => {
                handleOpenModal(index);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') handleOpenModal(index);
              }}
              role="presentation"
              src={image}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                aspectRatio: '3 / 4',
                borderRadius: '15px',
                cursor: 'pointer',
                display: 'block',
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
          <Swiper
            className="modal-swiper"
            initialSlide={activeIndex}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  alt={`Slide ${(index + 1).toString()}`}
                  src={image}
                  style={{
                    width: '90%',
                    maxWidth: '500px',
                    height: 'auto',
                    aspectRatio: '3 / 4',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    display: 'block',
                    margin: '0 auto',
                    marginBottom: '30px',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Modal>
    </>
  );
};

export default Slider;
