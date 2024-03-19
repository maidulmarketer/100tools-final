"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { textToSlug } from "@/lib/utils";
import { createBlog } from "@/services/admin/blogService";

import Button from "@/components/buttons/Button";
import BackButton from "@/components/buttons/BackButton";
import Checkbox from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Textarea from "@/components/forms/Textarea";
import Select from "@/components/forms/Select";

const schema = object().shape({
  title: string().required("Title is required"),
  slug: string().required("Slug is required"),
  description: string().required("Content is required"),
  canonical_url: string().url("Invalid URL. Format: https://example.com"),
});

export default function AdminCreateBlog() {
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
    defaultValues: { avatar: [], status: "ACTIVE", is_noindex: false },
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const payload = {
      ...data,
      avatar: data.avatar.length ? data.avatar[0] : null,
    };
    const promise = createBlog(payload)
      .then((res) => {
        setBackendErrors({});
        reset();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Creating blog",
      success: "Blog created",
      error: "Failed...!",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Create New Blog" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          register={{
            ...register("avatar"),
          }}
          error={errors.avatar}
          backendError={backendErrors.avatar}
          label="Featured Image"
        />

        {watch("avatar").length ? (
          <>
            <Image
              src={URL.createObjectURL(watch("avatar")[0])}
              alt="blog-image"
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
          placeholder="Title of the blog"
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

        <Select
          register={{ ...register("status") }}
          options={[
            { label: "Draft", value: "DRAFT" },
            { label: "Active", value: "ACTIVE" },
          ]}
          error={errors.status}
          backendError={backendErrors.status}
          label="Status"
        />

        <Textarea
          register={{
            ...register("short_description"),
          }}
          error={errors.short_description}
          backendError={backendErrors.short_description}
          label="Short description"
          placeholder="Enter short description"
        />

        <RichTextEditor
          label="Content"
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
