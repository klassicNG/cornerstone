"use client"; // This is a Client Component because it uses useFormState (interactivity)

import { useFormState } from "react-dom"; // Note: might be useActionState in React 19
import { authenticate } from "@/app/lib/actions";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="text-white text-3xl font-bold">Cornerstone</div>
        </div>

        {/* LOGIN FORM */}
        <form
          action={dispatch}
          className="space-y-3 bg-gray-50 px-6 pb-4 pt-8 border rounded-lg"
        >
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Please log in to continue.
          </h1>

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-grey-500 text-sm outline-2  placeholder:text-gray-500 text-gray-900"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>

          <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400">
            Log in
          </button>

          {/* Error Message Display */}
          <div className="flex h-8 items-end space-x-1">
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
