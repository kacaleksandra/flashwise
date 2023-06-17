import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DefaultLayout } from "@/components/layouts/default";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
// Importujemy hook useMysetsStore.
import { useEffect } from "react";
import { useTokenStore } from "@/store/useTokenStore";
// Dodajemy import dla hooka useMysets Store.
import { useMySetsStore } from "@/store/useMySetsStore";
import ISet from "@/interfaces/Set";

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  const { setToken } = useTokenStore();
  const { setMySets } = useMySetsStore();

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    const sets = localStorage.getItem("mySets");
    if (token !== undefined && token !== null) setToken(token);
    if (sets !== undefined && sets !== null) {
      const setsTemp = JSON.parse(sets);
      const parsedSet: ISet[] = setsTemp.map((item: ISet) => ({
        id: item.id,
        name: item.name,
        category: item.category,
      }));
      setMySets(setsTemp);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ThemeProvider>
  );
}
