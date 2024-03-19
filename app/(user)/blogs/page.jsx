import { Hydrate, dehydrate } from "@tanstack/react-query";
import { getPostList } from "@/services/user/postService";
import { IoIosHome } from "react-icons/io";
import { domain } from "@/constants/seo";
import Link from "next/link";
import Container from "@/components/wrappers/Container";
import getQueryClient from "@/app/getQueryClient";
import Button from "@/components/buttons/Button";
import BlogList from "./components/BlogList";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import { getPublicStorage } from "@/services/publicServices";

export async function generateMetadata() {
  const data = await getPublicStorage().then((res) => res.data.blogs_page);

  return {
    title: data?.meta_title,
    description: data?.meta_description,
    alternates: {
      canonical: domain + "/blogs",
    },
    robots: {
      index: !data?.is_noindex ?? true,
      googleBot: {
        index: !data?.is_noindex ?? true,
      },
    },
  };
}

export default async function PostListPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery([`posts`], () =>
    getPostList().then((res) => res.data)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="bg-radials text-start">
      <Container className="flex flex-col pt-12 gap-9">
        <Breadcrumb />
        <div className="px-4 pt-9">
          <div className="flex items-center justify-start gap-1 font-semibold pb-7">
            <p className="text-3xl sm:text-4xl">
              Lorem ipsum{" "}
              <span className="font-extrabold text-gradient">
                dolor sit amet
              </span>
              , <br className="hidden sm:block" /> consectetur adipiscing elit,
            </p>
          </div>

          <div className="max-w-3xl pb-12">
            <p className="text-lg">
              AI low-code/no-code tools provide significant advantages, such as
              ease of use, rapid
            </p>
          </div>

          <div>
            <Link href="/">
              <Button variant="dynamic" className="gap-0 px-6 py-4">
                <IoIosHome className="w-7" /> Explore All AI Tools
              </Button>
            </Link>
          </div>
        </div>
        <Hydrate state={dehydratedState}>
          <BlogList />
        </Hydrate>
      </Container>
    </div>
  );
}
