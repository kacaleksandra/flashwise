import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import CircularProgress from "@mui/material/CircularProgress";

interface IFlashcard {
  id: number;
  front: string;
  back: string;
  flashcard_set: number;
}

export default function Set() {
  const token = useTokenStore((state) => state.token);
  const router = useRouter();
  //const [nameOnly, setNameOnly] = useState<string>("");

  async function fetchFlashcards(nameOnly: string): Promise<void> {
    try {
      const response = await fetch(
        `http://vbujdewvbj.cfolks.pl/api/flashcards?flashcard_set=` + nameOnly,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
      const data = await response.json();

      await console.log(data);
      setFlashcards(
        data.map(({ id, front, back }: IFlashcard) => ({ id, front, back }))
      );
    } catch (error) {
      console.error(error);
    }
  }

  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

  useEffect(() => {
    //fetch flashcards
    const id = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    //console.error(x);

    //const { id } = router.query as { id: string };
    const nameOnly = id.substring(id.indexOf("-") + 1);
    //setNameOnly(nameOnly);

    fetchFlashcards(nameOnly);
  }, []);

  return (
    <>
      <h1>test </h1>
      {flashcards.map((flashcard) => (
        <div key={flashcard.id}>
          <h1>{flashcard.front}</h1>
          <h1>{flashcard.back}</h1>
        </div>
      ))}
    </>
  );
}
