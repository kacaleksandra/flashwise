import TopBar from "../../topBar";
import BottomBar from "@/components/bottomBar/BottomBar";

interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: IDefaultLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <div className="flex-grow">{children}</div>
        <div className="mt-auto ">
          <BottomBar />
        </div>
      </div>
    </>
  );
}
