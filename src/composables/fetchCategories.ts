import ICategory from "../interfaces/Category";

export async function fetchCategories(token: string): Promise<ICategory[]> {
  try {
    const response = await fetch("http://vbujdewvbj.cfolks.pl/api/category", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
