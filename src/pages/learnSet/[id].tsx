import { useTokenStore } from "@/store/useTokenStore";
import { useState, useEffect } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import FlashcardArrayProps from "react-quizlet-flashcard/dist/interfaces/IFlashcardArray";
import router from "next/router";
import IFlashcard from "@/interfaces/Flashcard";
import ISet from "@/interfaces/Set";
import { CircularProgress } from "@mui/material";

export default function LearnSet() {
  const token = useTokenStore((state) => state.token);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [flashcards, setFlashcards] = useState<any>([]);

  async function getSet(): Promise<ISet> {
    const id = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );

    const response = await fetch(
      `http://vbujdewvbj.cfolks.pl/api/sets?flashcard_set_id=` + id,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const set = (await response.json()) ?? [];
    return set[0];
  }

  async function fetchFlashcards(): Promise<void> {
    try {
      const set = await getSet();
      if (set === undefined) {
        await router.push("/categories");
        return;
      }

      const response = await fetch(
        `http://vbujdewvbj.cfolks.pl/api/flashcards?flashcard_set=` + set.name,

        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await response.json();
      const parsedFlashcards: FlashcardArrayProps[] = data.map(
        (item: IFlashcard) => ({
          id: item.id,
          frontHTML: item.front,
          backHTML: item.back,
        })
      );
      setFlashcards(parsedFlashcards);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFlashcards();
  }, []);

  return (
    <>
      <div className="flex h-full justify-center items-center p-10 mt-5">
        {isLoading && token !== "" ? (
          <div className="flex justify-center items-center">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <FlashcardArray
            cards={flashcards}
            cycle={true}
            backContentStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
            frontContentStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          />
        )}
      </div>
    </>
  );
}
