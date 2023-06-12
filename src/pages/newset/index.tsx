import { useState } from "react";
import { Typography, IconButton, Button } from "@mui/material";
import Breadcrumb from "../../components/breadcrumb";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";

interface Card {
  term: string;
  definition: string;
}

export default function NewSet() {
  const [cards, setCards] = useState<Card[]>([{ term: "", definition: "" }]);

  const handleAddCard = () => {
    setCards([...cards, { term: "", definition: "" }]);
  };

  const handleTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCards = [...cards];
    newCards[index].term = event.target.value;
    setCards(newCards);
  };

  const handleDefinitionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let updatedList = [...cards];
    updatedList[index].definition = event.target.value;
    setCards(updatedList);
  };

  const handleDeleteCardClick = (index: number) => {
    let updatedList = [...cards];
    if (updatedList.length === 1) return;
    updatedList.splice(index, 1);
    setCards(updatedList);
  };

  return (
    <>
      <div>
        <Breadcrumb name="Nowy zestaw" />
      </div>
      <div className="mx-8 my-3">
        <Typography variant="h4" className="px-5 text-gray-900">
          Stwórz nowy zestaw
        </Typography>

        {/* Nazwa zestawu */}
        <div className="flex justify-between">
          <TextField
            className="w-1/2 mx-5 my-3"
            id="set-name"
            label="Nazwa zestawu"
            variant="standard"
          />
          {/*Przycisk Stwórz zestaw*/}
          <Button
            variant="contained"
            className="bg-blue-500 my-5 mr-10"
            size="large"
          >
            Stwórz zestaw
          </Button>
        </div>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* Karty fiszek */}
          {cards.map((card: Card, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center my-3 mx-5"
            >
              <TextField
                className="flex-1 mr-2"
                id={`term-${index}`}
                label="Pojęcie"
                variant="standard"
                value={card.term}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleTermChange(event, index);
                }}
              />

              <TextField
                className="flex-1 ml=2"
                id={`definition-${index}`}
                label="Definicja"
                variant="standard"
                value={card.definition}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleDefinitionChange(event, index);
                }}
              />

              {/* Przycisk usuwanie karty */}

              <IconButton onClick={() => handleDeleteCardClick(index)}>
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
  );
}
