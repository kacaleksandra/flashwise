import Breadcrumb from "../../components/breadcrumb";
import Link from "next/link";
import { AnimationPage } from "@/components/animationPage";
import nothing from "../../lotties/nothing.json";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTokenStore } from "@/store/useTokenStore";

interface Set {
  id: number;
  name: string;
}

export default function MySets() {
  const token = useTokenStore((state) => state.token);
  const [sets, setSets] = useState<Set[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Dodajemy warunek sprawdzający czy token nie jest pusty
    async function fetchSets(): Promise<void> {
      try {
        if (token !== "") {
          const response = await fetch(
            "https://vbujdewvbj.cfolks.pl/api/sets?user_only=True",
            {
              headers: { Authorization: `Token ${token}` },
            }
          );

          const data = await response.json();
          setSets(data.map(({ id, name }: Set) => ({ id, name })));
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    if (token !== "") fetchSets();
  }, []); //Dodajemy zmienną token jako drugi argument do hooka useEffect

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
          {sets.map(({ id, name }, valueIndex) => (
            <div
              key={valueIndex}
              className="p-7 m-6 bg-blue-500 text-white text-center shadow-xl rounded-md flex items-center justify-center"
            >
              <Link href="/">{name}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
