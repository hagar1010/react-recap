import { Route, Routes } from "react-router-dom";
import Paths from "./routes";
import Header from "./components/Header";

const DymaicRoute = ({ children, ...route }) => (
  <Route {...route}>
    {children?.length > 0 ? <>{children?.map(DymaicRoute)}</> : null}
  </Route>
);

function App() {
  return (
    <>
      <Header />
      <Routes>{Paths.map(DymaicRoute)}</Routes>;
    </>
  );
}

export default App;
