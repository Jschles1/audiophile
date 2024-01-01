import axios from "axios";

async function fetchResource(route: string) {
  try {
    const response = await axios.get(route);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching from ${route}: `, error);
  }
}

export async function fetchCategorieProducts(categoryName: string) {
  return await fetchResource(`/api/${categoryName}`);
}

export async function fetchProductDetail(categoryName: string, slug: string) {
  return await fetchResource(`/api/${categoryName}/${slug}`);
}
