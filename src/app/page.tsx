"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import UserSection from "@/components/sections/UserSection";
import VehicleSection from "@/components/sections/VehicleSection";
import Modal from "@/components/Modal";

export default function QuotePage() {
  const {
    form,
    register,
    handleSubmit,
    setValue,
    trigger,
    isLoading,
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
  } = useQuoteForm();

  const [modal, setModal] = useState({
    open: false,
    message: "",
  });

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center pt-8 px-4">
      <Image
        src="/momento_logo.svg"
        alt="Momento Seguros"
        width={187}
        height={51}
        className="mb-6"
      />
      
      <div className="w-[82%] md:w-auto">
        <Image
          src="/happy.svg"
          alt="Ilustración"
          width={360}
          height={184}
          className="w-full h-auto"
          priority
        />
      </div>
      
      <div className="
        w-full 
        max-w-[988px] 
        bg-white 
        rounded-[48px] md:rounded-[48px] 
        px-8 md:px-10 
        py-12 md:py-14 
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
      ">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const isValid = await trigger();

            if (!isValid) return;

            handleSubmit(async (data) => {
              try {
                const response = await onSubmit(data);
                setModal({
                  open: true,
                  message: `¡Felicidades! Tu cotización tiene el ID ${response.data.id}.`,
                });
              }catch (error: any) {
                const backendError = error?.data?.error;
                let message = "Lo sentimos, hubo un error en el proceso.";
                if (Array.isArray(backendError?.details) && backendError.details.length > 0) {
                  message = backendError.details
                    .map((d: any) => d.message)
                    .join(", ");
                }
                else if (backendError?.details?.code === "ALREADY_EXISTS") {
                  message = backendError.message;
                }
                else if (backendError?.message) {
                  message = backendError.message;
                }
                setModal({
                  open: true,
                  message,
                });
              }
            })();
          }}className="flex flex-col gap-10"
        >
          <div className="relative flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col gap-8 pr-0 md:pr-16">
              <UserSection
                register={register}
                errors={form.formState.errors}
                genders={genders}
                loading={gendersLoading}
              />
            </div>
            <div className="flex-1 flex flex-col gap-8 mt-10 md:mt-0 pl-0">
              <VehicleSection
                register={register}
                errors={form.formState.errors}
                setValue={setValue}
                brands={brands}
                brandsLoading={brandsLoading}
                vehicleTypes={vehicleTypes}
                typesLoading={typesLoading}
                models={models}
                modelsLoading={modelsLoading}
                years={years}
                yearsLoading={yearsLoading}
                versions={versions}
                versionsLoading={versionsLoading}
                brand={brand}
                vehicleType={vehicleType}
                model={model}
                year={year}
              />
            </div>
            <div className="
              hidden md:block
              absolute
              top-[96px]
              bottom-[23px]
              left-1/2
              -translate-x-1/2
              w-px
              bg-[#E5E7EB]
              opacity-50
            " />

          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full 
              h-[56px] 
              bg-primary
              text-white 
              rounded-full 
              text-[18px] 
              font-semibold 
              shadow-[0_8px_20px_rgba(24,201,180,0.35)]
              transition
              cursor-pointer
              disabled:opacity-50
            "
          >
            {isLoading ? "Cotizando..." : "Cotizar ahora"}
          </button>
        </form>
      </div>
      
      {modal.open && (
        <Modal
          message={modal.message}
          onClose={() => setModal({ open: false, message: "" })}
        />
      )}
    </div>
  );
}
