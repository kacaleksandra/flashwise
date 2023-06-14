import success from "../../lotties/success.json";
import { AnimationPage } from "../../components/animationPage";

export default function Succesful() {
  return (
    <>
      <AnimationPage
        descr="Pomyślnie zarejestrowano! Jesteś już zalogowany."
        animation={success}
      />
    </>
  );
}
