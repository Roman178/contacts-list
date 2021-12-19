import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

type PrivateRouteProps = {
  redirectPath: string;
  isConditionTrue: boolean;
};

const PrivateRoute: FC<PrivateRouteProps & RouteProps> = ({
  children,
  redirectPath,
  isConditionTrue,
  ...routeProps
}) => {
  return (
    <Route
      {...routeProps}
      render={() =>
        isConditionTrue ? children : <Redirect to={redirectPath} />
      }
    />
  );
};

export default PrivateRoute;
