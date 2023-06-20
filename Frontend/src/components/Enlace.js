import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteEnlaceservice } from "../services";

export const Enlace = ({ Enlace, removeEnlace }) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState();

  const deleteEnlace = async (id) => {
    try {
      await deleteEnlaceservice({ id, token });
      if (removeEnlace) {
        removeEnlace(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <article>
      <p>{Enlace.text}</p>

      {Enlace.image ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${Enlace.image}`}
          alt={Enlace.text}
        />
      ) : null}
      <p>
        By <Link to={`/user/${Enlace.user.id}`}>{Enlace.email} </Link>on{" "}
        <Link to={`/Enlace/${Enlace.id}`}>
          {new Date(Enlace.created_at).toLocaleString()}
        </Link>
      </p>
      {user && user.id === Enlace.user_id ? (
        <section>
          <button
            onClick={() => {
              if (window.confirm("Are you sure?")) deleteEnlace(Enlace.id);
            }}
          >
            Deelte Enlace
          </button>
          {error ? <p>{error}</p> : null}
        </section>
      ) : null}
    </article>
  );
};
