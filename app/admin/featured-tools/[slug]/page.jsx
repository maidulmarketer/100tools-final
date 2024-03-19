"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import {
  deleteFeaturedTool,
  getFeaturedTool,
  updateFeaturedTool,
} from "@/services/admin/featuredToolsService";
import { getTools } from "@/services/admin/toolService";
import { getChangedProperties } from "@/lib/utils";
import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import Checkbox from "@/components/forms/Checkbox";
import Modal from "@/components/modal/Modal";

export default function AdminCategoryDetailsPage({ params: { slug } }) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  function closeModal() {
    setIsEditModalOpen(false);
  }

  const [backendErrors, setBackendErrors] = useState({});

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["admin-tools", searchKey],
    queryFn: () => getTools({ search: searchKey }).then((res) => res.data),
  });

  const {
    isLoading: isFeaturedToolLoading,
    data: featuredTool,
    refetch,
    isError: isFeaturedToolError,
    error: featuredToolError,
  } = useQuery({
    queryKey: ["featured-tool", slug],
    queryFn: () => getFeaturedTool(slug).then((res) => res.data),
  });

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    values: featuredTool,
  });

  function onSubmit(data) {
    const payload = getChangedProperties(data, featuredTool);

    const promise = updateFeaturedTool(slug, {
      ...payload,
      tool_slug: data.feature_tool.slug,
    })
      .then((res) => {
        setBackendErrors({});
        refetch();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Updating",
      success: "Updated",
      error: "Failed...!",
    });
  }

  function handleDelete() {
    const promise = deleteFeaturedTool(slug)
      .then((res) => {
        router.replace("/admin/featured-tools");
      })
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Deleting",
      success: "Deleted",
      error: "Failed...!",
    });
  }

  if (isFeaturedToolLoading) {
    return <span>Loading...</span>;
  }

  if (isFeaturedToolError) {
    return <span>Error: {featuredToolError.message}</span>;
  }

  const selectedTool = watch("feature_tool");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Update Featured Tool" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!!selectedTool && (
          <div className="space-y-2">
            <p>Selected tool</p>
            <Image
              src={selectedTool.image || "/images/image-placeholder.webp"}
              width={400}
              height={400}
              alt="banner"
              className="object-cover h-32 rounded"
            />
            <p className="text-lg font-semibold">{selectedTool.name}</p>
          </div>
        )}

        <Button type="button" onClick={() => setIsEditModalOpen(true)}>
          {!!selectedTool ? "Select another tool" : "Select tool"}
          Select Tool
        </Button>

        <Input
          register={{
            ...register("custom_field"),
          }}
          error={errors.custom_field}
          backendError={backendErrors.custom_field}
          label="Text"
          placeholder="Enter custom text"
        />

        <p className="font-semibold"> Pages to show on</p>

        <div className="grid grid-cols-2 gap-2">
          {["Home Page", "Categories Page"].map((item) => (
            <Checkbox
              key={item}
              label={item}
              value={item}
              register={{
                ...register("in_pages"),
              }}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="dynamic">Update</Button>
        </div>
      </form>

      <Modal show={isEditModalOpen} onClose={closeModal}>
        <div className="relative h-full space-y-4">
          <h3 className="text-xl font-semibold">Select a tool</h3>
          <Input
            placeholder="Search by name"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />

          <div className="grid gap-1 overflow-y-auto h-[440px] sm:h-[400px] sm:grid-cols-2 lg:grid-cols-3">
            {data?.results.map((tool) => (
              <Checkbox
                key={tool.slug}
                label={tool.name}
                value={tool.slug}
                onChange={() => {
                  setValue("feature_tool", tool);
                  closeModal();
                }}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
