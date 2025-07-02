import { FC, JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

/**
 * - If the route is private and the user is logged in, render the component
 * - Otherwise render <Navigate> to redirectTo
 */

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
