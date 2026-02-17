import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { FormValues } from "@/types/form";
import FormField from "../form/FormField";
import Select from "../form/Select";
import { CatalogItem } from "@/types/catalog";

interface Props {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    setValue: UseFormSetValue<FormValues>;

    brands: CatalogItem[];
    brandsLoading: boolean;

    vehicleTypes: CatalogItem[];
    typesLoading: boolean;

    models: CatalogItem[];
    modelsLoading: boolean;

    years: number[];
    yearsLoading: boolean;

    versions: CatalogItem[];
    versionsLoading: boolean;

    brand: string;
    vehicleType: string;
    model: string;
    year: string;
}

export default function VehicleSection({
    register,
    errors,
    setValue,
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
}: Props) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[24px] font-bold leading-[1.2] text-black text-center">
                Datos Sobre tu coche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField error={errors.brand?.message} label="Marca">
                    <Select
                        disabled={brandsLoading}
                        {...register("brand", {
                            required: "Campo requerido",
                            onChange: () => {
                                setValue("vehicleType", "");
                                setValue("model", "");
                                setValue("year", "");
                                setValue("vehicleVersionCode", "");
                            },
                        })}
                    >
                        <option value="">Selecciona</option>
                        {brands.map((b) => (
                            <option key={b.id} value={b.code}>
                                {b.publicName}
                            </option>
                        ))}
                    </Select>
                </FormField>
                
                <FormField error={errors.vehicleType?.message} label="Tipo de vehículo">
                    <Select
                        disabled={!brand || typesLoading}
                        {...register("vehicleType", {
                        required: "Campo requerido",
                        onChange: () => {
                            setValue("model", "");
                            setValue("year", "");
                            setValue("vehicleVersionCode", "");
                        },
                        })}
                    >
                        <option value="">Selecciona</option>

                        {vehicleTypes.map((t) => (
                        <option key={t.id} value={t.code}>
                            {t.publicName}
                        </option>
                        ))}
                    </Select>
                </FormField>

                <FormField error={errors.model?.message} label="Modelo" className="md:col-span-2">
                    <Select
                        disabled={!vehicleType || modelsLoading}
                        {...register("model", { required: "Campo requerido" })}
                    >
                        <option value="">Selecciona</option>

                        {models.map((m) => (
                        <option key={m.id} value={m.code}>
                            {m.publicName}
                        </option>
                        ))}
                    </Select>
                </FormField>

                <FormField error={errors.year?.message} label="Año" className="md:col-span-2">
                    <Select
                        disabled={!model || yearsLoading}
                        {...register("year", { required: "Campo requerido" })}
                    >
                        <option value="">Selecciona</option>

                        {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                        ))}
                    </Select>
                </FormField>
                
                <FormField error={errors.vehicleVersionCode?.message} label="Versión" className="md:col-span-2">
                    <Select
                        disabled={!year || versionsLoading}
                        {...register("vehicleVersionCode", {
                        required: "Campo requerido",
                        })}
                    >
                        <option value="">Selecciona</option>

                        {versions.map((v) => (
                        <option key={v.id} value={v.code}>
                            {v.publicName}
                        </option>
                        ))}
                    </Select>
                </FormField>
            </div>
        </div>
    );
}

