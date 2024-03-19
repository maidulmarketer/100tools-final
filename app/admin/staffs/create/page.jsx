"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { prefixCountryCode } from "@/lib/utils";
import { createStaff } from "@/services/admin/staffService";

import Button from "@/components/buttons/Button";
import BackButton from "@/components/buttons/BackButton";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import Select from "@/components/forms/Select";

const schema = object().shape({
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
  email: string().email("Invalid email").required("Email is required."),
  phone: string().required("Phone number is required."),
  date_of_birth: string().required("Date of birth is required"),
  password: string().required("Password is required"),
});

export default function AdminCreateStaff() {
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
    // defaultValues: { image: [] },
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    // const payload = {
    //   ...data,
    //   image: data.image.length ? data.image[0] : null,
    // };

    const payload = {
      ...data,
      phone: prefixCountryCode(data.phone),
      id: Date.now(),
    };

    const promise = createStaff(payload)
      .then((res) => {
        setBackendErrors({});
        reset();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Creating staff",
      success: "Staff created",
      error: "Failed...!",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Create New Staff" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <Input
          type="file"
          accept="image/*"
          register={{
            ...register("image"),
          }}
          error={errors.image}
          backendError={backendErrors.image}
          label="Category Image"
        />

        {watch("image").length ? (
          <Image
            src={URL.createObjectURL(watch("image")[0])}
            alt="category-image"
            width={1000}
            height={1000}
            className="object-contain w-full h-40 rounded bg-odtheme/10"
          />
        ) : null} */}

        <Input
          register={{
            ...register("first_name"),
          }}
          error={errors.first_name}
          backendError={backendErrors.first_name}
          label="First Name"
          placeholder="Enter first name"
        />

        <Input
          register={{
            ...register("last_name"),
          }}
          error={errors.last_name}
          backendError={backendErrors.last_name}
          label="Last Name"
          placeholder="Enter last name"
        />

        <Input
          register={{
            ...register("email"),
          }}
          error={errors.email}
          backendError={backendErrors.email}
          label="Email"
          placeholder="Enter email"
        />

        <Input
          register={{
            ...register("phone"),
          }}
          error={errors.phone}
          backendError={backendErrors.phone}
          label="Phone"
          placeholder="Enter phone number"
        />

        <Select
          register={{
            ...register("gender"),
          }}
          error={errors.gender}
          backendError={backendErrors.gender}
          label="Gender"
          options={[
            { label: "Select gender", value: "" },
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Other", value: "OTHER" },
          ]}
        />

        <Input
          type="date"
          register={{
            ...register("date_of_birth"),
          }}
          error={errors.date_of_birth}
          backendError={backendErrors.date_of_birth}
          label="Date of Birth"
        />

        <Input
          type="password"
          register={{
            ...register("password"),
          }}
          error={errors.password}
          backendError={backendErrors.password}
          label="Password"
          placeholder="Enter password"
        />

        <Button variant="dynamic">Submit</Button>
      </form>
    </div>
  );
}
