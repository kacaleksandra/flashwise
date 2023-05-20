import Lottie from "lottie-react";
import animationData from "../lotties/flashcard-animation.json";

export default function Home() {
  return (
    <div>
      <Lottie animationData={animationData} loop={false} />
    </div>
  );
}
