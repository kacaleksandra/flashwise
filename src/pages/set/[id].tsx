import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import IFlashcard from "@/interfaces/Flashcard";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as st from "@/pages/set/StyledTable";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useMySetsStore } from "@/store/useMySetsStore";
import { useRouter } from "next/router";
import ISet from "@/interfaces/Set";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import getRouteParameter from "@/functions/GetRouteParameter";

export default function Set() {
  const token = useTokenStore((state) => state.token);
  const mySets = useMySetsStore((state) => state.sets);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id, setID] = useState<string>(getRouteParameter());

  async function getSet(): Promise<ISet> {
    const id = getRouteParameter();
    setID(id);

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
      setSetName(set.name);

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

      setFlashcards(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [setName, setSetName] = useState<string>("");

  useEffect(() => {
    fetchFlashcards();
  }, []);

  // tworzenie tabeli

  const headers = ["Przód fiszki", "Tył fiszki"];

  function createData(front: string, back: string) {
    return { front, back };
  }

  const rows = flashcards.map((flashcard) =>
    createData(flashcard.front, flashcard.back)
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {isLoading && token !== "" ? (
        <div className="flex justify-center items-center">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div>
          <div className="px-5 py-3 mt-3 w-full flex justify-around">
            <div>
              <Typography variant="h4" className="text-blue-500">
                {setName}
              </Typography>
            </div>
            <Button
              variant="contained"
              className="bg-blue-500 text-white"
              component={Link}
              href={`/learnSet/${id}`}
            >
              Przejdź do nauki
            </Button>
            <Button
              variant="contained"
              className="bg-blue-500 text-white"
              component={Link}
              href={`/quiz/${id}`}
            >
              Wygeneruj quiz
            </Button>
            {mySets.find((set) => set.name === setName) !== undefined ? (
              <Button
                variant="contained"
                className="bg-blue-500 text-white"
                component={Link}
                href={`/editpage/${id}`}
              >
                Edytuj
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-center my-5">
            <TableContainer component={Paper} className="w-11/12">
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow className="bg-blue-50">
                    <TableCell align="center">Przód fiszki</TableCell>
                    <TableCell align="center">Tył fiszki</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow key={row.front}>
                      <TableCell scope="row" align="center">
                        {row.front}
                      </TableCell>
                      <TableCell align="center">{row.back}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "Wierszy na stronę",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={st.TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>{" "}
        </div>
      )}
    </>
  );
}
