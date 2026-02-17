import { baseApi } from "./baseApi";
import type { QuotationPayload } from "@/types/quotation";

export const quotesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuote: builder.mutation<any, QuotationPayload>({
      query: (body) => ({
        url: "/quote",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateQuoteMutation } = quotesApi;
