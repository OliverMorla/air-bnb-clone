import { useLoaderData } from "react-router-dom";
import Categories from "./categories";
import "./style.scss";

const Explore = () => {
  const listings = useLoaderData()
  return (
    <main className="explore-wrapper">
      <section>
        <Categories />
      </section>
      <h1> Explore page </h1>
    </main>
  );
};

export default Explore;
