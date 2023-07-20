import { motion } from "framer-motion";
import { fadeEffects } from "@/animations";
import "./style.scss";

interface Props {
  setOpenLogin: React.Dispatch<boolean>;
  setOpenRegister: React.Dispatch<boolean>;
  openLogin: boolean;
  openRegister: boolean;
}

const Dropdown: React.FunctionComponent<Props> = ({
  setOpenLogin,
  setOpenRegister,
  openLogin,
  openRegister,
}) => {
  return (
    <motion.section 
    className="dropdown-wrapper"
    variants={fadeEffects}
    initial="hidden"
    animate="visible"
    >
      <span onClick={() => !openLogin && setOpenRegister(true)}>Register</span>
      <span onClick={() => !openRegister && setOpenLogin(true)}>Login</span>
      <span>Airbnb your home</span>
      <span>Help</span>
    </motion.section>
  );
};

export default Dropdown;
