"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getTools } from "@/services/admin/toolService";
import { addFeaturedTool } from "@/services/admin/featuredToolsService";

import Button from "@/components/buttons/Button";
import BackButton from "@/components/buttons/BackButton";
import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import Image from "next/image";
import Modal from "@/components/modal/Modal";
import Checkbox from "@/components/forms/Checkbox";

export default function AdminCreateFeaturedTool() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function closeModal() {
    setIsEditModalOpen(false);
  }

  const [searchKey, setSearchKey] = useState("");

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["admin-tools", searchKey],
    queryFn: () => getTools({ search: searchKey }).then((res) => res.data),
  });

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
    defaultValues: { in_pages: [] },
  });

  function onSubmit(data) {
    if (!data.tool?.slug) return toast.error("Select a tool and try again.");

    const promise = addFeaturedTool({ ...data, tool_slug: data.tool.slug })
      .then((res) => {
        setBackendErrors({});
        reset();
      })
      .catch((err) => {
        setBackendErrors(err.response.data);
        throw err;
      });

    toast.promise(promise, {
      loading: "Adding Featured Tool",
      success: "Featured Tool Added",
      error: "Failed...!",
    });
  }

  const selectedTool = watch("tool");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton />
        <PageTitle title="Add featured tool" />
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

        <p className="font-semibold">Pages to show on</p>

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

        <Button variant="dynamic">Submit</Button>
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
                  setValue("tool", tool);
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
