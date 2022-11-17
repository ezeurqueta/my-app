import { ReactNode } from "react";
import {
  Box,
  Flex,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { AiFillHome } from "react-icons/ai";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: AiFillHome },
  { name: "Logout", icon: BiLogOut },
  

];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="175vh" bg={("gray.100")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      
      {/* mobilenav */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <Box
      bg={("gray.700")}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Movies App
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem onClick={handleLogout} key={link.name} icon={link.icon}>
          {link.name}          
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: "red",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
