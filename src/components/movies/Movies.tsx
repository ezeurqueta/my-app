import { HStack } from "@chakra-ui/react";
import TopTrending from "../carousel/TopTrending";
import SideBar from "../sideBar/Sidebar";
const Movies = () => {
  return (
    <HStack bg={"black"}>
      <SideBar children={undefined} />
      <TopTrending />
    </HStack>
  );
};

export default Movies;
