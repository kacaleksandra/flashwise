import Link from "next/link";

export default function BottomBar() {
  return (
    <>
      <footer className="bg-blue-500 rounded-lg shadow m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              Flashwise™
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white  sm:mt-0">
            <li>
              <Link href="/" className="mr-4 hover:underline md:mr-6 ">
                Strona główna
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
