import { getProducts } from "./products";

export async function getSearchProducts() {
  return getProducts({
    perPage: 100,
  });
}