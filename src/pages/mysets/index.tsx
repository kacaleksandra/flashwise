import Breadcrumb from "../../components/breadcrumb";
import Link from "next/link";
import { NoSets } from "@/components/nosets";

export default function MySets() {
  const sets: string[] = [];
  return (
    <>
      <div>
        <Breadcrumb name="Moje zestawy" />
      </div>
      {sets.length === 0 ? (
        <NoSets />
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
