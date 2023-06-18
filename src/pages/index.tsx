import Lottie from "lottie-react";
import flashcard from "../lotties/flashcard-animation.json";
import { useLottie } from "lottie-react";
import register from "../lotties/register.json";
import Grid from "@mui/material/Grid"; // Grid version 1

import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Card from "../components/card/Card";
import Button from "@mui/material/Button";
import Link from "next/link";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const style = {};

export default function Home() {
  //lottie options
  const options = {
    animationData: register,
    loop: true,
    autoplay: true,
  };
  const reg = useLottie(options, style);
  reg.setSpeed(0.4);
  //end of lottie options
  return (
    <ThemeProvider theme={theme}>
      <Box
        className="flex justify-around flex-col"
        sx={{ alignItems: "center" }}
      >
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginX={5}
          marginBottom={3}
          width={"100%"}
        >
          <Grid item xs={10} sm={7} md={5} lg={4}>
            <Lottie
              animationData={flashcard}
              loop={true}
              className="h-[400px]"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            lg={5}
            className="mr-1"
            display="flex"
            flexDirection="column"
          >
            <Typography
              variant="h3"
              color={grey[900]}
              className="font-light text-center"
            >
              Ucz się{" "}
              <span className="font-medium  text-blue-500 text-center">
                szybciej
              </span>
              .
            </Typography>
            <Typography
              variant="h3"
              color={grey[900]}
              className="font-light text-center"
            >
              Zapamiętuj{" "}
              <span className="font-medium text-blue-500">więcej</span>.
            </Typography>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="w-screen"
        >
          <Paper className="mx-3 py-3 justify-center text-center bg-blue-50">
            <Typography
              color={grey[900]}
              variant="h3"
              className="mt-7 font-light"
            >
              Co studenci mówią o Flashwise?
              <Grid container spacing={5} justifyContent="center" marginY={1}>
                <Grid
                  item
                  sm={11}
                  md={3}
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Card
                    imgName="/images/student2.jpg"
                    studentName="Juanna Kohuuyik"
                    alternativeText="The first student"
                    opinion="Flashwise to świetna aplikacja do tworzenia fiszek i porządkowania ich w zestawach kategoriami. Przydatne narzędzie do skutecznej nauki, polecam każdemu!"
                  ></Card>
                </Grid>
                <Grid
                  item
                  sm={11}
                  md={3}
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Card
                    imgName="/images/student1.jpg"
                    studentName="Kshung Jun"
                    alternativeText="The first student"
                    opinion="Jest to moja ulubiona aplikacja do tworzenia fiszek i szybkiego przeglądania zestawów kategoriami. Łatwy sposób na organizację materiałów edukacyjnych!"
                  ></Card>
                </Grid>
                <Grid
                  item
                  sm={11}
                  md={3}
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Card
                    imgName="/images/student3.jpg"
                    studentName="Anna Korek"
                    alternativeText="The first student"
                    opinion="Korzystam już od dawna z sposobu nauki fiszkami, natomiast ta aplikacja ta strona to zupełny game-changer! Wreszcie nie muszę się martwić o to, że zgubię kartki z fiszkami."
                  ></Card>
                </Grid>
              </Grid>
            </Typography>
          </Paper>
        </Box>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginX={5}
          width={"100%"}
        >
          <Grid
            item
            xs={10}
            sm={5}
            md={4}
            lg={3}
            className="mr-1"
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography
              variant="h4"
              marginY={3}
              color={grey[900]}
              textAlign={"center"}
            >
              Dołącz do świata nowoczesnych fiszek!
            </Typography>

            <Button
              component={Link}
              href={"/registerpage"}
              variant="contained"
              className="bg-blue-500"
            >
              Dołączam!
            </Button>
          </Grid>
          <Grid item xs={8} sm={6} md={4} lg={4} xl={3}>
            {reg.View}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
