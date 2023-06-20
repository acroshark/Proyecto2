import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProfile() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user");
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error(error);
      setError("Error al obtener los datos del usuario.");
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/user/${user.id}`, user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError("Error al actualizar el perfil del usuario.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Correo electrónico:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Actualizar perfil"}
      </button>
    </form>
  );
}

export default EditProfile;
