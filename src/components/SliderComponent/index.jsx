import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = (series) => {
  const {items} = series.items
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {items ? (
        items.map(item=>(
          <div className='d-flex justify-content-center'>
            <img src="https://via.placeholder.com/300x200" alt="sa" />
          </div>
        ))
      ):('teste')}
    </Slider>
  );
};

export default SliderComponent;