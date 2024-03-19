"use client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getSubCategories,
  updateSubCategory,
} from "@/services/admin/subCategoryService";
import Checkbox from "@/components/forms/Checkbox";
import PageTitle from "@/components/ui/PageTitle";
import BackButton from "@/components/buttons/BackButton";

export default function Page() {
  const {
    isLoading: isSubCategoriesLoading,
    data: subCategories,
    refetch: refetchSC,
    isError: isSubCategoriesError,
  } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => getSubCategories().then((res) => res.data),
  });

  function updateIndexing(slug, is_noindex) {
    const promise = updateSubCategory(slug, { is_noindex })
      .then(refetchSC)
      .catch((err) => {
        throw err;
      });

    toast.promise(promise, {
      loading: "Updating..",
      success: "Updated successfully",
      error: "Failed to update...!",
    });
  }

  if (isSubCategoriesLoading) return "Loading...";
  if (isSubCategoriesError) return "Something went wrong!";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <PageTitle title="Category Pages (No Index)" />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {subCategories?.results.map((sc) => (
          <Checkbox
            key={sc.slug}
            checked={sc.is_noindex}
            onChange={(e) => updateIndexing(sc.slug, e.target.checked)}
            isChecked={sc.is_noindex}
            label={`/ai-tools/${sc.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
