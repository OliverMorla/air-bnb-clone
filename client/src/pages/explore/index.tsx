import { useLoaderData } from "react-router-dom";
import "./style.scss";

const Explore = () => {
  const listings = useLoaderData()
  
  return (
    <main className="explore-wrapper">
      <h1> Explore page </h1>
    </main>
  );
};

export default Explore;
