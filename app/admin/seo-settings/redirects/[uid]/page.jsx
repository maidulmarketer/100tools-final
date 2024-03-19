"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { getChangedProperties } from "@/lib/utils";

import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import Checkbox from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import {
  deleteRedirect,
  getRedirect,
  updateRedirect,
} from "@/services/admin/redirectService";
import RedirectsInfo from "@/components/info/RedirectsInfo";

const schema = object().shape({
  old: string().required("Old path is required"),
  new: string().required("New path is required"),
});

export default function AdminBlogDetailsPage({ params: { uid } }) {
  const router = useRouter();
  const [backendErrors, setBackendErrors] = useState({});

  const {
    isLoading,
    data: redirect,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-redirects", uid],
    queryFn: () => getRedirect(uid).then((res) => res.data),
    refetchInterval: 600000,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: redirect,
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const payload = getChangedProperties(data, redirect);

    const promise = updateRedirect(uid, payload)
      .then((res) => {
        setBackendErrors({});
        refetch();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Updating...",
      success: "Updated",
      error: "Failed...!",
    });
  }

  function handleDelete() {
    const promise = deleteRedirect(uid)
      .then((res) => {
        router.replace("/admin/seo-settings/redirects");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
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
        <PageTitle title={`Update Redirect Info`} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          register={{
            ...register("old"),
          }}
          error={errors.old}
          backendError={backendErrors.old}
          label="Old path"
          placeholder="Old path of the URL"
        />

        <Input
          register={{
            ...register("new"),
          }}
          error={errors.new}
          backendError={backendErrors.new}
          label="New path"
          placeholder="New path of the URL"
        />

        <Checkbox
          isChecked={watch("is_permanent")}
          register={{ ...register("is_permanent") }}
          label="Permanent"
        />

        <RedirectsInfo />

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
