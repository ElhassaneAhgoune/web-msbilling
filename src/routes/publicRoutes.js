// src/routes/publicRoutes.js
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";

const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

export default publicRoutes;
