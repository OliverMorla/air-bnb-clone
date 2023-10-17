import { motion } from "framer-motion";
import { fadeEffects } from "@/animations";
import { useAuth } from "@/context/AuthContext";
import "./style.scss";
import { Link } from "react-router-dom";

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
  const { logout, userInfo } = useAuth();
  console.log(userInfo)
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res: { status: number; message: string } = await logout();
      console.log(res);
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
    }
  };
  // console.log(userInfo !== undefined && userInfo);
  return (
    <motion.section
      className="dropdown-wrapper"
      variants={fadeEffects}
      initial="hidden"
      animate="visible"
    >
      {userInfo ? (
        <Link to={"/auth/profile"}>
          <span> {userInfo?.user?.displayName} </span>
        </Link>
      ) : (
        <span onClick={() => !openLogin && setOpenRegister(true)}>
          Register
        </span>
      )}
      {userInfo ? (
        <span onClick={handleLogout}> Log Out </span>
      ) : (
        <span onClick={() => !openRegister && setOpenLogin(true)}>Login</span>
      )}
      <span>Airbnb your home</span>
      <span>Help</span>
    </motion.section>
  );
};

export default Dropdown;
