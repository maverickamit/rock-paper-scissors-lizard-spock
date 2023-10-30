import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

const AppNavigation = ({ children }) => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">
          Rock Paper Scissors Lizard Spock
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>{children}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavigation;
