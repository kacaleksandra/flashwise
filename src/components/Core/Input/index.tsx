import { Field, FieldAttributes } from "formik";

export default function CoreInput(props: FieldAttributes<any>) {
  return (
    <>
      <Field
        {...props}
        className="rounded-lg block w-full p-2.5 text-gray-900 border-gray-300 border bg-gray-50 sm:text-sm"
      />
    </>
  );
}
