import { useRoutes } from "react-router-dom";
import { routes } from "./routes/router";
import { UserContextProvider } from "./Context/UserContext";

const App = () => {
  const elements = useRoutes(routes);

  return <UserContextProvider>{elements}</UserContextProvider> 
};

export default App;