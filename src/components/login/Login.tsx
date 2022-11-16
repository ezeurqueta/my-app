import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  Image,
  Checkbox,
  Text,
  HStack,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import image from "../../images/fotoproyecto.png";
import { useMutation } from "react-query";
import clienteAxios from "../../services/axios";
import { Token } from "../../types";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import moment from "moment";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
 
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  // min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(passwordRules, { message: "Please create a stronger password" }),
  });

  const localSignIn =useSignIn()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit:async () => {
      await signInAsync();
    },
  })
  
  
  const {mutateAsync: signInAsync, isLoading} = useMutation(
    () => 
    clienteAxios.post<Token>("/Cuentas/Login", formik.values),
    {
      onSuccess:(res) => {
        localSignIn({
          token:res.data.token,
          authState:{isAdmin:res.data.isAdmin},
          tokenType:"Bearer",
          expiresIn:moment().diff(moment(res.data.expiresIn), "hours")
        })
        navigate("/")
      },
      onError:() => {
        console.log("Error");
        
      }
    }
  )

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        spacing={5}
        direction="row"
        backgroundColor="whiteAlpha.900"
        border-radius="30%"
      >
        <Box boxSize="500px" alignItems="center" justifyContent="center">
          <Heading>Welcome Back</Heading>
          <Text fontSize="sm">Welcome back! Please enter your details.</Text>
          {/* <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              // Alert the input values of the form that we filled
              alert(JSON.stringify(values));
            }}
          > */}
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <Text as="b" fontSize="sm">
                Email
              </Text>
              <InputGroup>
                <Input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                />
                  {formik.errors.email && formik.touched.email && (
                    <Text>{formik.errors.email}</Text>
                  )}

                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text as="b" fontSize="sm">
                Password
              </Text>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                  {formik.errors.password && formik.touched.password && (
                    <Text>{formik.errors.password}</Text>
                  )}
              </InputGroup>
              <HStack>
                <Checkbox>Remember for 30 days</Checkbox>
                <Spacer />
                <Link>Forgot Password</Link>
              </HStack>
              <FormHelperText textAlign="right"></FormHelperText>
            </FormControl>
            <Center>
              <Button
                borderRadius="15%"
                type="submit"
                variant="solid"
                colorScheme="purple"
                textAlign="center"
                width="50%"
                disabled={formik.isSubmitting}
              >
                Sign in
              </Button>
            </Center>
            <Stack>
              <Center>
                <Text fontSize="m">Dont have an account? </Text>
                <Link color="purple"> Sign Up</Link>
              </Center>
            </Stack>
          </form>
          {/* </Formik> */}
        </Box>
        <Image src={image} />
      </Stack>
    </Flex>
  );
};

export default Login;
