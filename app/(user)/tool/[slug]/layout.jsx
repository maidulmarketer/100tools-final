import { domain } from "@/constants/seo";
import { getUserToolDetails } from "@/services/user/toolsService";

export async function generateMetadata({ params }) {
  const toolMeta = await getUserToolDetails(params.slug).then(
    (res) => res.data
  );

  return {
    title: toolMeta.meta_title || toolMeta.name,
    description: toolMeta.meta_description,
    category: toolMeta.category.title,
    type: "website",
    metadataBase: new URL(domain),
    alternates: {
      canonical: toolMeta.canonical_url,
    },
    openGraph: {
      title: toolMeta.name,
      description: toolMeta.short_description,
      publishedTime: toolMeta.created_at,
      url: toolMeta.website_url,
      siteName: toolMeta.name,
      images: [
        {
          url: toolMeta.image,
          width: 800,
          height: 600,
        },
        { url: "/logo.png", width: 800, height: 600 },
      ],
      locale: "en_US",
    },
    robots: {
      index: !toolMeta.is_noindex,
      follow: true,
      nocache: true,
      googleBot: {
        index: !toolMeta.is_noindex,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: toolMeta.name,
      description: toolMeta.short_description,
      siteId: toolMeta.slug,
      creator: "@rifatptk",
      creatorId: "1467726470533754880",
      images: [toolMeta.image],
    },
  };
}

export default async function ToolDetailsLayout({ params, children }) {
  const toolData = await getUserToolDetails(params.slug).then(
    (res) => res.data
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: toolData.name,
    image: toolData.image,
    description: toolData.short_description,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: toolData.average_ratings,
        bestRating: "5",
      },
    },
  };

  return (
    <>
      {children}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
