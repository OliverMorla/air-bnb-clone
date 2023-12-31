import "./style.scss";

const Loading: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="loading-wrapper">
      <img src="/loading.gif" alt="loading-gif" />
    </div>
  );
};

export default Loading;
