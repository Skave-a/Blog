import { Link, NavLink } from "react-router-dom";

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

  const isAuth = true;
  const logoutHandler = () => {};

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        E
      </span>
      {isAuth && (
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
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler}>Выйти</button>
        ) : (
          <Link to={"/login"}> Войти </Link>
        )}
      </div>
    </div>
  );
};
