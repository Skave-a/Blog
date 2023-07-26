import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { BsMoonStars } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSignIn, GoSignOut } from "react-icons/go";
import React, { useState } from "react";

const MENU = [
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "Мои посты",
    path: "/posts",
  },
  {
    name: "Добавить пост",
    path: "/new",
  },
];

const Navbar = (): React.JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const activeStyle = {
    color: "#f08e80",
  };
  const dispatch = useAppDispatch();
  const isAuth = useSelector(checkIsAuth);
  const logoutHandler = (): void => {
    localStorage.removeItem("token");
    window.location.reload();
    dispatch(logout());
    toast("Вы вышли из аккаунта");
  };

  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex py-4 justify-between items-center relative">
      <Link to={"/"} className="text-3xl font-bold cursor-pointer">
        Posts
      </Link>

      {isAuth.auth && (
        <ul className="hidden md:flex">
          {MENU.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="text-xs menuСolor px-4 py-2 rounded ease-out duration-300 hover:bg-lightPink
                hover:text-menuСolor whitespace-nowrap"
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-4">
        <GiHamburgerMenu
          className="cursor-pointer block md:hidden"
          onClick={toggleMenu}
        />
        <BsMoonStars className="cursor-pointer" />
        <div>
          {isAuth.auth ? (
            <GoSignOut onClick={logoutHandler} className="cursor-pointer" />
          ) : (
            <Link to={"/login"}>
              <GoSignIn />
            </Link>
          )}
        </div>
      </div>
      {showMenu && isAuth.auth && (
        <ul className="absolute flex flex-col gap-3 right-14 top-12 z-20 bg-btnColor rounded-lg py-4 px-2">
          {MENU.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                style={({ isActive }) =>
                  isActive ? { color: "#ffffff" } : undefined
                }
                className="text-xs menuСolor px-4 py-2 rounded ease-out duration-300 hover:bg-lightPink
                hover:text-menuСolor whitespace-nowrap"
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
