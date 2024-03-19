"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { createCategory } from "@/services/admin/categoryService";
import { textToSlug } from "@/lib/utils";

import Button from "@/components/buttons/Button";
import BackButton from "@/components/buttons/BackButton";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import Textarea from "@/components/forms/Textarea";
import Image from "next/image";

const schema = object().shape({
  title: string().required("Title is required"),
  slug: string().required("Slug is required"),
  canonical_url: string().url("Invalid URL. Format: https://example.com"),
});

export default function AdminCreateCategory() {
  const [backendErrors, setBackendErrors] = useState({});
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { image: [] },
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const payload = {
      ...data,
      image: data.image.length ? data.image[0] : null,
    };
    const promise = createCategory(payload)
      .then((res) => {
        setBackendErrors({});
        reset();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Creating category",
      success: "Category created",
      error: "Failed...!",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Create New Category" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          register={{
            ...register("image"),
          }}
          error={errors.image}
          backendError={backendErrors.image}
          label="Category Icon"
        />

        {watch("image").length ? (
          <>
            <Image
              src={URL.createObjectURL(watch("image")[0])}
              alt="category-image"
              width={1000}
              height={1000}
              className="object-contain w-full h-40 rounded bg-odtheme/10"
            />
            <Input
              register={{
                ...register("alt"),
              }}
              error={errors.alt}
              backendError={backendErrors.alt}
              label="Image alt"
              placeholder="Enter image alt"
            />
          </>
        ) : null}
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
          backendError={backendErrors.title}
          label="Title"
          placeholder="Category title"
        />
        <Input
          register={{
            ...register("slug", {
              onBlur: (e) => setValue("slug", textToSlug(e.target.value)),
            }),
          }}
          error={errors.slug}
          backendError={backendErrors.slug}
          label="Slug"
          placeholder="Category slug"
        />

        <Button variant="dynamic">Submit</Button>
      </form>
    </div>
  );
}
