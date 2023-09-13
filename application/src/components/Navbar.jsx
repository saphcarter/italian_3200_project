import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

function NavbarComponent() {
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  function handleLogout() {
    logout({
      returnTo: window.location.origin,
    });
  }

  return (
    <Navbar
      expand="lg"
      className="bg-primary justify-content-between align-items-center"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/" className="fw-medium fs-3 pl-10">
          Learn Italian
        </Navbar.Brand>
        {isAuthenticated && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/results">Results</Nav.Link>
                <NavDropdown title="User">
                  <NavDropdown.Item href="/profile">
                    View Profile
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
