import { Enlace } from "./Enlace";

export const ListaEnlaces = ({ Enlaces, removeEnlace }) => {
  return Enlaces.length ? (
    <ul>
      {Enlaces.map((enlace) => (
        <li key={Enlace.id}>
          <Enlace Enlace={Enlace} removeEnlace={removeEnlace} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay enlaces </p>
  );
};
