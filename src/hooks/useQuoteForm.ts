"use client";

import { useForm } from "react-hook-form";
import { FormValues } from "@/types/form";
import { QuotationPayload } from "@/types/quotation";
import {
    useGetUserGendersQuery,
    useGetBrandsQuery,
    useGetVehicleTypesQuery,
    useGetModelsByBrandAndTypeQuery,
    useGetYearsByModelQuery,
    useGetVersionsByModelAndYearQuery,
} from "@/store/api/catalogsApi";
import { useCreateQuoteMutation } from "@/store/api/quotesApi";
import { CatalogItem } from "@/types/catalog";

export function useQuoteForm() {
    
    const form = useForm<FormValues>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            firstName: "",
            paternalLastName: "",
            maternalLastName: "",
            postalCode: "",
            email: "",
            birthDate: "",
            gender: "",
            brand: "",
            vehicleType: "",
            model: "",
            year: "",
            vehicleVersionCode: "",
            phone: "",
        },
        criteriaMode: "all",
        shouldFocusError: true,
        shouldUnregister: false,
    });
  
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
    } = form;
  
    const [createQuote, { isLoading }] = useCreateQuoteMutation();

    const brand = watch("brand");
    const vehicleType = watch("vehicleType");
    const model = watch("model");
    const year = watch("year");
  
    const { data: gendersResponse, isLoading: gendersLoading } =
    useGetUserGendersQuery();

    const { data: brandsResponse, isLoading: brandsLoading } =
        useGetBrandsQuery({ page: 1, pageSize: 60 });

    const { data: vehicleTypesResponse, isLoading: typesLoading } =
        useGetVehicleTypesQuery();

    const { data: modelsResponse, isLoading: modelsLoading } =
        useGetModelsByBrandAndTypeQuery(
        { brandCode: brand, vehicleTypeCode: vehicleType },
        { skip: !brand || !vehicleType }
        );

    const { data: yearsResponse, isLoading: yearsLoading } =
        useGetYearsByModelQuery(model, {
        skip: !model,
        });

    const { data: versionsResponse, isLoading: versionsLoading } =
        useGetVersionsByModelAndYearQuery(
        { modelCode: model, year: Number(year) },
        { skip: !model || !year }
        );

    const normalizeArray = <T>(response: any): T[] =>
        Array.isArray(response?.data) ? response.data : [];

    const genders: CatalogItem[] = normalizeArray<CatalogItem>(gendersResponse);
    const brands: CatalogItem[] = normalizeArray<CatalogItem>(brandsResponse);
    const vehicleTypes: CatalogItem[] = normalizeArray<CatalogItem>(vehicleTypesResponse);
    const models: CatalogItem[] = normalizeArray<CatalogItem>(modelsResponse);
    const versions: CatalogItem[] = normalizeArray<CatalogItem>(versionsResponse);

    const years: number[] =
        Array.isArray(yearsResponse?.data) ? yearsResponse.data : [];

    const formatDateToISO = (date: string) => {
        const [day, month, year] = date.split("/");

        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };


    const onSubmit = async (data: FormValues) => {
        const payload = {
            user: {
                firstName: data.firstName,
                paternalLastName: data.paternalLastName,
                maternalLastName: data.maternalLastName,
                postalCode: data.postalCode,
                email: data.email,
                userGenderCode: data.gender,
                birthday: formatDateToISO(data.birthDate),
            },
            vehicleVersionCode: data.vehicleVersionCode,
        };

        return createQuote(payload).unwrap();
    };
  
    return {
        form,
        register,
        handleSubmit,
        setValue,
        isLoading,
        trigger,
        genders,
        gendersLoading,
        brands,
        brandsLoading,
        vehicleTypes,
        typesLoading,
        models,
        modelsLoading,
        years,
        yearsLoading,
        versions,
        versionsLoading,
        brand,
        vehicleType,
        model,
        year,
        onSubmit,
    };
}
