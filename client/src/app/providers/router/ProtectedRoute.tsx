import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AccessMode, ProtectedRouteProps } from "./types";
import { FullPageWrapper, Spinner } from "@/shared/ui";
import { checkIsAuth } from "@/redux/slices/authSlice";

export const ProtectedRoute = ({
  children,
  mode,
  redirectTo = "/",
}: ProtectedRouteProps): ReactElement => {
  const isAuth = useSelector(checkIsAuth);

  if (isAuth.isLoading)
    return (
      <FullPageWrapper>
        <Spinner />
      </FullPageWrapper>
    );
  if (mode === AccessMode.Always) return children;

  const accessGranted =
    (mode === AccessMode.Guest && !isAuth.auth) ||
    (mode === AccessMode.LoggedIn && isAuth.auth);

  return accessGranted ? children : <Navigate to={redirectTo} />;
};
