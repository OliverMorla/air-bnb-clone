import Header from "../../components/header";
import Footer from "../../components/footer";
import { Outlet } from "react-router-dom";

export const Loader = async () => {
  const res = await fetch(
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.country=United%20States&refine.city=New%20York"
  );

  return res.json();
};

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
