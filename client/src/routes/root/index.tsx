import Header from "../../components/header";
import Footer from "../../components/footer";
import Loading from "../loading";
import { Navigation, Outlet, useNavigation } from "react-router-dom";

export const getListing = async (): Promise<Array<object>> => {
  const res = await fetch(
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=5&start=2&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.city=London&refine.property_type=Condominium"
  );
  const { records } = await res.json();
  return records;
};

export const getRoom = async (): Promise<Array<object>> => {
  const res = await fetch(
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=5&start=2&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.city=London&refine.property_type=Condominium"
  );
  const { records } = await res.json();
  return records;
};

const Root: React.FunctionComponent = () => {
  const navigation: Navigation = useNavigation();
  return (
    <>
      {navigation.state === "loading" && <Loading />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
