"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { deleteBlog, getBlog, updateBlog } from "@/services/admin/blogService";
import { getChangedProperties, getImageSrc, textToSlug } from "@/lib/utils";

import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import Checkbox from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import Image from "next/image";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Textarea from "@/components/forms/Textarea";
import Select from "@/components/forms/Select";

const schema = object().shape({
  title: string().required("Title is required"),
  slug: string().required("Slug is required"),
  description: string().required("Content is required"),
  canonical_url: string().url("Invalid URL. Format: https://example.com"),
});

export default function AdminBlogDetailsPage({ params: { slug } }) {
  const router = useRouter();
  const [backendErrors, setBackendErrors] = useState({});

  const {
    isLoading,
    data: blog,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlog(slug).then((res) => res.data),
    refetchInterval: 600000,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { is_noindex: false, avatar: [] },
    values: {
      ...blog,
      avatar: [blog?.avatar],
    },
    resolver: yupResolver(schema),
  });

  const imageUrl = getImageSrc(watch("avatar")[0]);

  function onSubmit(data) {
    const payload = getChangedProperties(data, blog);

    if (payload.avatar && typeof payload.avatar[0] === "object") {
      payload.avatar = payload.avatar[0];
    } else {
      delete payload.avatar;
    }

    const promise = updateBlog(slug, payload)
      .then((res) => {
        if (blog.slug !== res.data.slug) {
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
      loading: "Updating blog",
      success: "Blog updated",
      error: "Failed...!",
    });
  }

  function handleDelete() {
    const promise = deleteBlog(slug)
      .then((res) => {
        router.replace("/admin/blogs");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting blog",
      success: "Blog deleted",
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
        <PageTitle title={`Update Blog - ${blog?.title}`} />
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

        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="blog-image"
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
          placeholder="Blog title"
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
          placeholder="Blog slug"
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
          initialValue={blog.description}
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
