import Breadcrumb from "../../components/breadcrumb";
import Link from "next/link";
import { AnimationPage } from "@/components/animationPage";
import nothing from "../../lotties/nothing.json";

export default function MySets() {
  const sets: string[] = [];
  return (
    <>
      <div>
        <Breadcrumb name="Moje zestawy" />
      </div>
      {sets.length === 0 ? (
        <AnimationPage descr="Nic tu nie ma..." animation={nothing} />
      ) : (
        <div className="sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sets.map((value, valueIndex) => (
            <div
              key={valueIndex}
              className="p-7 m-6 bg-blue-500 text-white text-center shadow-xl rounded-md flex items-center justify-center"
            >
              <Link href="/">{value}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
