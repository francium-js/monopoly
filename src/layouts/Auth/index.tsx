import { Outlet } from "react-router-dom";

const AuthLayout = (): JSX.Element => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
