import "../../styles/global.css";

export const LoginPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Login</h2>
      <form>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label htmlFor="email" className="block text-sm/6 font-medium">
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md pl-3 border border-blue-500">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium"
                >
                  Password
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md pl-3 border border-blue-500">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="password"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
