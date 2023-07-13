import Breadcrumb from "@/components/Breadcrumb";
import fetchSearch from "@/composables/fetchSearch";
import { useEffect, useState } from "react";
import useToken from "@/composables/useToken";
import ISet from "@/interfaces/Set";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { AnimationPage } from "@/components/AnimationPage";
import nothing from "../../lotties/nothing.json";
import Link from "next/link";

export default function Search() {
  const token = useToken();
  const [sets, setSets] = useState<ISet[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <div>
        <Breadcrumb name="Szukaj" />
        <div className="flex justify-center w-full">
          <TextField
            className="w-1/2"
            id="search"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value);
            }}
          />
          <Button
            disabled={searchText === ""}
            variant="contained"
            className="bg-blue-500 mx-2"
            endIcon={<SearchIcon />}
            onClick={() => {
              setIsLoading(true);
              fetchSearch(token, searchText).then((data: ISet[]) => {
                setSets(data);
                setIsLoading(false);
              });
            }}
          >
            Szukaj
          </Button>
        </div>
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
