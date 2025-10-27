import { useAuthContext } from "context/auth";

import { FC } from "react";
import { Navigate } from "react-router-dom";

const Root: FC = () => {
  const [{ authorized, user }] = useAuthContext();
  if (!authorized) {
    return (
      <>
        <Navigate to={"/auth/login"} replace={true} />
      </>
    );
  }
  return (
    <>
      <Navigate
        to={
          // user?.care_center?.status === 3
          "/dashboard/dashboard"
          // : "/dashboard/registration"
        }
        replace={true}
      />
    </>
  );
};

export default Root;
