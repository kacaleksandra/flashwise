import { useTokenStore } from "@/store/useTokenStore";
import { useEffect } from "react";
import success from "../../lotties/success.json";
import { AnimationPage } from "../../components/animationPage";

export default function Logout() {
  const { setToken } = useTokenStore();
  useEffect(() => {
    setToken("");
  }, []);

  return (
    <>
      <AnimationPage descr="Pomyślnie wylogowano." animation={success} />
    </>
  );
}
