import React from "react";
import { Box, HStack, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { Movie } from "../../types";
import clienteAxios from "../../services/axios";


const settings = {
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 10000,
  slidesToShow: 2,
};

export default function Carousel() {
  const { data: movies } = useQuery(["movies"], () =>
    clienteAxios.get<Movie[]>("/peliculas")
  );

  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
    <Box
      position={"static"}
      height={"100%"}
      width={"100%"}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />


      <Slider  {...settings} ref={(slider) => setSlider(slider)}>
        {movies &&
          movies.data.map((movies) => (
            <div key={movies.id} >              
              <Image src={movies.poster} width="100%" height="36rem" />             
             <ul>{movies.titulo}</ul>
            </div>
          ))}
      </Slider>

    </Box>
  );
}
