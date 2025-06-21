import { lazy } from "react";
import '../styles/styles.css';

export const HomePage = lazy(() => import("./HomePage"));
export const PostsPage = lazy(() => import("./PostsPage"));
export const SingleUserPage = lazy(() => import("./SingleUserPage"));
export const UserListPage = lazy(() => import("./UserList"));
