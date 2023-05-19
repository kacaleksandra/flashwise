import TopBar from "../../topBar";

interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: IDefaultLayoutProps) {
  return (
    <>
      <TopBar />
      <div className="flex-grow">{children}</div>
    </>
  );
}
