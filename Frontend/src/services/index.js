export const getAllEnlacesService = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}`);

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getUserEnlacesService = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/user/${id}/Enlaces`
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getSingleEnlaceservice = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/Enlace/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const registerUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
    method: "POST",
    headers: {
      "Content-type": "Aplication/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
    method: "POST",
    headers: {
      "Content-type": "Aplication/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const getMyUserDataService = async ({ token }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const getUserDataService = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const sendEnlaceservice = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const deleteEnlaceservice = async ({ id, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/Enlace/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};
