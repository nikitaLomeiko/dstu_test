import { Suspense } from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom";
import { Routes } from "../lib/Routes";


export const Routing = () => {
  return (
    <Suspense fallback={'Загрузка...'}>
      <ReactRoutes>
        {Routes.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </ReactRoutes>
    </Suspense>
  );
};
