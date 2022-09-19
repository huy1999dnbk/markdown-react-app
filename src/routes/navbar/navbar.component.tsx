import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";
import { NavbarWrapperContainer } from "./navbar.styles";
const NavbarWrapper = () => {
  return (
    <NavbarWrapperContainer>
      <Navbar />
      <Outlet />
    </NavbarWrapperContainer>
  );
};

export default NavbarWrapper;
