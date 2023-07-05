// import { routeConfig } from '@/features/router/components/routeConfig';
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { defaultRoutes } from "../RoutesСonfig";
import { Spinner } from "@/shared/ui/spinner";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
