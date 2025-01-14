"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { fetchBankNameFromIban } from "./actions";

function IbanForm() {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        type="text"
        id="iban"
        name="iban"
        required
        placeholder="Enter IBAN"
        className="border border-solid border-black/[.08] rounded-md px-4 py-2 w-60"
        disabled={pending}
      />
      <button
        type="submit"
        className="border border-solid border-black/[.08] rounded-md px-4 py-2 w-30 bg-white hover:bg-gray-200"
        disabled={pending}
      >
        <p>{pending ? `Validating...` : "Validate"}</p>
      </button>
    </>
  );
}

const initialState = {
  message: "",
  status: "",
};

export default function Home() {
  const [state, formAction] = useActionState(
    fetchBankNameFromIban,
    initialState
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <form
            action={formAction}
            className="flex gap-2 items-center flex-col sm:flex-row"
          >
            <IbanForm />
          </form>
        </div>
        {state?.status === "SUCCESS" && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Success!</span> {state?.message}
          </div>
        )}
        {(state.status === "ERROR" || state.status === "VALIDATION_FAILED") && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error!</span> {state?.message}
          </div>
        )}
      </main>
    </div>
  );
}
