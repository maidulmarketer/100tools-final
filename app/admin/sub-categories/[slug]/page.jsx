"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { getCategories } from "@/services/admin/categoryService";
import {
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
} from "@/services/admin/subCategoryService";
import { getChangedProperties, textToSlug } from "@/lib/utils";

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

export default function AdminSubCategoryDetails({ params: { slug } }) {
  const router = useRouter();

  // Get subcategory details
  const {
    isLoading,
    data: subCategory,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["sub-category", slug],
    queryFn: () => getSubCategory(slug).then((res) => res.data),
  });

  // Get categories and make parent category options
  const { isLoading: isCategoryLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories().then((res) => res.data),
  });

  const categoryOptions = categories?.results.map((category) => ({
    label: category.title,
    value: category.slug,
  }));

  // Form initialization
  const [backendErrors, setBackendErrors] = useState({});
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: { is_noindex: false },
    values: { ...subCategory, category_slug: subCategory?.category.slug },
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const payload = getChangedProperties(data, subCategory);

    if (payload.hasOwnProperty("category")) {
      delete payload.category;
    }

    const promise = updateSubCategory(slug, payload)
      .then((res) => {
        if (subCategory.slug !== res.data.slug) {
          router.replace(res.data.slug);
        } else {
          setBackendErrors({});
          refetch();
        }
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Updating sub category",
      success: "Sub category updated",
      error: "Failed...!",
    });
  }

  function handleDelete() {
    const promise = deleteSubCategory(slug)
      .then((res) => {
        router.replace("/admin/sub-categories");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting sub category",
      success: "Sub category deleted",
      error: "Failed...!",
    });
  }

  if (isLoading || isCategoryLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title={`Update Sub category - ${subCategory?.title}`} />
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
          placeholder="Sub Category title"
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
          placeholder="Sub Category slug"
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
          initialValue={subCategory.description}
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

        <div className="flex gap-4">
          <Button type="button" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="dynamic">Update</Button>
        </div>
      </form>
    </div>
  );
}
