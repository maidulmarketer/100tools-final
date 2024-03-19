"use client";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getStorage, updateStorage } from "@/services/admin/storageService";
import Button from "@/components/buttons/Button";
import Checkbox from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import PageTitle from "@/components/ui/PageTitle";
import BackButton from "@/components/buttons/BackButton";

export default function AboutPageSeo() {
  const { isLoading, data, refetch, isError } = useQuery({
    queryKey: ["about-page-seo"],
    queryFn: () => getStorage().then((res) => res.data),
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    values: data?.about_page,
  });

  function onSubmit(data) {
    const promise = updateStorage({ about_page: data }).then(refetch);

    toast.promise(promise, {
      loading: "Updating...",
      success: "Updated successfully",
      error: "Something went wrong",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="SEO Settings for About Page" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          register={{
            ...register("meta_title"),
          }}
          error={errors.title}
          label="Meta Title"
          placeholder="Enter Meta Title"
        />

        <Textarea
          register={{
            ...register("meta_description"),
          }}
          error={errors.meta_description}
          label="Meta description"
          placeholder="Enter meta description"
        />

        <Checkbox
          isChecked={watch("is_noindex")}
          register={{ ...register("is_noindex") }}
          label="Discourage search engines from indexing this page"
        />

        <Button variant="dynamic" disabled={!isDirty}>
          Submit
        </Button>
      </form>
    </div>
  );
}
