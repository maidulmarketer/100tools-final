"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getTools, updateTool } from "@/services/admin/toolService";
import Checkbox from "@/components/forms/Checkbox";
import PageTitle from "@/components/ui/PageTitle";
import BackButton from "@/components/buttons/BackButton";

export default function Page() {
  const {
    isLoading: isToolsLoading,
    data: tools,
    refetch: refetchTools,
    isError: isToolsError,
  } = useQuery({
    queryKey: ["admin-tools"],
    queryFn: () => getTools().then((res) => res.data),
  });

  function updateIndexing(slug, is_noindex) {
    const promise = updateTool(slug, { is_noindex })
      .then(refetchTools)
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Updating..",
      success: "Updated successfully",
      error: "Failed to update...!",
    });
  }

  if (isToolsLoading) return "Loading...";
  if (isToolsError) return "Something went wrong!";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <PageTitle title="Tools Pages (No Index)" />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {tools?.results.map((tool) => (
          <Checkbox
            key={tool.slug}
            checked={tool.is_noindex}
            onChange={(e) => updateIndexing(tool.slug, e.target.checked)}
            isChecked={tool.is_noindex}
            label={`/tools/${tool.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
