import { v4 } from "uuid";
import { HomePage } from "../page";
import userRoutes from "./UserRoutes";

export default [
  {
    id: v4(),
    path: "/",
    element: <HomePage />,
  },
  ...userRoutes,
];
