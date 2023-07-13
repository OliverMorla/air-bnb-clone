import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./style.scss";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

const Register = () => {
  return (
    <div className="register-dialog">
      <header className="register-header">
        <FontAwesomeIcon icon={faX} className="x-mark" />
        <p> Log in or Sign Up</p>
      </header>
      <form action="">
        <input type="username" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <label htmlFor="">
          Date of Birth:
          <input type="date" name="" id="" />
        </label>
        <p>
          We’ll call or text you to confirm your number. Standard message and
          data rates apply. Privacy Policy
        </p>
        <button type="submit">Sign Up</button>
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
        <p className="login-link">Already have an account? Log in</p>
      </Link>
    </div>
  );
};

export default Register;
