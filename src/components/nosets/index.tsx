import Lottie from "lottie-react";
import nothing from "../../lotties/nothing.json";
import { Typography } from "@mui/material";

export function NoSets() {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <Lottie animationData={nothing} loop={true} />
        </div>
        <div>
          <Typography variant="h5">Nic tu nie ma...</Typography>
        </div>
      </div>
    </>
  );
}
