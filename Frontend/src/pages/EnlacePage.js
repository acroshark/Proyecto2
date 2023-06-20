import { Link, useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
/* import { Enlace } from "../components/Enlace"; */
import useEnlace from "../hooks/useEnlace";

export const EnlacePage = () => {
  const { id } = useParams();

  const { Enlace, loading, error } = useEnlace(id);

  if (loading) return <p>Cargando Enlaces</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Enlace from {Enlace.email}</h1>
      <Link Enlace={Enlace} />
    </section>
  );
};

export default EnlacePage;
