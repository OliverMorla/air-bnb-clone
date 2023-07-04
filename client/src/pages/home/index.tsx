interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <main>
      <figure>
        <img
          src="/assets/photo-grid.png"
          alt="photo-grid.png"
          className="photo-grid"
        />
        <figcaption className="image-caption">Online Experiences</figcaption>
      </figure>
      <h2 className="description">
        Join unique interactive activities lead by one-of-a-kind hosts-all
        without leaving home.
      </h2>
    </main>
  );
};

export default Home;
