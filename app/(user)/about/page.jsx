import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import Container from "@/components/wrappers/Container";
import { domain } from "@/constants/seo";
import { getPublicStorage } from "@/services/publicServices";

export async function generateMetadata() {
  const data = await getPublicStorage().then((res) => res.data.about_page);

  return {
    title: data?.meta_title,
    description: data?.meta_description,
    alternates: {
      canonical: domain + "/about",
    },
    robots: {
      index: !data?.is_noindex ?? true,
      googleBot: {
        index: !data?.is_noindex ?? true,
      },
    },
  };
}

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-8 bg-radials">
      <div className="pt-7">
        <Breadcrumb />
      </div>
      <div className="">
        <h1 className="pb-20 text-4xl font-bold text-center pt-7">About Us</h1>
      </div>

      <div className="flex flex-col items-start justify-center gap-6 font-medium text-md">
        <p className="">
          Hi, Andrei here, founder of Theres An AI For That. Im a solopreneur /
          indie developer from Bucharest, Romania and I got fascinated by AI
          many years ago by reading blogs like Lesswrong, Slate Star Codex and
          Overcoming Bias (which I still read and recommended today).
        </p>
        <p>
          When Stable Diffusion was released, I started testing and documenting
          hundreds of image generation tools that popped up in a very short
          time. I released the biggest collection of Stable Diffusion tools
          (600+) as an Airtable spreadsheet on diffusiondb.com, which got a
          decent amount of traffic and newsletter signups.
        </p>
        <p>
          Meanwhile, new tools were popping up that were not using Stable
          Diffusion, and thats how the idea for TAAFT came about.
        </p>
        <p>
          I launched TAAFT on December 2 2022. It immediately went viral and
          reached 100k visits in the first week - and its been growing ever
          since (as of writing this, we are at 2M+ monthly users).
        </p>
        <p>
          I remember thinking if this gets to 10k daily users, it might turn
          into a business, little did I know we would 10x that less than 6
          months later.
        </p>
      </div>
    </Container>
  );
}
