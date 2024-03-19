import { domain } from "@/constants/seo";

export async function generateMetadata() {
  return {
    alternates: {
      canonical: domain + "/newsletter",
    },
  };
}

export default function NewsletterPage() {
  return (
    <p className="font-bold text-center mt-52">
      News Latter Page Coming Soon ......{" "}
    </p>
  );
}
