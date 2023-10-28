import Link from "next/link";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import CoreInput from "@/components/Core/Input";
import CoreLabel from "@/components/Core/Label";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "@/store/useTokenStore";
import ITokenResponse from "@/interfaces/TokenResponse";
import { API_URL } from "@/constants";

// schemat walidacji
const validationSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, "Za krótki login")
    .required("To pole jest wymagane"),
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

// rejestracja (fetch)

async function RegisterUser(
  username: string,
  email: string,
  password1: string,
  password2: string
): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password1, password2 }),
    });

    const data = (await response.json()) as ITokenResponse;

    if (!response.ok) {
      throw new Error("UserExists error");
    }
    return data.key;
  } catch (error) {
    throw new Error("RegisterUser error");
  }
}

export default function Register() {
  const { setToken } = useTokenStore();
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  return (
    <>
      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className=" bg-white rounded-lg shadow sm:m-3 sm:p-3 md:m-10 md:p-10 md:w-1/2">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-9">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl">
                Zarejestruj się!
              </h1>
              {isError && (
                <div className="text-red-600">
                  Wystąpił błąd w czasie rejestracji lub użytkownik z daną
                  nazwą/mailem już istnieje.
                </div>
              )}
              <Formik
                initialValues={{
                  login: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    const { login, email, password, confirmPassword } = values;
                    const token = await RegisterUser(
                      login,
                      email,
                      password,
                      confirmPassword
                    );
                    setToken(token);
                    localStorage.setItem("myToken", token);
                    router.push("/succesful");
                  } catch (error) {
                    setIsError(true);
                  }
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <div>
                      <CoreLabel htmlFor="login">Login</CoreLabel>
                      <CoreInput
                        type="login"
                        name="login"
                        id="login"
                        placeholder="username"
                      />
                      <ErrorMessage
                        component="span"
                        name="login"
                        className="text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <CoreLabel htmlFor="email">E-mail</CoreLabel>
                      <CoreInput
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                      />
                      <ErrorMessage
                        component="span"
                        name="email"
                        className="text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <CoreLabel htmlFor="password">Hasło</CoreLabel>
                      <CoreInput
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                      />
                      <ErrorMessage
                        component="span"
                        name="password"
                        className="text-sm text-red-600"
                      />
                    </div>
                    <div>
                      <CoreLabel htmlFor="confirmPassword">
                        Powtórz hasło
                      </CoreLabel>

                      <CoreInput
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        placeholder="••••••••"
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
