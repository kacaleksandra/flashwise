import TopBar from "../../topBar";
import BottomBar from "@/components/bottomBar/BottomBar";

interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: IDefaultLayoutProps) {
  return (
    <>
      <TopBar />
      <div className="flex-grow">{children}</div>
      <BottomBar />
    </>
  );
}
