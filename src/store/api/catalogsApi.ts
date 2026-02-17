import { baseApi } from "./baseApi";

export const catalogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserGenders: builder.query<any, void>({
      query: () => "/user-genders",
    }),

    getBrands: builder.query<any, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 60 }) =>
        `/vehicle-brands?sort=code&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
    }),

    getVehicleTypes: builder.query<any, void>({
      query: () => "/vehicle-types",
    }),

    getModelsByBrandAndType: builder.query<
      any,
      { brandCode: string; vehicleTypeCode: string }
    >({
      query: ({ brandCode, vehicleTypeCode }) =>
        `/vehicle-models?filters[vehicle_brand][code][$eq]=${brandCode}&filters[vehicle_type][code][$eq]=${vehicleTypeCode}`,
    }),

    getYearsByModel: builder.query<any, string>({
      query: (modelCode) =>
        `/vehicle-versions/years/distinct?filters[vehicle_model][code][$eq]=${modelCode}`,
    }),

    getVersionsByModelAndYear: builder.query<
      any,
      { modelCode: string; year: number }
    >({
      query: ({ modelCode, year }) =>
        `/vehicle-versions?filters[vehicle_model][code][$eq]=${modelCode}&filters[year][$eq]=${year}`,
    }),
  }),
});

export const {
  useGetUserGendersQuery,
  useGetBrandsQuery,
  useGetVehicleTypesQuery,
  useGetModelsByBrandAndTypeQuery,
  useGetYearsByModelQuery,
  useGetVersionsByModelAndYearQuery,
} = catalogsApi;
