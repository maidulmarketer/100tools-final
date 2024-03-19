"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/services/admin/categoryService";
import { getChangedProperties, getImageSrc, textToSlug } from "@/lib/utils";

import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import PageTitle from "@/components/ui/PageTitle";
import Image from "next/image";

const schema = object().shape({
  title: string().required("Title is required"),
  slug: string().required("Slug is required"),
  canonical_url: string().url("Invalid URL. Format: https://example.com"),
});

export default function AdminCategoryDetailsPage({ params: { slug } }) {
  const router = useRouter();
  const [backendErrors, setBackendErrors] = useState({});

  const {
    isLoading,
    data: category,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategory(slug).then((res) => res.data),
  });

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    values: {
      ...category,
      image: [category?.image],
    },
    resolver: yupResolver(schema),
  });

  const imageUrl = getImageSrc(watch("image")[0]);

  function onSubmit(data) {
    const payload = getChangedProperties(data, category);

    if (payload.image && typeof payload.image[0] === "object") {
      payload.image = payload.image[0];
    } else {
      delete payload.image;
    }

    const promise = updateCategory(slug, payload)
      .then((res) => {
        if (category.slug !== res.data.slug) {
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
      loading: "Updating category",
      success: "Category updated",
      error: "Failed...!",
    });
  }

  function handleDelete() {
    const promise = deleteCategory(slug)
      .then((res) => {
        router.replace("/admin/categories");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting category",
      success: "Category deleted",
      error: "Failed...!",
    });
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title={`Update Category - ${category?.title}`} />
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

        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="category-image"
              width={1000}
              height={1000}
              priority
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

        <div className="flex gap-4">
          <Button type="button" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="dynamic" disabled={!isDirty}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
