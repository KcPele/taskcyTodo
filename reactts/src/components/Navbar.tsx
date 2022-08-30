import  { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logoutAuth, toggleMode } from "../reducers/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = useAppSelector(state => state.authReducer.refresh_token)
  const dispatch = useAppDispatch()
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAuth())
    setToggleMenu(false)
  }
  const handleAuth = (mode: string) => {
    dispatch(toggleMode({mode}))
    setToggleMenu(false)
  }
  return (
    <nav className="app__navbar section__padding">
      <div className="navbar__container ">
        <div className="navbar__container-logo">
          
          <Link to="/"><h1 className="navbar__container-logo_header">TaskcyTodo</h1></Link>
        </div>
      </div>
      <div className="navbar__auth">
        {
          token ? (
            <button className="navbar__auth-signup" onClick={() => dispatch(logoutAuth())}>
              Logout
            </button>
          ) : (
            <>
            <Link className="navbar__auth-login" onClick={() => handleAuth("login")} to='/login'>
            Login
          </Link>
          <Link className="navbar__auth-signup" onClick={() => handleAuth("signup")} to='/signup'>
            Sign Up
          </Link>
          </>
          )
        }
       
        
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
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
            <button  className="navbar__auth-smallscreen__button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="navbar__auth-smallscreen__login navbar__auth-smallscreen__signup" onClick={() => handleAuth("login")} to="/login">
                Login
              </Link>
              <Link className="navbar__auth-smallscreen__signup" onClick={() => handleAuth("signup")} to="/signup">
                Sign Up
              </Link>
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
