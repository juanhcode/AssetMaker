const BASE_URL = "http://34.44.169.14:8082";

export const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  EDIT_USERS: (id) => `${BASE_URL}/users/${id}`,
  DELETE_USERS: (id) => `${BASE_URL}/users/${id}`,
  REGISTER: `${BASE_URL}/users`,
  LOGIN: `${BASE_URL}/rest/auth/login`,
  PORTAFOLIO: (id) => `${BASE_URL}/portfolios/users/${id}`,
  REGISTER: `${BASE_URL}/users`,
  CREATE_PORTAFOLIO: `${BASE_URL}/portfolios`,
  EDIT_PORTAFOLIO: (id) => `${BASE_URL}/portfolios/${id}`,
  DELETE_PORTAFOLIO: (id) => `${BASE_URL}/portfolios/${id}`,
  DETALLE_PORTAFOLIO: (id) => `${BASE_URL}/portfolios/${id}`,
  CREATE_ACTIVO: `${BASE_URL}/assets`,
  ID_ACTIVO: (id) => `${BASE_URL}/assets/${id}`,
  CREATE_ACTIVO_PORTAFOLIO: `${BASE_URL}/assetsportfolios`,
  ID_PORTAFOLIO: (id) => `${BASE_URL}/portfolios/${id}`,
};
