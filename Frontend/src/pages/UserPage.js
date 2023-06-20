import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";

import ErrorMessage from "../components/ErrorMessage";

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = useUser(id);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>User {user.email}</h1>
      <p>user id:{user.id}</p>
      <p>Registred on: {new Date(user.created_at).toLocaleString()}</p>
      <userEnlaces id={user.id} />
    </section>
  );
};
