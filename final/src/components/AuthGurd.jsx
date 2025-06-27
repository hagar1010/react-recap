// import { isTokenExpire } from "@/api";
// import { useAuthStore } from "@/store/auth";
// import React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const AuthGurdRoute = () => {
//   const { pathname } = useLocation();
//   const { token, clear, refreshToken } = useAuthStore();

//   if (!token || isTokenExpire(refreshToken)) {
//     clear();
//     return <Navigate to={`/login?redirectTo=${pathname}`} />;
//   }

//   return <Outlet />;
// };

// export default AuthGurdRoute;




import { isTokenExpire } from "@/api";
import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuthGurdRoute() {
  const { pathname } = useLocation();
  const { token, refreshToken, clear } = useAuthStore();
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    if (!token || isTokenExpire(refreshToken)) {
      clear();
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [token, refreshToken]);

  if (authorized === null) return null; // or loading spinner
  if (!authorized) return <Navigate to={`/login?redirectTo=${pathname}`} />;

  return <Outlet />;
}
