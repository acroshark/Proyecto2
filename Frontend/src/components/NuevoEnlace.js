import { useContext, useState } from "react";
import { sendEnlaceservice } from "../services";
import { AuthContext } from "../context/AuthContext";

export const NuevoEnlace = (addEnlace) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState();
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const data = new FormData(e.target);
      const Enlace = await sendEnlaceservice({ data, token });
      addEnlace(Enlace);
      e.target.reset();
      setImage(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h1>Add New Enlace</h1>
      <fieldset>
        <label htmlFor="text"> Text</label>
        <input type="text" id="text" name="text" />
      </fieldset>
      <fieldset>
        <label htmlFor="image">image (optional)</label>
        <input
          type="file"
          id="image"
          name="image"
          acept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image ? (
          <figure>
            <img
              src={URL.ccreateObjectURL}
              alt="Previw"
              stlye={{ width: "100px" }}
            />
            Hay una imagen seleccionada
          </figure>
        ) : null}
      </fieldset>
      <button>Send Enlace</button>
      {sending ? <p>Sending Enlace</p> : null}
      {error ? <p>{error} </p> : null}
    </form>
  );
};
