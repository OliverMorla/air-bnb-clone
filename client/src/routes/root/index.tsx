import Header from "../../components/header";
import Footer from "../../components/footer";
import { Outlet } from "react-router-dom";

const Root: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
