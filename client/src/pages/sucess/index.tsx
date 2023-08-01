import "./style.scss";

const Success: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="success-wrapper">
      <h1> Congratulations, You successfully booked your Airbnb!</h1>
      <p> Please check your email for confirmation! </p>
    </main>
  );
};

export default Success;
