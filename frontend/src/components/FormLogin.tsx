"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response.error) {
      setError("Invalid credentials");
      setIsLoading(false);

      return;
    }

    redirect("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full space-y-6 sm:max-w-sm"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-neutral-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-900 
                  outline-1 -outline-offset-1 outline-neutral-300 placeholder:text-neutral-400 
                  focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-neutral-900"
          >
            Password
          </label>
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-900 
                  outline-1 -outline-offset-1 outline-neutral-300 placeholder:text-neutral-400 
                  focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 
                font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed
                disabled:bg-green-500 h-9 transition-colors duration-150 ease-linear cursor-pointer"
        >
          {isLoading ? <div className="loader-btn"></div> : "Sign in"}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
