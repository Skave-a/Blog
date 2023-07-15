import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { BsMoonStars } from "react-icons/bs";
import { GoSignIn, GoSignOut } from "react-icons/go";

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

export const Navbar = (): JSX.Element => {
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

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to={"/"} className="text-3xl font-bold cursor-pointer">
        Posts
      </Link>

      {isAuth.auth && (
        <ul className="flex gap-8">
          {MENU.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="text-xs menuСolor px-4 py-2 rounded ease-out duration-300 hover:bg-lightPink hover:text-menuСolor"
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-4">
        <BsMoonStars className="cursor-pointer" />
        {/* <div className="bg-indigo-500 text-white py-2 text-sm px-3 rounded focus:outline-none"> */}
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
    </div>
  );
};
