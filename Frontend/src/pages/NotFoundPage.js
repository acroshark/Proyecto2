import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <section>
      <h1> Not Found</h1>
      <Link to={"/"}>go to home page </Link>
    </section>
  );
};

export default Link;
