import Container from "@/components/wrappers/Container";
import AllCategory from "./components/AllCategory";
import CategoryHeader from "./components/CategoryHeader";
import { domain } from "@/constants/seo";
import { getPublicStorage } from "@/services/publicServices";
import Banner from "../components/Banner";

export async function generateMetadata() {
  const data = await getPublicStorage().then((res) => res.data.categories_page);

  return {
    title: data?.meta_title,
    description: data?.meta_description,
    robots: {
      index: !data?.is_noindex ?? true,
      googleBot: {
        index: !data?.is_noindex ?? true,
      },
    },
    alternates: {
      canonical: domain + "/ai-tools",
    },
  };
}

export default function CategoriesPage() {
  return (
    <Container>
      <CategoryHeader />
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 mt-7">
        <AllCategory />
      </div>
    </Container>
  );
}