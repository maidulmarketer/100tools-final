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
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import {
  deleteStaff,
  getStaff,
  updateStaff,
} from "@/services/admin/staffService";
import Select from "@/components/forms/Select";

const schema = object().shape({
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
  email: string().email("Invalid email").required("Email is required."),
  phone: string().required("Phone number is required."),
  date_of_birth: string().required("Date of birth is required"),
  // password: string().required("Password is required"),
});

export default function AdminStaffDetailsPage({ params: { slug } }) {
  const router = useRouter();
  const [backendErrors, setBackendErrors] = useState({});

  const {
    isLoading,
    data: staff,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["staff", slug],
    queryFn: () => getStaff(slug).then((res) => res.data),
  });

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    values: staff,
    resolver: yupResolver(schema),
  });

  // const imageUrl = getImageSrc(watch("image")[0]);

  function onSubmit(data) {
    const payload = getChangedProperties(data, staff);

    // if (payload.image && typeof payload.image[0] === "object") {
    //   payload.image = payload.image[0];
    // } else {
    //   delete payload.image;
    // }

    const promise = updateStaff(slug, payload)
      .then((res) => {
        if (staff.slug !== res.data.slug) {
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
      loading: "Updating staff info",
      success: "Staff info updated",
      error: "Failed...!",
    });
  }

  function handleDelete() {
    const promise = deleteStaff(slug)
      .then((res) => {
        router.replace("/admin/staffs");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting staff",
      success: "Staff deleted",
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
        <PageTitle
          title={`Update Staff - ${staff?.first_name + " " + staff?.last_name}`}
        />
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
