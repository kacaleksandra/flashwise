import { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import CategoryTabs from "../../components/tabs";
import CircularProgress from "@mui/material/CircularProgress";
import ICategory from "@/interfaces/Category";
import GetToken from "@/functions/GetToken";
import ISet from "@/interfaces/Set";
import { fetchCategories } from "@/functions/FetchCategories";

interface OneCategory {
  category: string;
  sets: string[];
}

export default function Categories() {
  const token = GetToken();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sets, setSets] = useState<ISet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchSets(): Promise<void> {
    try {
      let newSets: ISet[] = [];
      const response = await fetch(`https://vbujdewvbj.cfolks.pl/api/sets?`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      // Dodajemy tylko te sety, które mają status 'public'
      for (const set of data) {
        if (set.status === "public") {
          newSets.push({
            id: set.id,
            name: set.name,
            category: set.category,
          });
        }
      }
      // Ustawiamy nową tablicę z filtrami
      setSets(newSets);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategories(token).then((data) => setCategories(data));
    fetchSets().then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function groupSetsByCategory(categories: ICategory[], sets: ISet[]) {
    return categories.reduce<OneCategory[]>((acc, curr) => {
      const category: OneCategory = { category: curr.name, sets: [] };
      const setsForCategory = [];

      for (const set of sets) {
        if (set.category === curr.id) {
          setsForCategory.push(set.name);
        }
      }

      if (setsForCategory.length > 0) {
        category.sets = setsForCategory;
        acc.push(category);
      }

      return acc;
    }, []);
  }
  const categoriesWSets = groupSetsByCategory(categories, sets);

  return (
    <>
      <div>
        <Breadcrumb name="Kategorie" />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="mx-1 px-0">
          <CategoryTabs categories={categoriesWSets} sets={sets} />
        </div>
      )}
    </>
  );
}
