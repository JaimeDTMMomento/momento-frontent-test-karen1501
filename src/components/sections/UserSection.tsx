import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "@/types/form";
import FormField from "../form/FormField";
import Input from "../form/Input";
import Select from "../form/Select";

interface Gender {
    id: number;
    publicName: string;
    code: string;
}

interface Props {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    genders: Gender[];
    loading: boolean;
}

export default function UserSection({
    register,
    errors,
    genders,
    loading
}: Props) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[24px] font-bold leading-[1.2] text-black text-center">
                Datos Sobre ti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField error={errors.firstName?.message} label="Nombre(s)">
                    <Input
                        placeholder="Nombre(s)"
                        {...register("firstName", {
                        required: "Campo requerido"
                        })}
                    />
                </FormField>

                <FormField error={errors.paternalLastName?.message} label="Apellido paterno">
                    <Input
                        placeholder="Apellido paterno"
                        {...register("paternalLastName", {
                        required: "Campo requerido"
                        })}
                    />
                </FormField>

                <FormField error={errors.maternalLastName?.message} label="Apellido materno">
                    <Input
                        placeholder="Apellido materno"
                        {...register("maternalLastName", {
                        required: "Campo requerido"
                        })}
                    />
                </FormField>

                <FormField error={errors.postalCode?.message} label="Código Postal">
                    <Input
                        placeholder="Código postal"
                        {...register("postalCode", {
                            required: "Campo requerido",
                            pattern: {
                                value: /^[0-9]{5}$/,
                                message: "Código postal inválido"
                            }
                        })}
                    />
                </FormField>

                <FormField error={errors.email?.message} label="Correo electrónico">
                    <Input
                        placeholder="Email"
                        {...register("email", {
                            required: "Campo requerido",
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Correo inválido"
                        }
                        })}
                    />
                </FormField>

                <FormField error={errors.phone?.message} label="Teléfono (opcional)">
                    <Input
                        placeholder="Phone"
                        {...register("phone", {
                            pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Teléfono inválido"
                        }
                        })}
                    />
                </FormField>

                <FormField error={errors.birthDate?.message} label="Fecha de nacimiento">
                    <Input
                        placeholder="dd/mm/yyyy"
                        maxLength={10}
                        {...register("birthDate", {
                        required: "Campo requerido",
                        validate: (value) => {
                            if (!value) return "Campo requerido";

                            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
                            if (!regex.test(value)) {
                            return "Formato inválido (dd/mm/yyyy)";
                            }

                            const [day, month, year] = value.split("/").map(Number);
                            const date = new Date(year, month - 1, day);

                            if (
                            date.getFullYear() !== year ||
                            date.getMonth() !== month - 1 ||
                            date.getDate() !== day
                            ) {
                            return "Fecha inválida";
                            }

                            return true;
                        },
                        onChange: (e) => {
                            let value = e.target.value.replace(/\D/g, ""); 

                            if (value.length > 2) {
                            value = value.slice(0, 2) + "/" + value.slice(2);
                            }

                            if (value.length > 5) {
                            value = value.slice(0, 5) + "/" + value.slice(5, 9);
                            }

                            e.target.value = value;
                        },
                        })}
                    />
                </FormField>
                
                <FormField error={errors.gender?.message} label="Género en tu licencia">
                    <Select
                        disabled={loading}
                        {...register("gender", { required: "Campo requerido" })}
                    >
                        <option value="" disabled hidden>
                        Selecciona
                        </option>
                        {genders.map((g) => (
                        <option key={g.id} value={g.code}>
                            {g.publicName}
                        </option>
                        ))}
                    </Select>
                </FormField>
            </div>
        </div>
    );
}
