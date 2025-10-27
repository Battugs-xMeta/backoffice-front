import { PageLoading } from "@ant-design/pro-layout";
import { ErrorBoundary } from "@ant-design/pro-utils";
import { useAuthContext } from "context/auth";
import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import auhtRoutes from "routes/auth";
import dashboardRoutes from "routes/dashboard";
import { IRoute } from "./types";
import { useRequest } from "ahooks";
import roleManagement from "service/role-management";

const AuthLayout = lazy(() => import("layout/auth"));
const DashboardLayout = lazy(() => import("layout/dashboard"));

const MainRoutes: FC = () => {
  const [{ authorized, user }] = useAuthContext();
  const menus = useRequest(roleManagement.listMenu, {
    refreshDeps: [authorized],
  });

  const routes: IRoute[] = [
    {
      path: "/dashboard",
      key: "dashboard",
      component: <DashboardLayout />,
      children: dashboardRoutes,
    },
  ];

  if (!authorized) {
    routes.push({
      path: "/auth",
      key: "auth",
      component: <AuthLayout />,
      children: auhtRoutes,
    });
  }

  return (
    <Routes>
      {/* Other Routes */}
      {routes.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoading />}>{route.component}</Suspense>
            </ErrorBoundary>
          }
        >
          {route?.children?.map((item) => {
            if (
              user?.role?.menus?.find((el: any) =>
                el?.menu?.path?.includes(item.path)
              )
            ) {
              return (
                <Route
                  key={item.key}
                  path={item.path}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<PageLoading />}>
                        {item.component}
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
              );
            } else if (
              !menus.data?.find((el) => el.path?.includes(item?.path || ""))
            ) {
              return (
                <Route
                  key={item.key}
                  path={item.path}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<PageLoading />}>
                        {item.component}
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
              );
            }
          })}
        </Route>
      ))}
      <Route
        key={"root"}
        path="*"
        element={
          authorized ? (
            <Navigate
              to={
                // user?.care_center?.status !== 3
                //  "/dashboard/registration"
                "/dashboard/dashboard"
              }
            />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
    </Routes>
  );
};

export default MainRoutes;
