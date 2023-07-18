import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { defaultRoutes } from "../RoutesСonfig";
import { Spinner } from "@/shared/ui";

const AppRouter: React.FC = (): React.JSX.Element => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {defaultRoutes.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={<Suspense fallback={<Spinner />}>{element()}</Suspense>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
