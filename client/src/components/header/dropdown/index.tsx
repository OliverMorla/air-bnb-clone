import { motion } from "framer-motion";
import { fadeEffects } from "@/animations";
import { useAuth } from "@/context/AuthContext";
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
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  
  }
  const { userInfo } = useAuth();
  console.log(userInfo !== undefined && userInfo);
  return (
    <motion.section
      className="dropdown-wrapper"
      variants={fadeEffects}
      initial="hidden"
      animate="visible"
    >
      {userInfo ? <span> {userInfo?.user?.displayName} </span>  : <span onClick={() => !openLogin && setOpenRegister(true)}>Register</span>}
      {userInfo ? <span onClick={handleLogout}> Log Out </span> : <span onClick={() => !openRegister && setOpenLogin(true)}>Login</span>}
      <span>Airbnb your home</span>
      <span>Help</span>
    </motion.section>
  );
};

export default Dropdown;
