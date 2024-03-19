import Container from "@/components/wrappers/Container";
import getQueryClient from "@/app/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { getPostDetails } from "@/services/user/postService";
import DetailsPage from "./components/DetailsPage";

export default async function PostDetailsPage({ params }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery([`posts/${params.slug}`], () =>
    getPostDetails(params.slug).then((res) => res.data)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container className="flex flex-col pt-12 gap-9 bg-radials">
      <Hydrate state={dehydratedState}>
        <DetailsPage params={params} />
      </Hydrate>
    </Container>
  );
}
