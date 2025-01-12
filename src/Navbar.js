import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Resume from "./resume.pdf";
import "./Navbar.css";

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export default function NavigationBar() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const memoizedHandleClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  });

  function closeHamburgerMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(!isMenuOpen)
    }
  }

  let displayHamburgerMenu = () => {
    return (
      <HamburgerMenu
        isOpen={isMenuOpen}
        menuClicked={memoizedHandleClick}
        width={20}
        height={17}
        strokeWidth={1}
        rotate={0}
        color="white"
        borderRadius={0}
        animationDuration={0.5}
      />
    );
  };

  let displayMobileNavBar = () => {
    return (
      <Navbar className="navbar-mobile">
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="navContent-mobile">
            <Link to="/projects" className="NavLink-mobile" onClick={closeHamburgerMenu}>
              Projects
            </Link>
            <Link to="/journal" className="NavLink-mobile" onClick={closeHamburgerMenu}>
              Journal
            </Link>
            <Link to={Resume} target="newTab" className="NavLink-mobile" onClick={closeHamburgerMenu}>
              Resume
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  let displayNavBar = () => {
    return (
      <Navbar>
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="navContent">
            <Link to="/projects" className="NavLink">
              Projects
            </Link>
            {/* <Link to="/test" className="NavLink">
              Test
            </Link> */}
            <Link to="/journal" className="NavLink">
              Journal
            </Link>
            <Link to={Resume} target="newTab" className="NavLink">
              Resume
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 500)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)

    }
  })

  return (
    <div className="nav-content">
      <div className="navbar">
        <Link to="/" className="logo" onClick={closeHamburgerMenu}>
          N/CO
        </Link>
        {window.innerWidth > 750 ? displayNavBar() : displayHamburgerMenu()}
      </div>
      <div className="content">{isMenuOpen ? displayMobileNavBar() : null}</div>
    </div>
  );
}
