import Container from "@/components/wrappers/Container";
import getQueryClient from "@/app/getQueryClient";
import DetailsPage from "./components/DetailsPage";
import { getUserToolDetails } from "@/services/user/toolsService";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import Banner from "../../components/Banner";

export default async function ToolDetailsPage({ params }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery([`tool/${params.slug}`], () =>
    getUserToolDetails(params.slug).then((res) => res.data)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container className="flex flex-col pt-12 gap-9">
      <Hydrate state={dehydratedState}>
        {/* <Breadcrumb/> */}
        <DetailsPage params={params} />
      </Hydrate>
    </Container>
    
  );
}
