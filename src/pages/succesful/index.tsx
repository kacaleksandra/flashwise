import success from "../../lotties/success.json";
import { AnimationPage } from "../../components/animationPage";
import GetToken from "@/functions/GetToken";

export default function Succesful() {
  const token = GetToken();
  return (
    <>
      <AnimationPage
        descr="Wszystko poszło pomyślnie! Jesteś już zalogowany."
        animation={success}
      />
    </>
  );
}
