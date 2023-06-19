import { useTokenStore } from "@/store/useTokenStore";

export default function useToken() {
  return useTokenStore((state) => state.token);
}
