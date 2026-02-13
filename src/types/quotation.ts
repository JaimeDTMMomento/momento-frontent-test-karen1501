export type QuotationUser = {
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  postalCode: string;
  email: string;
  phone?: string;
  birthday: string;
  userGenderCode: string;
};
export type QuotationPayload = {
  user: QuotationUser;
  vehicleVersionCode: string;
};

export namespace CreateQuote {
  export type SuccessResponse = {
    data: {
      id: number;
      documentId: string;
      createdAt: string;
    };
  };
  export type ErrorResponse = {
    data: null;
    error: {
      status: number;
      name: string;
      message: string;
      details:
        | {
            code?: "ALREADY_EXISTS";
          }
        | Array<{
            expected: string;
            code: string;
            path: string[];
            message: string;
          }>;
    };
  };
  export type Response = SuccessResponse | ErrorResponse;
}
