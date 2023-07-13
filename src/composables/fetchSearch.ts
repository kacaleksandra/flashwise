import ISet from "@/interfaces/Set";

export default async function fetchSearch(
  token: string,
  searchText: string
): Promise<ISet[]> {
  try {
    const response = await fetch(
      `http://vbujdewvbj.cfolks.pl/api/sets?name=${searchText}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await response.json();
    const mappedSets = data.map(({ id, name, category }: ISet) => ({
      id,
      name,
      category,
    }));
    return mappedSets as ISet[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
