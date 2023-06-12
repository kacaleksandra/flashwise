import Link from "next/link";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "src/styles/forms.module.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail")
    .required("To pole jest wymagane"),
  password: Yup.string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .required("To pole jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasła nie są takie same")
    .required("To pole jest wymagane"),
});

export default function Register() {
  return (
    <>
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className=" bg-white rounded-lg shadow sm:m-3 sm:p-3 md:m-10 md:p-10 md:w-1/2">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-9">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl">
                Zarejestruj się!
              </h1>
              <Formik
                initialValues={{ email: "", password: "", confirmPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label htmlFor="email" className={classes.labels}>
                        e-mail
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={classes.inputs}
                        placeholder="name@company.com"
                      />
                      <ErrorMessage
                        component="span"
                        name="email"
                        className="text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className={classes.labels}>
                        Hasło
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""
                        className={classes.inputs}
                      />
                      <ErrorMessage
                        component="span"
                        name="password"
                        className="text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className={classes.labels}
                      >
                        Powtórz hasło
                      </label>

                      <Field
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        placeholder=""
                        className={classes.inputs}
                      />
                      <ErrorMessage
                        component="span"
                        name="confirmPassword"
                        className="text-sm text-red-600"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={
                        Object.keys(errors).length > 0 ||
                        Object.keys(touched).length === 0
                      }
                      className={`w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        Object.keys(errors).length > 0 ||
                        Object.keys(touched).length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Załóż konto
                    </button>
                    <p className="text-sm font-light text-gray">
                      Masz już konto?{" "}
                      <Link
                        href={"/loginpage"}
                        className="font-medium text-blue-500 hover:underline "
                      >
                        Zaloguj się tutaj
                      </Link>
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
