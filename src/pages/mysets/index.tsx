import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import { AnimationPage } from "@/components/AnimationPage";
import nothing from "../../lotties/nothing.json";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ISet from "@/interfaces/Set";
import { useMySetsStore } from "@/store/useMySetsStore";
import useToken from "@/composables/useToken";

export default function MySets() {
  const token = useToken();
  const [sets, setSets] = useState<ISet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setMySets } = useMySetsStore();

  async function fetchSets(): Promise<ISet[]> {
    try {
      const response = await fetch(
        "https://vbujdewvbj.cfolks.pl/api/sets?user_only=True",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await response.json();
      const mappedSets = data.map(({ id, name, category }: ISet) => ({
        id,
        name,
        category,
      }));
      setSets(mappedSets);
      return mappedSets;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    return [];
  }

  useEffect(() => {
    fetchSets().then((sets) => {
      setMySets(sets);
    });
  }, []);

  return (
    <>
      <div>
        <Breadcrumb name="Moje zestawy" />
      </div>

      {isLoading && token !== "" ? (
        <div className="flex justify-center items-center">
          <CircularProgress color="primary" />
        </div>
      ) : sets.length === 0 || token === "" ? (
        <AnimationPage descr="Nic tu nie ma..." animation={nothing} />
      ) : (
        <div className="sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sets.map(({ id, name, category }, valueIndex) => (
            <Link
              href={`/set/${id}`}
              key={valueIndex}
              className="p-7 m-6 bg-blue-500 text-white text-center shadow-xl rounded-md flex items-center justify-center"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
