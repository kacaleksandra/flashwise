import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { Tooltip } from "@mui/material";
import { Switch } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ICategory from "@/interfaces/Category";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import useToken from "@/composables/useToken";
import { API_URL } from "@/constants";

interface Card {
  front: string;
  back: string;
}

export default function NewSet() {
  const router = useRouter();
  const token = useToken();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<Card[]>([{ front: "", back: "" }]);
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
  const validateFormFieldsAreNotEmpty = (cards: Card[]) =>
    cards.every((card) => card.front.trim() !== "" && card.back.trim() !== "");

  //fetch kategorii
  const [categories, setCategories] = useState<ICategory[]>([]);
  async function fetchCategories(): Promise<number> {
    try {
      const response = await fetch(`${API_URL}/api/category`, {
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
    } finally {
      setIsLoading(false);
    }
  }

  //select kategorii
  // Stan dla kategorii
  const [categoryID, setCategoryID] = useState<number>(0);
  const handleSelectChange = (event: SelectChangeEvent) => {
    setCategoryID(parseInt(event.target.value));
  };

  // WYSYŁANIE DANYCH
  async function handleCreateSetClick(): Promise<void> {
    let setId: number = 0;
    try {
      setIsLoading(true);
      // Tworzenie zestawu
      const setResponse = await fetch(`${API_URL}/api/sets/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: setName,
          category: categoryID,
          is_public: isPublic,
        }),
      });
      setId = (await setResponse.json()).id;

      // Dodawanie fiszek
      await Promise.all(
        cards.map(async (card) => {
          return await fetch(`${API_URL}/api/flashcards/`, {
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
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      if (setId !== 0) {
        router.push(`/mysets`);
        return;
      }
      router.push(`/mysets`);
    }
  }

  useEffect(() => {
    fetchCategories().then((id) => setCategoryID(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              Stwórz nowy zestaw
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
                {!isFormValid() || cards.length < 4 ? (
                  <Tooltip
                    title="Nazwij zestaw i stwórz minimum cztery fiszki!"
                    followCursor
                  >
                    <div className="my-5 mr-10 flex flex-col">
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
                      <Button
                        disabled={!isFormValid() || cards.length < 4}
                        variant="contained"
                        size="large"
                        className={"bg-blue-500 "}
                      >
                        Stwórz zestaw
                      </Button>
                    </div>
                  </Tooltip>
                ) : (
                  <div className="my-5 mr-10 flex flex-col">
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
                    <Button
                      variant="contained"
                      size="large"
                      className={"bg-blue-500"}
                      onClick={() => handleCreateSetClick()}
                    >
                      Stwórz zestaw
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
