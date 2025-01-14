"use server";

export async function fetchBankNameFromIban(
  _prevState: {
    message: string;
    status: string;
  },
  formData: FormData
) {
  const iban = formData.get("iban") as string;

  const sanitizedIban = iban.replace(/[^a-zA-Z0-9]/g, "");

  try {
    console.log("CAlling API with " + sanitizedIban);
    const response = await fetch(
      `${process.env.API_URL}/bank?iban=${sanitizedIban}`
    );
    if (!response.ok) {
      handleErrorResponse(response);
    }
    const data = await response.json();
    console.log(data);
    return { message: `Bank name: ${data.bankData.name}`, status: "SUCCESS" };
  } catch (e) {
    console.log(e);
    return { message: `Could not reach backend`, status: "ERROR" };
  }
}

function handleErrorResponse(response: Response) {
  if (response.status.toString().startsWith("5")) {
    return {
      message: `There was an issue with the server. Please try again later.`,
      status: "ERROR",
    };
  }
  return {
    message: `IBAN failed validation. Please check and submit again.`,
    status: "VALIDATION_FAILED",
  };
}
