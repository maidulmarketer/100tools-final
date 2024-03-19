"use client";
import Image from "next/image";
import { useState } from "react";
import { array, boolean, object, string } from "yup";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { generateFormData, getImageSrc, textToSlug } from "@/lib/utils";
import { getFeatures } from "@/services/admin/featureService";
import { requestTool } from "@/services/user/toolsService";
import { getCategories } from "@/services/admin/categoryService";

import Button from "@/components/buttons/Button";
import Checkbox from "@/components/forms/Checkbox";
import CheckboxWithoutBg from "@/components/forms/CheckboxWithoutBg";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";

const pricingOptions = [
  { label: "Free", value: "FREE" },
  { label: "Freemium", value: "FREEMIUM" },
  { label: "Free Trial", value: "FREE_TRIAL" },
  { label: "Premium", value: "PREMIUM" },
  { label: "Contact for Price", value: "CONTACT_FOR_PRICE" },
];

const schema = object().shape({
  name: string().required("Name is required"),
  // category_slug: array().of(string()).min(1, 'Category is required'),
  spend_money: boolean()
    .oneOf([true], 'You must agree to spend $29 USD for listing your AI tool')
    .required('You must agree to spend $29 USD for listing your AI tool'),
});

export default function ToolsForm() {
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
      image: [],
      category_slug: [],
      feature_slugs: [],
    },
    resolver: yupResolver(schema),
  });

  // Get categories and make options
  const { isLoading: isCategoryLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories().then((res) => res.data),
  });

  let categoryOptions = [
    {
      label: "Select a category",
      value: "",
    },
  ];
  if (categories) {
    categories.results.forEach((sc) =>
      categoryOptions.push({
        label: sc.title,
        value: sc.slug,
      })
    );
  }

  const { isLoading: isFeaturesLoading, data: features } = useQuery({
    queryKey: ["client-features"],
    queryFn: () => getFeatures().then((res) => res.data),
  });

  const imageUrl = getImageSrc(watch("image")[0]);

  function onSubmit(data) {
    const payload = { ...data };

    if (data.image[0]) {
      payload.image = payload.image[0];
    } else {
      delete payload.image;
    }

    const formData = generateFormData(payload);

    const promise = requestTool(formData)
      .then((res) => {
        setBackendErrors({});
        reset();
      })

      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Requesting AI Tool",
      success: "AI Tool Requested",
      error: "Failed...!",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          register={{
            ...register("name", {
              onChange: (e) => {
                setValue("slug", textToSlug(e.target.value));
                trigger("slug");
              },
            }),
          }}
          error={errors.name}
          backendError={backendErrors.slug}
          label="Tool Name"
          placeholder="Enter your tool name"
        />
        {/* Hidden Slug Field */}
        <div className="hidden">
          <Input
            register={{
              ...register("slug", {
                onBlur: (e) => setValue("slug", textToSlug(e.target.value)),
              }),
            }}
            error={errors.slug}
            backendError={backendErrors.slug}
            label="Tool Slug"
            placeholder="Enter your tools slug"
          />
        </div>

        <Input
          register={{ ...register("website_url") }}
          error={errors.website_url}
          backendError={backendErrors.website_url}
          label="Website URL"
          placeholder="Enter website url"
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <Select
          register={{ ...register("category_slug") }}
          options={categoryOptions}
          error={errors.category_slug}
          backendError={backendErrors.category_slug}
          label="Category"
        />
      </div>

      <div className="space-y-1">
        <p className="font-semibold">Pricing</p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {pricingOptions.map((item) => (
            <CheckboxWithoutBg
              key={item.label}
              label={item.label}
              value={item.value}
              className="p-0 border-none"
              register={{ ...register("pricing") }}
            />
          ))}
        </div>
        {backendErrors.pricing && (
          <p className="text-sm text-ddanger first-letter:uppercase">
            {backendErrors.pricing}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <p className="font-semibold">Features</p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {features?.results.map((feature) => (
            <CheckboxWithoutBg
              key={feature.slug}
              label={feature.title}
              value={feature.slug}
              className="p-0 border-none"
              register={{
                ...register("feature_slugs"),
              }}
            />
          ))}
        </div>
      </div>

      <Textarea
        register={{ ...register("short_description") }}
        error={errors.short_description}
        backendError={backendErrors.short_description}
        label="Short Description"
        placeholder="Enter your short description"
        className="h-16"
      />
      <Textarea
        register={{ ...register("description") }}
        error={errors.description}
        backendError={backendErrors.description}
        label="Full Description"
        placeholder="Write full description"
      />

      <Input
        type="file"
        accept="image/*"
        register={{
          ...register("image"),
        }}
        error={errors.image}
        backendError={backendErrors.image}
        label="Upload an image of your AI tool to be displayed"
      />

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="tool-banner"
          width={1000}
          height={1000}
          className="object-contain w-full h-40 rounded bg-odtheme/10"
        />
      ) : null}

      <Checkbox
        label="Yes, I agree to spend $29 USD for listing my AI tool"
        value=""
        className="p-0 border-none w-fit"
        error={errors.spend_money}
        register={{
          ...register("spend_money"),
        }}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
