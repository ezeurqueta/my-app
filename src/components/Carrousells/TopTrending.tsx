import React, { useState } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const fetchMovieList = () => {
  return fetch(`https://localhost:7164/api/peliculas`).then((response) =>
    response.json()
  );
};

export default function Carousel() {
  const { isLoading, isError, data, error } = useQuery(
    ["movies"],
    fetchMovieList
  );

  const navigate = useNavigate();
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  //   const {mutateAsync: getMoviesAsync, isLoading} = useMutation(
  //     () =>
  //     clienteAxios.get<Movie>("/Peliculas"),
  //     {
  //       onSuccess:(res) => {
  //         getMoviesAsync({
  //           id:res.data.id,
  //           titulo: res.data.titulo,
  //           fechaEstreno: res.data.fechaEstreno,
  //           poster: res.data.poster
  //         })
  //         navigate("/")
  //       },
  //       onError:() => {
  //         console.log("Error");
  //       }
  //     }
  //   )

  return (
    <Box
      position={"relative"}
      height={"400px"}
      width={"50%"}
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
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {data.map((movies: { id: React.Key | null | undefined; titulo: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; poster: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
          <>
            <li key={movies.id}>{movies.titulo}</li>
            <li>{movies.poster}</li>
          </>
        ))}
      </Slider>
    </Box>
  );
}
