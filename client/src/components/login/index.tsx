import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

interface Props {
  setOpenLogin: React.Dispatch<boolean>;
  setOpenRegister: React.Dispatch<boolean>;
}

const Login: React.FunctionComponent<Props> = ({
  setOpenLogin,
  setOpenRegister,
}) => {
  return (
    <div className="login-dialog">
      <header className="login-header">
        <FontAwesomeIcon
          icon={faX}
          className="x-mark"
          onClick={() => setOpenLogin(false)}
        />
        <p> Log in or Sign Up</p>
      </header>
      <h2> Welcome to Airbnb</h2>
      <form action="">
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <p>
          We’ll call or text you to confirm your number. Standard message and
          data rates apply. Privacy Policy
        </p>
        <button type="submit">Sign In</button>
      </form>
      <div>or</div>
      <button>
        <FontAwesomeIcon icon={faFacebook} /> Continue with Google
      </button>
      <button>
        <FontAwesomeIcon icon={faGoogle} /> Continue with Facebook
      </button>
      <button>
        <FontAwesomeIcon icon={faApple} /> Continue with Apple
      </button>
      <p
        className="register-link"
        onClick={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      >
        Don't have an account? Sign Up
      </p>
    </div>
  );
};

export default Login;
