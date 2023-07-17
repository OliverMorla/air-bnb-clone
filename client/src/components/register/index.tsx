import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

interface Props {
  setOpenRegister: React.Dispatch<boolean>;
  setOpenLogin: React.Dispatch<boolean>;
}

const Register: React.FunctionComponent<Props> = ({
  setOpenRegister,
  setOpenLogin,
}) => {
  const fadeEffects = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="register-dialog"
      variants={fadeEffects}
      initial="hidden"
      animate="visible"
    >
      <header className="register-header">
        <FontAwesomeIcon
          icon={faX}
          className="x-mark"
          onClick={() => setOpenRegister(false)}
        />
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
      <p
        className="login-link"
        onClick={() => {
          setOpenLogin(true);
          setOpenRegister(false);
        }}
      >
        Already have an account? Log in
      </p>
    </motion.div>
  );
};

export default Register;
