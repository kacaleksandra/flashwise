import success from "../../lotties/success.json";
import { AnimationPage } from "../../components/animationPage";
import { useTokenStore } from "@/store/useTokenStore";

export default function Succesful() {
  const token = useTokenStore((state) => state.token);
  return (
    <>
      <AnimationPage
        descr="Pomyślnie zarejestrowano! Jesteś już zalogowany."
        animation={success}
      />
    </>
  );
}
