import { del, get, patch, post } from "./request";

//   products: "products",
//   users: "users",
//   auth: "auth",
//   employee: "employee",
//   customer: "customer",
//   order: "order"

export const getResource = async (API) => {
  const result = await get(`${API}`);
  return result;
}

export const createResource = async (API, options) => {
  const result = await post(`${API}`, options);
  return result;
}

export const deleteResource = async (API, id) => {
  const result = await del(`${API}/${id}`);
  return result;
}

export const editResource = async (API, id, options) => {
  const result = await patch(`${API}/${id}`, options);
  return result;
}