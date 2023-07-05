import React from "react";
import { Navigate } from "react-router-dom";
import { AccessMode } from "./types";
import { Spinner } from "@/shared/ui/spinner";
import { useSelector } from "react-redux";
import { checkIsAuth } from "@/redux/slices/authSlice";
import { FullPageWrapper } from "@/shared/ui/fullPageWrapper/FullPageWrapper";

export const ProtectedRoute = ({
  children,
  mode,
  redirectTo = "/",
}: {
  children: React.JSX.Element;
  mode: AccessMode;
  redirectTo?: string;
}) => {
  const isAuth = useSelector(checkIsAuth);

  if (isAuth.isLoading)
    return (
      <FullPageWrapper>
        <Spinner />
      </FullPageWrapper>
    );
  if (mode == AccessMode.Always) return children;

  const accessGranted =
    (mode == AccessMode.Guest && !isAuth.auth) ||
    (mode == AccessMode.LoggedIn && isAuth.auth);

  return accessGranted ? children : <Navigate to={redirectTo} />;
};
