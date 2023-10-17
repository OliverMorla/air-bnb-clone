import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fadeEffects2 } from "@/animations";
import { LoginInputTypes, User } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
import "./style.scss";
import {
  faFacebook,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

interface Props {
  setOpenLogin: React.Dispatch<boolean>;
  setOpenRegister: React.Dispatch<boolean>;
}

const Login: React.FunctionComponent<Props> = ({
  setOpenLogin,
  setOpenRegister,
}) => {
  const { login } = useAuth();
  const [inputs, setInputs] = useState<LoginInputTypes>({
    email: "",
    password: "",
  });

  const handleOAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === "google") {
      window.open(import.meta.env.VITE_GOOGLE_AUTH_URL, "_self");
    } else if (e.currentTarget.value === "facebook") {
      window.open(import.meta.env.VITE_FACEBOOK_AUTH_URL, "_self");
    } else if (e.currentTarget.value === "github") {
      window.open(import.meta.env.VITE_GITHUB_AUTH_URL, "_self");
    }
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: { authenticated: boolean; message: string; user: User } =
        await login(JSON.stringify(inputs));
      if (res.authenticated) {
        setOpenLogin(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  //testing purposes
  console.log(inputs);

  return (
    <motion.div
      className="login-dialog"
      variants={fadeEffects2}
      initial="hidden"
      animate="visible"
    >
      <header className="login-header">
        <FontAwesomeIcon
          icon={faX}
          className="x-mark"
          onClick={() => setOpenLogin(false)}
        />
        <p> Log in or Sign Up</p>
      </header>
      <h2> Welcome to Airbnb</h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "1rem"
      }}>
        <p>Test account:</p>
        <p>Email: guest@airbnb.com</p>
        <p>Password: password</p>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputs}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputs}
          required
        />
        <p>
          We’ll call or text you to confirm your number. Standard message and
          data rates apply. Privacy Policy
        </p>
        <button type="submit">Sign In</button>
      </form>
      <div>or</div>
      <button onClick={handleOAuth} value={"google"}>
        <FontAwesomeIcon icon={faGoogle} /> Continue with Google
      </button>
      <button onClick={handleOAuth} value={"facebook"}>
        <FontAwesomeIcon icon={faFacebook} /> Continue with Facebook
      </button>
      <button onClick={handleOAuth} value={"github"}>
        <FontAwesomeIcon icon={faGithub} /> Continue with Github
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
    </motion.div>
  );
};

export default Login;
