export interface CheckoutRequest {
  feeItemId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSession {
  redirectUrl: string;
  sessionId: string;
}

export interface PaymentsService {
  createCheckoutSession(
    request: CheckoutRequest,
  ): Promise<CheckoutSession>;
}

export class PaymentsNotConfiguredError extends Error {
  constructor() {
    super(
      "Payments are not configured. Connect an approved payment provider before accepting payments.",
    );
    this.name = "PaymentsNotConfiguredError";
  }
}

export const paymentsService: PaymentsService = {
  async createCheckoutSession() {
    throw new PaymentsNotConfiguredError();
  },
};
