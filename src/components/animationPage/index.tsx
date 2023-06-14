import Lottie from "lottie-react";
import { Typography } from "@mui/material";

interface AnimationPageProps {
  descr: string;
  animation: any;
}

export function AnimationPage({ descr, animation }: AnimationPageProps) {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <Lottie animationData={animation} loop={true} />
        </div>
        <div>
          <Typography variant="h5">{descr}</Typography>
        </div>
      </div>
    </>
  );
}
