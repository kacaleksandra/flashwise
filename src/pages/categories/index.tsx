import { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import CategoryTabs from "../../components/tabs";
import { useTokenStore } from "@/store/useTokenStore";
import CircularProgress from "@mui/material/CircularProgress";

interface Category {
  id: number;
  name: string;
  level?: number;
}

interface OneCategory {
  category: string;
}

export interface Set {
  id: number;
  name: string;
  category: number;
  status?: string;
  is_premium?: boolean;
  tag?: string;
}

export default function Categories() {
  const token = useTokenStore((state) => state.token);
  const [categories, setCategories] = useState<Category[]>([]);
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
          data.map(({ id, name, level }: Category) => ({ id, name }))
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
        setSets(
          data.map(({ id, name, category }: Set) => ({ id, name, category }))
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories().then(() => fetchSets().then(() => setIsLoading(false)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function groupSetsByCategory(categories: Category[], sets: Set[]) {
    return categories.reduce((acc: any, curr) => {
      const category: any = { category: curr.name };
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
  console.log(sets);

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
