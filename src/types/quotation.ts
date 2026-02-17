export interface QuotationPayload {
  user: {
    firstName: string;
    paternalLastName: string;
    maternalLastName: string;
    postalCode: string;
    email: string;
    phone?: string;
    userGenderCode: string;
    birthday: string;
  };
  vehicleVersionCode: string;
}
