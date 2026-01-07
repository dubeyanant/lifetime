"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/app/actions/auth";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF7] p-4 text-[#1F2933]">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-medium tracking-tight">
            Lifetime
          </h1>
          <p className="mt-2 text-[#6B7280]">Start your archive</p>
        </div>

        <form action={action} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative block w-full rounded border-0 bg-white py-2 px-3 text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B45309]"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded border-0 bg-white py-2 px-3 text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B45309]"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="display_name" className="sr-only">
                Display Name (Optional)
              </label>
              <input
                id="display_name"
                name="display_name"
                type="text"
                className="relative block w-full rounded border-0 bg-white py-2 px-3 text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B45309]"
                placeholder="Display Name (Optional)"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded border-0 bg-white py-2 px-3 text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B45309]"
                placeholder="Password"
              />
            </div>
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 text-center">{state.error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded bg-[#1F2933] py-2 px-4 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:ring-offset-2 disabled:opacity-50"
            >
              {isPending ? "Creating account..." : "create account"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#B45309] hover:text-[#B45309]/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
