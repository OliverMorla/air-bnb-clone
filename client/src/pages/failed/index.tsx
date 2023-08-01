import "./style.scss";

const Failed: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="failed-wrapper">
      <h1> Sorry we were unable to process your reservation! </h1>
      <p> Please try again! </p>
    </main>
  );
};

export default Failed;
