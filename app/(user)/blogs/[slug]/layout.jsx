import { domain } from "@/constants/seo";
import { getPostDetails } from "@/services/user/postService";

export async function generateMetadata({ params }) {
  const blogMeta = await getPostDetails(params.slug).then((res) => res.data);

  return {
    title: blogMeta.meta_title || blogMeta.title,
    description: blogMeta.meta_description,
    type: "article",
    metadataBase: new URL(domain),
    alternates: {
      canonical: blogMeta.canonical_url,
    },
    openGraph: {
      title: blogMeta.title,
      description: blogMeta.short_description,
      publishedTime: blogMeta.created_at,
      url: domain + "/" + blogMeta.slug,
      siteName: blogMeta.title,
      images: [
        {
          url: blogMeta.avatar,
          width: 800,
          height: 600,
        },
        { url: "/logo.png", width: 800, height: 600 },
      ],
      locale: "en_US",
    },
    robots: {
      index: !blogMeta.is_noindex,
      follow: true,
      nocache: true,
      googleBot: {
        index: !blogMeta.is_noindex,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: blogMeta.title,
      description: blogMeta.short_description,
      siteId: blogMeta.slug,
      creator: "@rifatptk",
      creatorId: "1467726470533754880",
      images: [blogMeta.avatar],
    },
  };
}

export default async function BlogDetailsLayout({ children, params }) {
  const blogData = await getPostDetails(params.slug).then((res) => res.data);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": domain + "/blogs/" + params.slug,

    headline: blogData.title,
    name: blogData.title,
    description: blogData.short_description,
    datePublished: blogData.created_at,
    dateModified: blogData.updated_at,
    url: domain + "/blogs/" + params.slug,

    image: {
      "@type": "ImageObject",
      "@id": blogData.avatar,
      url: blogData.avatar,
      height: "362",
      width: "388",
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
