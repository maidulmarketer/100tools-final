"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { getCategories } from "@/services/admin/categoryService";
import { createSubCategory } from "@/services/admin/subCategoryService";
import { textToSlug } from "@/lib/utils";

import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import PageTitle from "@/components/ui/PageTitle";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Select from "@/components/forms/Select";
import Checkbox from "@/components/forms/Checkbox";

const schema = object().shape({
  title: string().required("Title is required"),
  slug: string().required("Slug is required"),
  category_slug: string().required("Category is required"),
  canonical_url: string().url("Invalid URL. Format: https://example.com"),
});

export default function AdminCreateSubCategory() {
  const [backendErrors, setBackendErrors] = useState({});

  // Get categories and make parent category options
  const { isLoading: isCategoryLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories().then((res) => res.data),
  });

  let categoryOptions = [
    {
      label: "Select a category",
      value: "",
    },
  ];
  if (categories) {
    categories.results.forEach((category) =>
      categoryOptions.push({
        label: category.title,
        value: category.slug,
      })
    );
  }

  // Form initialization
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: { is_noindex: false },
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const promise = createSubCategory(data)
      .then((res) => {
        setBackendErrors({});
        reset();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Adding sub category",
      success: "Sub category added",
      error: "Failed...!",
    });
  }

  if (isCategoryLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Create New Sub Category" />
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
          backendError={backendErrors.title}
          label="Title"
          placeholder="Sub category title"
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
          placeholder="Sub category slug"
        />

        <Select
          options={categoryOptions}
          register={{
            ...register("category_slug"),
          }}
          error={errors.category_slug}
          backendError={backendErrors.category_slug}
          label="Parent category"
          placeholder="Select category"
        />

        <RichTextEditor
          label="Description"
          initialValue=""
          onChange={(value) => setValue("description", value)}
          error={errors.description}
          backendError={backendErrors.description}
        />

        <legend className="py-4 text-xl font-semibold">SEO Optimization</legend>
        <Checkbox
          isChecked={watch("is_noindex")}
          register={{ ...register("is_noindex") }}
          label="Noindex"
        />

        <Input
          register={{
            ...register("meta_title"),
          }}
          error={errors.meta_title}
          backendError={backendErrors.meta_title}
          label="Meta title"
          placeholder="Enter meta title"
        />
        <Textarea
          register={{
            ...register("meta_description"),
          }}
          error={errors.meta_description}
          backendError={backendErrors.meta_description}
          label="Meta description"
          placeholder="Enter meta description"
        />
        <Input
          register={{
            ...register("canonical_url"),
          }}
          error={errors.canonical_url}
          backendError={backendErrors.canonical_url}
          label="Canonical URL"
          placeholder="Enter Canonical URL"
        />

        <Button variant="dynamic">Submit</Button>
      </form>
    </div>
  );
}
