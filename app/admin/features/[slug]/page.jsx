"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { getChangedProperties, textToSlug } from "@/lib/utils";

import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import {
  deleteFeature,
  getFeature,
  updateFeature,
} from "@/services/admin/featureService";

const schema = object().shape({
  title: string().required("Name is required"),
  slug: string().required("Slug is required"),
});

export default function AdminFeatureDetailsPage({ params: { slug } }) {
  const router = useRouter();
  const [backendErrors, setBackendErrors] = useState({});

  const {
    isLoading,
    data: feature,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-feature", slug],
    queryFn: () => getFeature(slug).then((res) => res.data),
  });

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    values: feature,
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const payload = getChangedProperties(data, feature);

    const promise = updateFeature(slug, payload)
      .then((res) => {
        if (feature.slug !== res.data.slug) {
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
      loading: "Updating feature",
      success: "Feature updated",
      error: "Failed...!",
    });
  }

  function handleDelete() {
    const promise = deleteFeature(slug)
      .then((res) => {
        router.replace("/admin/features");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting feature",
      success: "Feature deleted",
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
        <PageTitle title={`Update Feature - ${feature?.title}`} />
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
            backendError={backendErrors.slug}
            label="Slug"
            placeholder="Feature slug"
          />
        </div>

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
