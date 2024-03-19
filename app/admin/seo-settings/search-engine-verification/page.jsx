"use client";
import { getStorage, updateStorage } from "@/services/admin/storageService";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";

export default function Page() {
  const { isLoading, data, refetch, isError, error } = useQuery({
    queryKey: ["admin-storage"],
    queryFn: () => getStorage().then((res) => res.data),
    refetchInterval: 600000,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    values: data?.storage,
  });

  function onSubmit(data) {
    const promise = updateStorage({ storage: data }).then(refetch);

    toast.promise(promise, {
      loading: "Updating...",
      success: "Updated successfully",
      error: "Something went wrong",
    });
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Search Engine Verification" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          register={{
            ...register("google_verification_id"),
          }}
          label="Google verification ID"
        />

        <Input
          register={{
            ...register("yahoo_verification_id"),
          }}
          label="Yahoo verification ID"
        />

        <Input
          register={{
            ...register("bing_verification_id"),
          }}
          label="Bing verification ID"
        />

        <Input
          register={{
            ...register("baidu_verification_id"),
          }}
          label="Baidu verification ID"
        />

        <Input
          register={{
            ...register("pinterest_verification_id"),
          }}
          label="Pinterest verification ID"
        />

        <Input
          register={{
            ...register("yandex_verification_id"),
          }}
          label="Yandex verification ID"
        />

        <Button variant="dynamic" disabled={!isDirty}>
          Submit
        </Button>
      </form>
    </div>
  );
}
