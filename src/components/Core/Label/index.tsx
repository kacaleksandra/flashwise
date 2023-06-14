import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

export default function CoreLabel(
  props: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
) {
  return (
    <label
      {...props}
      className="block mb-2 text-sm font-medium text-gray-900"
    />
  );
}
