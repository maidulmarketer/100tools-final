"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { toast } from "sonner";

import {
  generateFormData,
  getChangedProperties,
  getImageSrc,
  textToSlug,
} from "@/lib/utils";
import { getCategories } from "@/services/admin/categoryService";
import { getSubCategories } from "@/services/admin/subCategoryService";
import { getFeatures } from "@/services/admin/featureService";
import {
  deleteTool,
  getTool,
  updateRequestedToolStatus,
  updateTool,
} from "@/services/admin/toolService";

import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import Checkbox from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";

const pricingOptions = [
  { label: "Select pricing", value: "" },
  { label: "Free", value: "FREE" },
  { label: "Freemium", value: "FREEMIUM" },
  { label: "Free Trial", value: "FREE_TRIAL" },
  { label: "Premium", value: "PREMIUM" },
  { label: "Contact for Price", value: "CONTACT_FOR_PRICE" },
];

const schema = object().shape({
  name: string().required("Name is required"),
  slug: string().required("Slug is required"),
  category_slug: string().required("Category is required"),
  website_url: string().url("Invalid URL. Format: https://example.com"),
  facebook_url: string().url("Invalid URL. Format: https://example.com"),
  twitter_url: string().url("Invalid URL. Format: https://example.com"),
  linkedin_url: string().url("Invalid URL. Format: https://example.com"),
  canonical_url: string().url("Invalid URL. Format: https://example.com"),
});

export default function AdminToolDetailsPage({ params: { slug } }) {
  const router = useRouter();
  const [backendErrors, setBackendErrors] = useState({});

  // Get categories and sub-categories and make options
  const {
    isLoading,
    data: tool,
    refetch,
  } = useQuery({
    queryKey: ["admin-tools", slug],
    queryFn: () => getTool(slug).then((res) => res.data),
  });

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      image: [],
      subcategory_slugs: [],
      features: [],
      is_noindex: false,
    },
    values: {
      ...tool,
      image: [tool?.image],
      feature_slugs: tool?.feature.map((f) => f.slug),
      category_slug: tool?.category?.slug,
      subcategory_slugs: tool?.sub_category
        .filter((sc) => !!sc.slug)
        .map((sc) => sc.slug),
    },
    resolver: yupResolver(schema),
  });

  const imageUrl = getImageSrc(watch("image")[0]);

  // Get categories and sub-categories and make options
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
    categories.results.forEach((category) =>
      categoryOptions.push({
        label: category.title,
        value: category.slug,
      })
    );
  }

  const { isLoading: isSubCategoryLoading, data: subCategories } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => getSubCategories().then((res) => res.data),
    // enabled: !!selectedCategory,
  });

  const { isLoading: isFeaturesLoading, data: features } = useQuery({
    queryKey: ["admin-features"],
    queryFn: () => getFeatures().then((res) => res.data),
  });

  function onSubmit(data) {
    const payload = getChangedProperties(data, tool);

    if (payload.image[0] && typeof payload.image[0] === "object") {
      payload.image = payload.image[0];
    } else {
      delete payload.image;
    }

    const formData = generateFormData(payload);

    const promise = updateTool(slug, formData)
      .then((res) => {
        if (tool.slug !== res.data.slug) {
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
      loading: "Updating AI Tool",
      success: "AI Tool updated",
      error: "Failed...!",
    });
  }

  function handleStatusChange(e, slug) {
    const { value } = e.target;
    updateRequestedToolStatus(slug, value)
      .then(() => router.replace("/admin/tools"))
      .catch(() => toast.error("Something Went Wrong..."));
  }

  function handleDelete() {
    const promise = deleteTool(slug)
      .then((res) => {
        router.replace("/admin/tools");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting tool",
      success: "Tool deleted",
      error: "Failed...!",
    });
  }

  if (
    isLoading ||
    isCategoryLoading ||
    isSubCategoryLoading ||
    isFeaturesLoading
  )
    return "Loading...";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Update Requested AI Tool" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Status (Approve/Reject)"
          value={tool?.status}
          onChange={(e) => handleStatusChange(e, slug)}
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Approved", value: "APPROVED" },
            { label: "Rejected", value: "REJECTED" },
          ]}
        />
        <Input
          type="file"
          accept="image/*"
          register={{
            ...register("image"),
          }}
          error={errors.image}
          backendError={backendErrors.image}
          label="Tool Banner"
        />

        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="tool-banner"
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

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
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
            backendError={backendErrors.name}
            label="Tool Name"
            placeholder="Enter your tool name"
          />
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

        <Select
          register={{ ...register("category_slug") }}
          options={categoryOptions}
          error={errors.category_slug}
          backendError={backendErrors.category_slug}
          label="Category"
        />

        <div className="space-y-1">
          <p className="font-semibold">Sub Categories</p>
          {watch("category_slug") ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {subCategories?.results
                .filter((sc) => sc.category?.slug === watch("category_slug"))
                .map((subCategory, i) => (
                  <Checkbox
                    key={subCategory.slug}
                    label={subCategory.title}
                    value={subCategory.slug}
                    register={{
                      ...register("subcategory_slugs"),
                    }}
                    isChecked={watch("subcategory_slugs").includes(
                      subCategory.slug
                    )}
                  />
                ))}
            </div>
          ) : (
            <p className="text-dwarning">Please select a category first</p>
          )}
        </div>

        <div className="space-y-1">
          <p className="font-semibold">Features</p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {features?.results.map((feature, i) => (
              <Checkbox
                key={i}
                label={feature.title}
                value={feature.slug}
                register={{
                  ...register("feature_slugs"),
                }}
                isChecked={watch("feature_slugs")?.includes(feature.slug)}
              />
            ))}
          </div>
        </div>

        <Select
          register={{ ...register("pricing") }}
          options={pricingOptions}
          error={errors.pricing}
          backendError={backendErrors.pricing}
          label="Pricing"
        />
        <Input
          register={{ ...register("website_url") }}
          error={errors.website_url}
          backendError={backendErrors.website_url}
          label="Website URL"
          placeholder="Enter website url"
        />
        <Textarea
          register={{ ...register("short_description") }}
          error={errors.short_description}
          backendError={backendErrors.short_description}
          label="Short Description"
          placeholder="Enter your short description"
          className="h-16"
        />

        <RichTextEditor
          label="Long Description"
          initialValue={tool?.description}
          onChange={(value) => setValue("description", value)}
          error={errors.description}
          backendError={backendErrors.description}
        />

        {/* <Textarea
          register={{ ...register("description") }}
          error={errors.description}
          backendError={backendErrors.description}
          label="Full Description"
          placeholder="Write full description"
        /> */}

        <div className="py-4 space-y-4">
          <p className="text-lg font-semibold">Extras:</p>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Checkbox
              isChecked={watch("is_new")}
              register={{ ...register("is_new") }}
              label="New"
            />
            <Checkbox
              isChecked={watch("is_trending")}
              register={{ ...register("is_trending") }}
              label="Trending"
            />
            <Checkbox
              isChecked={watch("is_featured")}
              register={{ ...register("is_featured") }}
              label="Featured"
            />
            <Checkbox
              isChecked={watch("is_editor")}
              register={{ ...register("is_editor") }}
              label="Editor's choice"
            />
            <Checkbox
              isChecked={watch("is_verified")}
              register={{ ...register("is_verified") }}
              label="Verified"
            />
          </div>
        </div>

        <div className="py-4 space-y-4">
          <p className="text-lg font-semibold">Add Social media links:</p>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Input
              register={{ ...register("email") }}
              error={errors.email}
              backendError={backendErrors.email}
              label="Email"
              placeholder="Set Email"
            />
            <Input
              register={{ ...register("facebook_url") }}
              error={errors.facebook_url}
              backendError={backendErrors.facebook_url}
              label="Facebook"
              placeholder="Facebook url"
            />
            <Input
              register={{ ...register("twitter_url") }}
              error={errors.twitter_url}
              backendError={backendErrors.twitter_url}
              label="Twitter"
              placeholder="Twitter url"
            />
            <Input
              register={{ ...register("tiktok_url") }}
              error={errors.tiktok_url}
              backendError={backendErrors.tiktok_url}
              label="Tiktok"
              placeholder="Tiktok url"
            />
            <Input
              register={{ ...register("instagram_url") }}
              error={errors.instagram_url}
              backendError={backendErrors.instagram_url}
              label="Instragram"
              placeholder="Instragram url"
            />
            <Input
              register={{ ...register("youtube_url") }}
              error={errors.youtube_url}
              backendError={backendErrors.youtube_url}
              label="Youtube"
              placeholder="Youtube url"
            />
            <Input
              register={{ ...register("linkedin_url") }}
              error={errors.linkedin_url}
              backendError={backendErrors.linkedin_url}
              label="Linkdin"
              placeholder="Linkdin url"
            />
            <Input
              register={{ ...register("github_url") }}
              error={errors.github_url}
              backendError={backendErrors.github_url}
              label="Github"
              placeholder="Github url"
            />
            <Input
              register={{ ...register("discord_url") }}
              error={errors.discord_url}
              backendError={backendErrors.discord_url}
              label="Discoard"
              placeholder="Discoard url"
            />
          </div>
        </div>

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
