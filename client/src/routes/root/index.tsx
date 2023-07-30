import Header from "@/components/header";
import Footer from "@/components/footer";
import Loading from "@/routes/loading";
import { IRecord, LoaderResponse } from "@/types/types";
import { GET_c } from "@/config/fetch.config";
import {
  Navigation,
  Outlet,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export const getListing = async (): Promise<IRecord[]> => {
  try {
    const res = await fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=5&start=2&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.city=London&refine.property_type=Condominium"
    );
    const { records } = (await res.json()) as LoaderResponse;
    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRoom = async (): Promise<IRecord[]> => {
  try {
    const res = await fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&rows=5&start=2&facet=host_response_time&facet=host_response_rate&facet=host_verifications&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&facet=availability_365&facet=cancellation_policy&facet=features&refine.city=London&refine.property_type=Condominium"
    );
    const { records } = (await res.json()) as LoaderResponse;
    return records;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Root: React.FunctionComponent = () => {
  const { setUserInfo } = useAuth();
  const navigation: Navigation = useNavigation();
  const location = useLocation();

  async function getUserInfo() {
    try {
      const res = await fetch(import.meta.env.VITE_AUTHENTICATION_URL, GET_c);
      const response = await res.json();
      if(response.authenticated){
        setUserInfo(response);
      } else {
        throw new Error("You are not logged in!")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    getUserInfo();
    return undefined;
  }, [location.pathname]);

  return (
    <>
      {navigation.state === "loading" ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default Root;
