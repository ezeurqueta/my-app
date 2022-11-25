import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
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
const continueWatching = {
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 10000,
  slidesToShow: 3,
};
const topRated = {
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 10000,
  slidesToShow: 4,
};

export default function Carousel() {
  const { data: movies } = useQuery(["movies"], () =>
  clienteAxios.get<Movie[]>("/peliculas")
  );

  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
    <Box position={"static"} height={"100%"} width={"100%"} overflow={"hidden"}>
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
      <Text fontWeight={"bold"} fontSize="2xl" color={"White"}>
        Trending Movies
      </Text>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {movies &&
          movies.data.map((movies) => (
            <Box key={movies.id}>
              <Image
                borderRadius={"10%"}
                src={movies.poster}
                width="80%"
                height="25rem"
              />
              <ul>{movies.titulo}</ul>
            </Box>
          ))}
      </Slider>
      <Text fontWeight={"bold"} fontSize="2xl" color={"White"}>
        Continue Watching
      </Text>
      <Slider {...continueWatching} ref={(slider) => setSlider(slider)}>
        {movies &&
          movies.data.map((movies) => (
            <Box bg={movies.poster} key={movies.id}>
              <Image
                borderRadius={"10%"}
                src={movies.poster}
                width="80%"
                height="25rem"
              />
              <Box>
                <ul>{movies.titulo}</ul>
              </Box>
            </Box>
          ))}
      </Slider>
      <Text fontWeight={"bold"} fontSize="2xl" color={"White"}>
        Top Rated
      </Text>
      <Slider {...topRated} ref={(slider) => setSlider(slider)}>
        {movies &&
          movies.data.map((movies) => (
            <Box bg={movies.poster} key={movies.id}>
              <Image
                borderRadius={"10%"}
                src={movies.poster}
                width="80%"
                height="25rem"
              />
              <Box>
                <ul>{movies.titulo}</ul>
              </Box>
            </Box>
          ))}
      </Slider>
    </Box>
  );
}
