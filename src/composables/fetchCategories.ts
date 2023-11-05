import ICategory from "../interfaces/Category";
import { API_URL } from "@/constants";

export async function fetchCategories(token: string): Promise<ICategory[]> {
  try {
    const response = await fetch(`${API_URL}/api/category`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json() as ICategory[];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
