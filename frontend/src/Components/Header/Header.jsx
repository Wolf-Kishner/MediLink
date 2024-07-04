import { useEffect, useRef, useContext } from "react";
import React from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaUserMd } from "react-icons/fa";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(AuthContext);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.add("show_menu");
    }
  };

  const handleStickyHeader = () => {
    if (headRef.current) {
      if (window.scrollY > 80) {
        headRef.current.classList.add("sticky_header");
      } else {
        headRef.current.classList.remove("sticky_header");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  return (
    <header ref={headRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="HealthCare Logo" />
          </div>
          <div className="navigation" ref={menuRef}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }
                >
                  <div className="flex flex-row justify-evenly gap-4 items-center">
                    {role === "doctor" ? (
                      <FaUserMd
                        className="text-blue-500"
                        style={{ fontSize: "20px" }}
                      />
                    ) : (
                      <FaUser
                        className="text-blue-500"
                        style={{ fontSize: "20px" }}
                      />
                    )}
                    <h2 className="mt-2">{user?.name}</h2>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
