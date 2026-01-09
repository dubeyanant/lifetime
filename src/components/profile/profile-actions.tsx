"use client";

import { clsx } from "clsx";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteAccount, updateProfile } from "@/app/actions/profile";
import type { User } from "@/types";

interface ProfileActionsProps {
  user: User;
}

const initialState: { error?: string; success?: string } = {
  error: "",
  success: "",
};

export function ProfileActions({ user }: ProfileActionsProps) {
  const [updateState, updateAction, isUpdating] = useActionState(
    updateProfile,
    initialState,
  );

  // Show toasts based on state
  useEffect(() => {
    if (updateState?.error) {
      toast.error(updateState.error);
    }
    if (updateState?.success) {
      toast.success(updateState.success);
    }
  }, [updateState]);

  return (
    <div className="space-y-12">
      {/* Profile Settings */}
      <section className="space-y-6">
        <h2 className="font-serif text-xl text-[#1F2933]">Profile Settings</h2>

        <form action={updateAction} className="max-w-md space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="display_name"
              className="block text-sm font-medium text-[#6B7280]"
            >
              Display Name
            </label>
            <input
              type="text"
              name="display_name"
              id="display_name"
              defaultValue={user.display_name || user.username}
              className="w-full rounded-md border-gray-200 bg-white px-3 py-2 text-[#1F2933] focus:border-[#B45309] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="account_visibility"
              className="block text-sm font-medium text-[#6B7280]"
            >
              Account Visibility
            </label>
            <div className="relative">
              <select
                name="account_visibility"
                id="account_visibility"
                defaultValue={user.account_visibility ?? 1}
                className="w-full appearance-none rounded-md border-gray-200 bg-white px-3 py-2 text-[#1F2933] focus:border-[#B45309] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
              >
                <option value="0">Private (Only you)</option>
                <option value="1">Public (Anyone with link)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B7280]">
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">
              Control who can see your lifetime timeline.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className={clsx(
                "rounded-md bg-[#1F2933] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-50",
                isUpdating && "cursor-not-allowed",
              )}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Security */}
      <section className="space-y-6 pt-6 border-t border-gray-100">
        <h2 className="font-serif text-xl text-[#1F2933]">Security</h2>

        <form action={updateAction} className="max-w-md space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="current_password"
              className="block text-sm font-medium text-[#6B7280]"
            >
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              id="current_password"
              placeholder="Required to change password"
              className="w-full rounded-md border-gray-200 bg-white px-3 py-2 text-[#1F2933] focus:border-[#B45309] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#6B7280]"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full rounded-md border-gray-200 bg-white px-3 py-2 text-[#1F2933] focus:border-[#B45309] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className={clsx(
                "rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#1F2933] transition-colors hover:bg-gray-50 disabled:opacity-50",
                isUpdating && "cursor-not-allowed",
              )}
            >
              Update Password
            </button>
          </div>
        </form>
      </section>

      {/* Danger Zone */}
      <section className="space-y-6 pt-6 border-t border-gray-100">
        <h2 className="font-serif text-xl text-[#DC2626]">Danger Zone</h2>
        <div className="max-w-md space-y-4">
          <p className="text-sm text-[#6B7280]">
            Permanently delete your account and all associated events. This
            action cannot be undone.
          </p>
          <form
            action={() => {
              deleteAccount();
            }}
          >
            <button
              type="submit"
              className="rounded-md bg-white border border-[#DC2626] px-4 py-2 text-sm font-medium text-[#DC2626] transition-colors hover:bg-red-50"
              onClick={(e) => {
                if (
                  !confirm(
                    "Are you absolutely sure? This will delete all your data forever.",
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              Delete Account
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
