import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <section>
      <h1>Página no encontrada</h1>
      <p>Revisa la ruta especificada</p>
      <Link to="/"> Go to Home Page </Link>
    </section>
  );
};
