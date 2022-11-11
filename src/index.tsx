import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import { AuthProvider } from "react-auth-kit"
import * as ReactDOM from "react-dom/client"
import Login from "./components/login/Login"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider>
    <AuthProvider authType = {'localstorage'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
    </AuthProvider>
    <Login />
    </ChakraProvider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

