import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logoFinal.jpg';
import { apiUrl } from './http';
import { CartContext } from '../context/Cart';
import UserIcon from '../Usericon';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const { getQty } = useContext(CartContext);

  useEffect(() => {
    fetch(`${apiUrl}/get-categories`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setCategories(result.data);
        } else {
          console.log('Something Went Wrong');
        }
      });
  }, []);
  
  return (
    <header className="shadow">
      <div className="bg-dark text-center py-3">
        <span className="text-white">Your Trusted Partner</span>
      </div>

      <Container>
        <Navbar expand="lg" className="bg-white" sticky="top">
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="Logo" width={50} height={60} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {categories.map((category) => (
                <Nav.Link key={category.id} as={Link} to={`/shop?category=${category.id}`}>
                  {category.name}
                </Nav.Link>
              ))}
            </Nav>

            <div className="nav-right d-flex align-items-center">
              <Link to="/admin/login" className="ms-3">
                <svg width="25px" height="25px" viewBox="0 0 24 24">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 14v8H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"></path>
                  </g>
                </svg>
              </Link>

              <div className="ms-3">
                <UserIcon />
              </div>

              <Link to="/cart" className="ms-3 cart-bucket">
                <span>{getQty()}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
                </svg>
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;

