import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { ListaEnlaces } from "../components/ListaEnlaces";
import { AuthContext } from "../context/AuthContext";
import useEnlaces from "../hooks/useEnlaces";
import { NuevoEnlace } from "../components/NuevoEnlace";

export const HomePage = () => {
  const { Enlaces, loading, error, addEnlace, removeEnlace } = useEnlaces();
  const { user } = useContext(AuthContext);

  if (loading) return <p>Cargando Enlaces</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      {user ? <NuevoEnlace addEnlace={addEnlace} /> : null}
      <h1>Ultimos Enlaces</h1>

      <ListaEnlaces Enlaces={Enlaces} removeEnlace={removeEnlace} />
    </section>
  );
};

export default HomePage;
