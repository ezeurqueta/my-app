import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import TopTrending from "../Carrousells/TopTrending";
import SideBar from "../sideBar/Sidebar";
const Movies = () => {
  return (
    <>
      <HStack bg={"black"}>
        <SideBar children={undefined} />
        <TopTrending />
      </HStack>
      
    </>
  );
};

export default Movies;

