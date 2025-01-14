"use server";

export type IbanMessage = {
  message: string;
  status: string;
};

export type BankData = {  
  valid: boolean;
  bankData: {
    name: string;
  };
};

export async function fetchBankNameFromIban(
  _prevState: IbanMessage,
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
      return handleErrorResponse(response);
    }
    const data = await response.json() as BankData;
    console.log(data);

    if(data.valid) {
      return { message: `Bank name: ${data.bankData.name}`, status: "SUCCESS" };
    }
    return {
      message: `IBAN failed validation. Please check and submit again.`,
      status: "VALIDATION_FAILED",
    };
    
  } catch (e) {
    console.log(e);
    return { message: `Could not reach backend`, status: "ERROR" };
  }
}

function handleErrorResponse(response: Response): IbanMessage {
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
