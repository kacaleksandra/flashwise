import { useTokenStore } from "@/store/useTokenStore";

export default function GetToken() {
  return useTokenStore((state) => state.token);
}
