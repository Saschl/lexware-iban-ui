"use server";

export type IbanMessage = {
  message: string;
  status: string;
  payload: {
    iban: string;
  };
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
): Promise<IbanMessage> {
  const iban = formData.get("iban") as string;

  const sanitizedIban = iban.replace(/[^a-zA-Z0-9]/g, "");

  try {
    const response = await fetch(
      `${process.env.API_URL}/bank?iban=${sanitizedIban}`
    );
    if (!response.ok) {
      return handleErrorResponse(response, iban);
    }
    const data = await response.json() as BankData;
    console.log(data);

    if(data.valid) {
      return { message: `Bank name: ${data.bankData.name}`, status: "SUCCESS",  payload: { iban } };
    }
    return {
      message: `IBAN failed validation. Please check and submit again.`,
      status: "VALIDATION_FAILED",
      payload: { iban }
    };
    
  } catch (e) {
    console.log(e);
    return { message: `Could not reach backend`, status: "ERROR",  payload: { iban } };
  }
}

function handleErrorResponse(response: Response, iban: string): IbanMessage {
  if (response.status.toString().startsWith("5")) {
    return {
      message: `There was an issue with the server. Please try again later.`,
      status: "ERROR",
      payload: { iban }
    };
  }
  return {
    message: `IBAN failed validation. Please check and submit again.`,
    status: "VALIDATION_FAILED",
    payload: { iban }
  };
}
