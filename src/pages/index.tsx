import Lottie from "lottie-react";
import animationData from "../lotties/flashcard-animation.json";
import Grid from "@mui/material/Grid"; // Grid version 1

import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
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
        >
          <Grid item xs={10} sm={7} md={5} lg={4}>
            <Lottie animationData={animationData} loop={true} />
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} className="mr-1">
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
        <Paper>
          <Typography variant="h4">Co studenci mówią o Flashwise?</Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
