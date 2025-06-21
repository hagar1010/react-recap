import { v4 } from "uuid";
import { HomePage,PostsPage } from "../page";
import userRoutes from "./UserRoutes";

export default [
  {
    id: v4(),
    path: "/",
    element: <HomePage />,
  },
  {
    id: v4(),
    path: "/posts",
    element: <PostsPage />,
  },
  ...userRoutes,
];
