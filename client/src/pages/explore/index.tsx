import Categories from "./categories";
import "./style.scss";

const Explore = () => {
  return (
    <main className="explore-wrapper">
      <section className="categories-wrapper">
        <Categories />
      </section>
      <div className="listing-wrapper"></div>
    </main>
  );
};

export default Explore;
