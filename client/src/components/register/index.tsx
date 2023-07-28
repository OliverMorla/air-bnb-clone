import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RegisterInputTypes } from "@/types/types";
import { fadeEffects2 } from "@/animations";
import "./style.scss";
import {
  faFacebook,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "@/context/AuthContext";

interface Props {
  setOpenRegister: React.Dispatch<boolean>;
  setOpenLogin: React.Dispatch<boolean>;
}

const Register: React.FunctionComponent<Props> = ({
  setOpenRegister,
  setOpenLogin,
}) => {
  const { register } = useAuth();
  const [inputs, setInputs] = useState<RegisterInputTypes>({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    date_of_birth: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.password === inputs.password_confirm) {
      try {
        const res: { status: number; message: string } = await register(
          JSON.stringify(inputs)
        );
        console.log(res);
      } catch (err: unknown) {
        if (err instanceof Error) console.log(err.message);
      }
    }
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  // Testing purposes
  console.log(inputs);

  return (
    <motion.div
      className="register-dialog"
      variants={fadeEffects2}
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
      <form action="" onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="Username"
          onChange={handleInputs}
          required
        />
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
        <input
          type="password"
          name="password_confirm"
          placeholder="Confirm Password"
          onChange={handleInputs}
          required
        />
        <label htmlFor="date_of_birth">
          Date of Birth:
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputs({
                ...inputs,
                [e.currentTarget.name]: e.currentTarget.value,
              })
            }
          />
        </label>
        <p>
          We’ll call or text you to confirm your number. Standard message and
          data rates apply. Privacy Policy
        </p>
        <button type="submit">Sign Up</button>
      </form>
      <div>or</div>
      <button>
        <FontAwesomeIcon icon={faGoogle} /> Continue with Google
      </button>
      <button>
        <FontAwesomeIcon icon={faFacebook} /> Continue with Facebook
      </button>
      <button>
        <FontAwesomeIcon icon={faGithub} /> Continue with Github
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
