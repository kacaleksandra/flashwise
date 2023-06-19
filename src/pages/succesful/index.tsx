import success from "../../lotties/success.json";
import { AnimationPage } from "../../components/AnimationPage";
import useToken from "@/composables/useToken";

export default function Succesful() {
  const token = useToken();
  return (
    <>
      <AnimationPage
        descr="Wszystko poszło pomyślnie! Jesteś już zalogowany."
        animation={success}
      />
    </>
  );
}
