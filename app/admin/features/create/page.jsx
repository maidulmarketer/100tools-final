"use client";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { textToSlug } from "@/lib/utils";
import { createFeature } from "@/services/admin/featureService";

import Button from "@/components/buttons/Button";
import BackButton from "@/components/buttons/BackButton";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";

const schema = object().shape({
  title: string().required("Name is required"),
  slug: string().required("Slug is required"),
});

export default function AdminCreateFeature() {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    const promise = createFeature(data)
      .then((res) => reset())
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Creating feature",
      success: "Feature created",
      error: "Failed...!",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Create New Feature" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          register={{
            ...register("title", {
              onChange: (e) => {
                setValue("slug", textToSlug(e.target.value));
                trigger("slug");
              },
            }),
          }}
          error={errors.title}
          label="Name"
          placeholder="Feature name"
        />
        <div className="hidden">
          <Input
            register={{
              ...register("slug", {
                onBlur: (e) => setValue("slug", textToSlug(e.target.value)),
              }),
            }}
            error={errors.slug}
            label="Slug"
            placeholder="Feature slug"
          />
        </div>

        <Button variant="dynamic">Submit</Button>
      </form>
    </div>
  );
}
