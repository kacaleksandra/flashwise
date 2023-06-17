import { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import CategoryTabs from "../../components/tabs";
import { useTokenStore } from "@/store/useTokenStore";
import CircularProgress from "@mui/material/CircularProgress";
import ICategory from "@/interfaces/Category";

interface OneCategory {
  category: string;
  sets: string[];
}

export interface Set {
  id: number;
  name: string;
  category: number;
  status?: string;
  is_premium?: boolean;
  tag?: string;
  sets?: string[];
}

export default function Categories() {
  const token = useTokenStore((state) => state.token);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sets, setSets] = useState<Set[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //fetch categories
    async function fetchCategories(): Promise<void> {
      try {
        const response = await fetch(
          "http://vbujdewvbj.cfolks.pl/api/category",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const data = await response.json();
        setCategories(
          data.map(({ id, name, level }: ICategory) => ({ id, name }))
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchSets(): Promise<void> {
      try {
        let newSets: Set[] = [];
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

    fetchCategories().then(() => fetchSets().then(() => setIsLoading(false)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function groupSetsByCategory(categories: ICategory[], sets: Set[]) {
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
