type RequestOtpPayload = {
  fullName?: string;
  email: string;
  password: string;
};

type RequestOtpResponse = {
  otpExpiresAt: number;
};

type VerifyOtpPayload = {
  email: string;
  code: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function requestOtp(
  payload: RequestOtpPayload
): Promise<RequestOtpResponse> {
  await delay(700);

  if (!payload.email || !payload.password) {
    throw new Error("Missing required fields.");
  }

  return {
    otpExpiresAt: Date.now() + 1000 * 60 * 2,
  };
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<void> {
  await delay(700);

  if (!payload.email || payload.code.length !== 4) {
    throw new Error("Invalid OTP.");
  }
}
