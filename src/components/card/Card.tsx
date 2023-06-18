import Image from "next/image";
import { IImgDescr } from "@/interfaces/ImgDescr";

export default function Card({
  imgName,
  studentName,
  alternativeText,
  opinion,
}: IImgDescr) {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <Image
          className="w-full"
          src={imgName}
          alt={alternativeText}
          width="660"
          height="590"
        ></Image>
        <div className="px-6 py-4 ">
          <div className="font-bold text-xl mb-2">{studentName}</div>
          <p className="text-gray-700 text-base">{opinion}</p>
        </div>
      </div>
    </>
  );
}
