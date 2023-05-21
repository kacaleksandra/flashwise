import Lottie from "lottie-react";
import animationData from "../lotties/flashcard-animation.json";
import Grid from "@mui/material/Grid"; // Grid version 1

import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Home() {
  return (
    <Box className="flex justify-around" sx={{ alignItems: "center" }}>
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginX={5}
      >
        <Grid item xs={5}>
          <Lottie animationData={animationData} loop={true} />
        </Grid>
        <Grid item xs={6} className="">
          <Typography variant="h4" color={grey[900]}>
            Ucz się szybciej.
          </Typography>
          <Typography variant="h4" color={grey[900]}>
            Zapamiętuj więcej.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
