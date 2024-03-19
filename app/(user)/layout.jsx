import { domain } from "@/constants/seo";
import UserAuthSetter from "@/components/guards/UserAuthSetter";
import Footer from "@/components/navigation/Footer";
import UserMobileNav from "@/components/navigation/UserMobileNav";
import UserNavbar from "@/components/navigation/UserNavbar";
import UserSessionProvider from "@/components/wrappers/UserSessionProvider";
import { getPublicStorage } from "@/services/publicServices";

export async function generateMetadata() {
  const data = await getPublicStorage().then((res) => res.data);

  return {
    title: data?.home_page?.meta_title,
    description: data?.home_page?.meta_description,
    alternates: {
      canonical: domain,
    },
    robots: {
      index: !data?.home_page?.is_noindex ?? true,
      googleBot: {
        index: !data?.home_page?.is_noindex ?? true,
      },
    },
    verification: {
      google: data?.storage?.google_verification_id,
      yahoo: data?.storage?.yahoo_verification_id,
      yandex: data?.storage?.yandex_verification_id,

      other: {
        "baidu-site-verification": data?.storage?.baidu_verification_id,
        "msvalidate.01": data?.storage?.bing_verification_id,
        "p:domain_verify": data?.storage?.pinterest_verification_id,
      },
    },
  };
}

export default function Layout({ children }) {
  return (
    <UserSessionProvider>
      <UserAuthSetter>
        <UserNavbar />
        <div className="flex flex-col justify-between min-h-screen mt-[314px] md:mt-[422px] bg-dtheme sticky top-0 z-10 border-t border-odtheme/25">
        <main>{children}</main>
        <UserMobileNav />
        <Footer />
        </div>
      </UserAuthSetter>
    </UserSessionProvider>
  );
}
