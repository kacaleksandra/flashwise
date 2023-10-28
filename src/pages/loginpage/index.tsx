import Link from "next/link";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import CoreInput from "@/components/Core/Input";
import CoreLabel from "@/components/Core/Label";
import ITokenResponse from "@/interfaces/TokenResponse";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "@/store/useTokenStore";
import { API_URL } from "@constants";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("To pole jest wymagane"),
  password: Yup.string().required("To pole jest wymagane"),
});

async function LoginUser(username: string, password: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as ITokenResponse;

    if (!response.ok) {
      throw new Error("Incorrect login or password");
    }
    return data.key;
  } catch (error) {
    throw new Error("LoginUser error");
  }
}

export default function Login() {
  const { setToken } = useTokenStore();
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  return (
    <>
      <section className="bg-gradient-to-b from-gray-100 to-white py-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="bg-white rounded-lg shadow sm:m-3 sm:p-3 md:m-10 md:p-10 md:w-1/2 sm:w-full">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-9">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl">
                Zaloguj się
              </h1>
              {isError && (
                <div className="text-red-600">
                  Wystąpił błąd w czasie logowania lub dane są niepoprawne.
                </div>
              )}
              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    const { username, password } = values;
                    const token = await LoginUser(username, password);
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
                      <CoreLabel htmlFor="email">e-mail</CoreLabel>
                      <CoreInput
                        type="username"
                        name="username"
                        id="username"
                        placeholder="login"
                      />
                      <ErrorMessage
                        component="span"
                        name="username"
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
                      Zaloguj się
                    </button>
                    <p className="text-sm font-light text-gray-500">
                      Nie masz jeszcze konta?{" "}
                      <Link
                        href={"/registerpage"}
                        className="font-medium text-blue-500 hover:underline "
                      >
                        Załóż konto
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
