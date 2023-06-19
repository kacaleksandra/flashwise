import { useTokenStore } from "@/store/useTokenStore";
import { useEffect } from "react";
import success from "../../lotties/success.json";
import { AnimationPage } from "../../components/AnimationPage";

export default function Logout() {
  const { setToken } = useTokenStore();
  useEffect(() => {
    setToken("");
    localStorage.removeItem("myToken");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimationPage descr="Pomyślnie wylogowano." animation={success} />
    </>
  );
}
