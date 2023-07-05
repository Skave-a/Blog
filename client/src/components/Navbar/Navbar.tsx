import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { toast } from "react-toastify";

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

export const Navbar = () => {
  const activeStyle = {
    color: "#000000",
  };
  const dispatch = useAppDispatch();
  const isAuth = useSelector(checkIsAuth);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
    dispatch(logout());
    toast("Вы вышли из аккаунта");
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        E
      </span>
      {isAuth.auth && (
        <ul className="flex gap-8">
          {MENU.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className="text-xs text-gray-400 hover:text-black"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <div className="bg-indigo-500 text-white py-2 text-sm px-3 rounded focus:outline-none">
        {isAuth.auth ? (
          <button onClick={logoutHandler}>Выйти</button>
        ) : (
          <Link to={"/login"}> Войти </Link>
        )}
      </div>
    </div>
  );
};
