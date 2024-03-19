"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import Button from "@/components/buttons/Button";
import BackButton from "@/components/buttons/BackButton";
import Checkbox from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import { createRedirect } from "@/services/admin/redirectService";
import RedirectsInfo from "@/components/info/RedirectsInfo";

const schema = object().shape({
  // type: string().required("Title is required"),
  old: string().required("Old path is required"),
  new: string().required("New path is required"),
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
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const promise = createRedirect(data)
      .then((res) => {
        setBackendErrors({});
        reset();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Adding...",
      success: "Added",
      error: "Failed...!",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Add New Redirect" />
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

        <Button variant="dynamic">Submit</Button>
      </form>
    </div>
  );
}
