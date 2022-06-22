import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './pages/Home';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>BKMath</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<User />} />
            </Routes>
          </Container>
        </main>

        <footer className="text-center">
          Copyright &copy; 2022 by <strong>LE THAI THANH</strong>. All right
          reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
