import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const images = [
   "https://www.kubsu.ru/sites/default/files/news/img_23.jpg",
   "https://www.kubsu.ru/sites/default/files/news/photo_5352690133687720795_y.jpg",
   "https://www.kubsu.ru/sites/default/files/news/1_obnovlennyy_fasad_kubgu.jpg",
   "https://www.yuga.ru/media/2d/df/ubgu_ul_stavropolskaya_149_valerij_goda__pxsy4v5.jpg",
   "https://pervoe.fm/wp-content/uploads/2022/08/f36a8d3e5ba24c418466dffd080fb1eb.jpg",
   "https://kubnews.ru/upload/dev2fun.imagecompress/webp/iblock/671/59adxb24w2jq6yzio86laj7oyuginby1.webp",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", padding: "16px 0" }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;