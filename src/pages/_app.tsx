import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DefaultLayout } from "@/components/layouts/default";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect } from "react";
import { useTokenStore } from "@/store/useTokenStore";

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  const { setToken } = useTokenStore();
  useEffect(() => {
    const token = localStorage.getItem("myToken");
    if (token !== undefined && token !== null) setToken(token);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ThemeProvider>
  );
}
