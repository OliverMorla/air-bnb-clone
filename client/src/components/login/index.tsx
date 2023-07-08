import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./style.scss";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  return (
    <div className="login-dialog">
      <header className="login-header">
        <FontAwesomeIcon icon={faX} className="x-mark" />
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
      <Link to={"/register"}>
        <p className="register-link">Don't have an account? Sign Up</p>
      </Link>
    </div>
  );
};

export default Login;
