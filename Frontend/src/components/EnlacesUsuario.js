import useEnlaces from "../hooks/useEnlace";
import { ErrorMessage } from "./ErrorMessage";
import { ListaEnlaces } from "./ListaEnlaces";

export const UserEnlaces = ({ id }) => {
  const { Enlaces, loading, error, removeEnlace } = useEnlaces(id);

  if (loading) return <p>Loading Enlaces</p>;
  if (error) return <ErrorMessage message={error} />;

  return <ListaEnlaces Enlaces={Enlaces} removeEnlace={removeEnlace} />;
};
