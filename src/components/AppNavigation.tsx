import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const AppNavigation = ({ children }) => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link to={"/"}>
          <p className="font-bold text-inherit">
            Rock Paper Scissors Lizard Spock
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>{children}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavigation;
