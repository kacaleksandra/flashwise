import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import Custom404 from "@/pages/";
import { useRouter } from "next/router";
import useToken from "@/composables/useToken";

interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: IDefaultLayoutProps) {
  const token = useToken();
  const unprotectedPages = ["/", "/loginpage", "/registerpage"];
  const router = useRouter();
  const currentPath = router.pathname;

  // Sprawdzamy, czy użytkownik jest zalogowany i czy aktualna ścieżka znajduje się na liście stron bez wymaganej autoryzacji
  const isUnprotectedPage = unprotectedPages.includes(currentPath);
  const shouldRenderChildren =
    (token !== "" && !isUnprotectedPage) || (!token && isUnprotectedPage);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        {shouldRenderChildren ? (
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
