import TopBar from "../../topBar";
import BottomBar from "@/components/bottomBar/BottomBar";
import { useTokenStore } from "@/store/useTokenStore";
import Custom404 from "@/pages/";
import { useRouter } from "next/router";

interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: IDefaultLayoutProps) {
  const token = useTokenStore((state) => state.token);
  const unprotectedPages = ["/", "/loginpage", "/registerpage"];
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        {token !== "" ? (
          <div className="flex-grow">{children}</div>
        ) : unprotectedPages.includes(currentPath) ? (
          <div className="flex-grow">{children}</div>
        ) : (
          <Custom404 />
        )}
        <div className="mt-auto ">
          <BottomBar />
        </div>
      </div>
    </>
  );
}
