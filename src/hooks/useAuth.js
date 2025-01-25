import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem("accessToken");

    // Rediriger vers la page de Login
    navigate("/");
  };

  return { handleLogout };
};

export default useAuth;
