import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function NavbarComponent() {
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  function handleLogout() {
    logout({
      returnTo: window.location.origin,
    });
  }

  return (
    <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
      <Container className="align-items-baseline mx-3">
        <Link to="/" className="nav-link">
          <Navbar.Brand className="fs-1 ">Learn Italian</Navbar.Brand>
        </Link>
        {isAuthenticated && (
          <>
            <Navbar.Toggle aria-controls="navigation-links" />
            <Navbar.Collapse>
              <Nav aria-roledescription="navigation-links">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                {/* <Nav.Link> */}
                <Link to="/results" className="nav-link">
                  Results
                </Link>
                {/* </Nav.Link> */}
                <NavDropdown title="User">
                  <NavDropdown.Item>
                    <Link to="/profile" className="nav-link">
                      View Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
      {!isAuthenticated && <LoginButton />}
    </Navbar>
  );
}

export default NavbarComponent;
