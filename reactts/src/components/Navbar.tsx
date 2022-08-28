import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logoutAuth } from "../reducers/authSlice";

const Navbar = () => {
  const token = useAppSelector(state => state.authReducer.refresh_token)
  const dispatch = useAppDispatch()
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="app__navbar section__padding">
      <div className="navbar__container ">
        <div className="navbar__container-logo">
          
          <h1 className="navbar__container-logo_header">TaskcyTodo</h1>
        </div>
      </div>
      <div className="navbar__auth">
        {
          token ? (
            <a className="navbar__auth-signup" onClick={() => dispatch(logoutAuth())} href="#">
              Logout
            </a>
          ) : (
            <>
            <a className="navbar__auth-login" href="#">
            Login
          </a>
          <a className="navbar__auth-signup" href="#">
            Sign Up
          </a>
          </>
          )
        }
       
        
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#4A4A50"
          fontSize={27}
          className="overlay__open"
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay scale-up-center">
            <CgClose
              fontSize={33}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <div className="navbar__auth-smallscreen">
            {
          token ? (
            <a className="navbar__auth-smallscreen__signup" onClick={() => dispatch(logoutAuth())} href="#">
              Logout
            </a>
          ) : (
            <>
              <a className="navbar__auth-smallscreen__login" href="#">
                Login
              </a>
              <a className="navbar__auth-smallscreen__signup" href="#">
                Sign Up
              </a>
           </>
          )
}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
