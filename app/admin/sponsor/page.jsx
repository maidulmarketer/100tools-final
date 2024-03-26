"use client";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import { postSponsor } from "@/services/user/toolsService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Sponsor() {
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
    defaultValues: {
        name:"",
        description: "",
        link:""
    },
  });

  function onSubmit(data) {
    // console.log(data);
    const promise = postSponsor(data)
      .then((res) => {
        setBackendErrors({});
        reset();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Creating Sponsor",
      success: "Sponsor created",
      error: "Failed...!",
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          register={{ ...register("name") }}
          error={errors.name}
          backendError={backendErrors.name}
          label="Enter Title"
          placeholder="Powered By"
        />

        <Input
          register={{ ...register("description") }}
          error={errors.description}
          backendError={backendErrors.description}
          label="Enter Sponsor Name"
          placeholder="100  AI Tools"
        />

        <Input
          register={{ ...register("link") }}
          error={errors.link}
          backendError={backendErrors.link}
          label="Enter Link"
          placeholder="https://xyz.com"
        />

        <Button type="submit" variant="dynamic">
          Submit
        </Button>
      </form>
    </div>
  );
}
