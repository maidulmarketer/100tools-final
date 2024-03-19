"use client";
import Link from "next/link";
import PageTitle from "@/components/ui/PageTitle";

export default function Page() {
  return (
    <div className="space-y-6 divide-y divide-odtheme/10">
      <PageTitle title="SEO Settings" />

      <div className="py-4 space-y-4">
        <h3 className="text-lg font-medium">
          Meta data and indexing for Public Pages:
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href="/admin/seo-settings/home-page"
            className="px-4 py-10 font-bold text-center bg-odtheme/10 rounded-xl hover:bg-odtheme/20"
          >
            Home Page
          </Link>

          <Link
            href="/admin/seo-settings/categories-page"
            className="px-4 py-10 font-bold text-center bg-odtheme/10 rounded-xl hover:bg-odtheme/20"
          >
            Categories Page
          </Link>

          <Link
            href="/admin/seo-settings/blogs-page"
            className="px-4 py-10 font-bold text-center bg-odtheme/10 rounded-xl hover:bg-odtheme/20"
          >
            Blogs Page
          </Link>

          <Link
            href="/admin/seo-settings/about-page"
            className="px-4 py-10 font-bold text-center bg-odtheme/10 rounded-xl hover:bg-odtheme/20"
          >
            About Page
          </Link>
        </div>
      </div>

      <div className="py-4 space-y-4">
        <h3 className="text-lg font-medium">More Settings:</h3>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href="/admin/seo-settings/redirects"
            className="px-4 py-10 font-bold text-center bg-odtheme/10 rounded-xl hover:bg-odtheme/20"
          >
            Redirects
          </Link>

          <Link
            href="/admin/seo-settings/search-engine-verification"
            className="px-4 py-10 font-bold text-center bg-odtheme/10 rounded-xl hover:bg-odtheme/20"
          >
            Search engine verification
          </Link>
        </div>
      </div>
    </div>
  );
}
