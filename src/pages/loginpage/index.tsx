import Link from "next/link";

export default function MyProfile() {
  return (
    <>
      <section className="bg-gradient-to-b from-gray-100 to-white py-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="bg-white rounded-lg shadow sm:m-3 sm:p-3 md:m-10 md:p-10 md:w-1/2 sm:w-full">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-9">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl">
                Zaloguj się
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    e-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Hasło
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign in
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
