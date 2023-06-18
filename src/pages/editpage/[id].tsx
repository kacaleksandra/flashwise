import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import Breadcrumb from "../../components/breadcrumb";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { Tooltip } from "@mui/material";
import { Switch } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ICategory from "@/interfaces/Category";
import { useTokenStore } from "@/store/useTokenStore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import ISet from "@/interfaces/Set";
import IFlashcard from "@/interfaces/Flashcard";
import getRouteParameter from "@/functions/GetRouteParameter";

export default function EditPage() {
  const router = useRouter();
  const token = useTokenStore((state) => state.token);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<IFlashcard[]>([{ front: "", back: "" }]);
  const [deletedCards, setDeletedCards] = useState<IFlashcard[]>([]);
  // Stan dla pola nazwa zestawu
  const [setName, setSetName] = useState<string>("");
  // Stan publiczny/prywatny
  const [isPublic, setIsPublic] = useState(true);

  // AKTUALIZACJE STANÓW
  // Aktualizacja stanu po zmianie nazwy
  const handleSetNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSetName(event.target.value);
  };
  // Aktualizacja stanu po zmianie front
  const handleTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCards = [...cards];
    newCards[index].front = event.target.value;
    setCards(newCards);
  };

  // Aktualizacja stanu po zmianie back
  const handleDefinitionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCards = [...cards];
    newCards[index].back = event.target.value;
    setCards(newCards);
  };
  // Dodanie nowej karty
  const handleAddCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  // Usunięcie karty
  const handleDeleteCardClick = (index: number) => {
    let updatedList = [...cards];
    if (updatedList.length === 1) return;
    updatedList.splice(index, 1);
    setCards(updatedList);
    let updatedDeletedCards = [...deletedCards];
    updatedDeletedCards.push(cards[index]);
    setDeletedCards(updatedDeletedCards);
  };
  //zmiana publiczny/prywatny
  const handlePublicChange = () => {
    setIsPublic(!isPublic);
  };

  // WALIDACJE
  // Czy formularz jest poprawnie wypełniony?
  const isFormValid = () =>
    validateFormFieldsAreNotEmpty(cards) && setName.length > 0;
  // Czy karty są wypełnione?
  const validateFormFieldsAreNotEmpty = (cards: IFlashcard[]) =>
    cards.every((card) => card.front.trim() !== "" && card.back.trim() !== "");

  //fetch kategorii
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sets, setSets] = useState<ISet[]>([]);

  async function fetchCategories(): Promise<number> {
    try {
      const response = await fetch("http://vbujdewvbj.cfolks.pl/api/category", {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data.map(({ id, name }: ICategory) => ({ id, name })));
      return data[0]?.id || 0;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  //select kategorii
  // Stan dla kategorii
  const [categoryID, setCategoryID] = useState<number>(0);
  const handleSelectChange = (event: SelectChangeEvent) => {
    setCategoryID(parseInt(event.target.value));
  };

  // POBIERANIE DANYCH
  async function getSetInfo(): Promise<string> {
    try {
      const id = getRouteParameter();
      const response = await fetch(
        `http://vbujdewvbj.cfolks.pl/api/sets?flashcard_set_id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = (await response.json()) as ISet[];
      setSetName(data[0].name);
      setCategoryID(data[0].category);
      setIsPublic(data[0].status === "public" ? true : false);
      return data[0].name;
    } catch (error) {
      console.error(error);
    }
    return "";
  }

  async function getCards(name: string): Promise<IFlashcard[]> {
    try {
      const response = await fetch(
        `http://vbujdewvbj.cfolks.pl/api/flashcards?flashcard_set=${name}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = (await response.json()) as IFlashcard[];
      setCards(data);
      return data;
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  async function handleDeleteSetClick(): Promise<void> {
    try {
      const id = getRouteParameter();
      const response = await fetch(
        `http://vbujdewvbj.cfolks.pl/api/sets/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      router.push(`/mysets`);
    }
  }

  // AKTUALIZOWANIE DANYCH
  async function handleEditSetClick(): Promise<void> {
    let setId: number = parseInt(getRouteParameter());
    try {
      setIsLoading(true);
      // Aktualizowanie nazwy zestawu
      const setResponse = await fetch(
        `http://vbujdewvbj.cfolks.pl/api/sets/${setId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: setName,
            category: categoryID,
            status: isPublic ? "public" : "private",
          }),
        }
      );

      // Edycja fiszek
      await Promise.all(
        cards.map(async (card) => {
          if (card.id === undefined) {
            return await fetch("http://vbujdewvbj.cfolks.pl/api/flashcards/", {
              method: "POST",
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                flashcard_set: setId,
                front: card.front,
                back: card.back,
              }),
            });
          } else {
            return await fetch(
              `http://vbujdewvbj.cfolks.pl/api/flashcards/${card.id}/`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  flashcard_set: setId,
                  front: card.front,
                  back: card.back,
                }),
              }
            );
          }
        })
      );
      await Promise.all(
        deletedCards.map(async (card) => {
          return await fetch(
            `http://vbujdewvbj.cfolks.pl/api/flashcards/${card.id}/`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                flashcard_set: setId,
                front: card.front,
                back: card.back,
              }),
            }
          );
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      if (setId !== 0) {
        router.push(`/set/${setId}`);
        return;
      }
      router.push(`/mysets`);
    }
  }

  useEffect(() => {
    fetchCategories();
    getSetInfo().then((setName) =>
      getCards(setName).then(() => setIsLoading(false))
    );
  }, []);

  return (
    <>
      {isLoading && token !== "" ? (
        <div className="flex justify-center items-center">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <div>
            <Breadcrumb name="Nowy zestaw" />
          </div>
          <div className="mx-8 my-3">
            <Typography variant="h4" className="px-5 text-gray-900">
              Edytuj zestaw
            </Typography>

            {/* Dodanie pola Nazwa Zestawu */}
            <div className="flex justify-between">
              <TextField
                required={true}
                value={setName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleSetNameChange(event);
                }}
                className="w-1/2 mx-5 my-3"
                id="set-name"
                label="Nazwa zestawu"
                variant="standard"
              />

              {/*Przycisk Stwórz zestaw*/}
              <div className="flex justify-around items-center grow ">
                <FormGroup>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Kategoria
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={categoryID.toString()}
                      label="Kategoria"
                      onChange={handleSelectChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isPublic}
                        onChange={() => handlePublicChange()}
                      />
                    }
                    label={
                      <Typography className="text-xs text-gray-800">
                        prywatny/publiczny
                      </Typography>
                    }
                    labelPlacement="bottom"
                  />
                </FormGroup>
                {!isFormValid() || cards.length < 2 ? (
                  <div className="my-5 mr-10 flex flex-col">
                    <Tooltip
                      title="Nazwij zestaw i stwórz minimum dwie fiszki!"
                      followCursor
                    >
                      <div>
                        <Button
                          disabled={!isFormValid() || cards.length < 2}
                          variant="contained"
                          size="large"
                          className={"bg-blue-500 mb-3"}
                        >
                          Edytuj zestaw
                        </Button>
                      </div>
                    </Tooltip>
                    <Button
                      variant="contained"
                      className="bg-red-500"
                      color="error"
                      size="large"
                      onClick={() => handleDeleteSetClick()}
                    >
                      Usuń zestaw
                    </Button>
                  </div>
                ) : (
                  <div className="my-5 mr-10 flex flex-col">
                    <Button
                      variant="contained"
                      size="large"
                      className={"bg-blue-500 mb-3"}
                      onClick={() => handleEditSetClick()}
                    >
                      Edytuj zestaw
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      className="bg-red-500"
                      onClick={() => handleDeleteSetClick()}
                    >
                      Usuń zestaw
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: "70vh",
                overflowX: "hidden",
              }}
            >
              {/* Karty fiszek */}

              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center my-3 mx-5"
                >
                  <TextField
                    className="flex-1 mr-2"
                    id={`term-${index}`}
                    label="Pojęcie"
                    variant="standard"
                    value={card.front}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleTermChange(event, index);
                    }}
                  />

                  <TextField
                    className="flex-1 ml-2"
                    id={`definition-${index}`}
                    label="Definicja"
                    variant="standard"
                    value={card.back}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleDefinitionChange(event, index);
                    }}
                  />

                  {/*Przycisk usuwanie karty*/}
                  <IconButton
                    onClick={() => handleDeleteCardClick(index)}
                    disabled={cards.length < 2}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}

              {/* Przycisk dodawania kart */}
              <div className="flex justify-center mt-5 mr-10">
                <IconButton
                  onClick={() => {
                    handleAddCard();
                  }}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </Box>
          </div>
        </>
      )}
    </>
  );
}
