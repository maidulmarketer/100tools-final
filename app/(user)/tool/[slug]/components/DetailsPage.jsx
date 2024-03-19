"use client";
import Image from "next/image";
import Link from "next/link";

import { AiFillTwitterCircle } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import {
  FaDiscord,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import Button from "@/components/buttons/Button";
import { useQuery } from "@tanstack/react-query";
import ToolsDetails from "@/components/skeleton/toolsDetails/ToolsDetails";
import {
  getUserToolDetails,
  patchUserTool,
} from "@/services/user/toolsService";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { format } from "date-fns";
import AddFeedback from "./AddFeedback";
import RatingCard from "./RatingCard";
import AverageRating from "./AverageRating";
import { MdEmail, MdVerified } from "react-icons/md";
import ToolsVerification from "./ToolsVerification";
import ToolCard from "@/components/cards/ToolCard";

import { IoLogoGithub } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import instagram from "@/public/images/icons/instagram.png";
import imagePlaceHolder from "@/public/images/image-placeholder.webp";

import dot from "../../../../../public/images/icons/dot.svg";
import fire from "../../../../../public/images/icons/fire.svg";
import calender from "../../../../../public/images/icons/calender.svg";
import person from "../../../../../public/images/icons/person.svg";
import {
  BookMark,
  Calender,
  Fire,
  Love,
  Share,
  Star,
  UserPlus,
} from "@/components/svg/icons";

export default function DetailsPage({ params }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const {
    isLoading,
    data: tool,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [`tool/${params.slug}`],
    queryFn: () => getUserToolDetails(params.slug).then((res) => res.data),
  });

  if (isLoading) {
    return <ToolsDetails />;
  }

  function handleLoveSubmit() {
    if (!isAuthenticated) {
      signIn("google");
    } else {
      const payload = {
        save_count: tool.is_loved ? tool.save_count - 1 : tool.save_count + 1,
        slug: tool.slug,
      };

      const promise = patchUserTool(tool.slug, payload)
        .then((res) => {
          refetch();
        })
        .catch((err) => {
          throw err;
        });

      toast.promise(promise, {
        loading: "Saving your tool",
        success: "Tools saved successfully",
        error: "Failed...!, Please try again",
      });
    }
  }

  const handleShare = (title) => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: "",
        })
        .then((data) => data)
        .catch((error) => console.log("Error sharing", error));
    }
  };

  return (
    <>
      <section className="space-y-3" id="details-header">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-5 lg:gap-3">
          <div className="flex gap-5 items-start">
            <div className="min-w-[92px] min-h-[92px]">
              <Image
                width={92}
                height={92}
                src={tool.image || imagePlaceHolder}
                alt="card-banner"
                className="w-full min-h-[92px] object-cover rounded-md"
              />
            </div>
            <div className="space-y-2">
              <div className="flex gap-1 items-center">
                <p className="text-[32px] font-semibold leading-[40px]">
                  {tool.name}
                </p>
                {tool.is_verified && (
                  <MdVerified className="w-5 text-[#3BA2F5]" />
                )}
              </div>
              <div className="flex gap-2 items-center text-sm font-medium text-odtheme/60 leading-[16px]">
                <div className="flex gap-1 items-center">
                  <Star className="w-[14px] h-[14px]" />
                  <p className="">({tool.average_ratings || "0.0"})</p>
                </div>
                <Image
                  width={4}
                  height={4}
                  src={dot}
                  alt="dot"
                  className="w-1 h-1 object-cover"
                />
                <div className="flex gap-1 items-center">
                  <Love className="w-[14px] h-[14px]" />
                  <p className="">{tool.save_count}</p>
                </div>
                <Image
                  width={4}
                  height={4}
                  src={dot}
                  alt="dot"
                  className="w-1 h-1 object-cover"
                />
                <p>{tool.pricing}</p>
              </div>
              <div className="font-medium text-sm text-[#54789A]">
                {tool.sub_category.map((item) => (
                  <Link
                    key={item.slug}
                    className="leading-[12px]"
                    href={`/ai-tools/${item.slug}`}
                  >
                    #{item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <p className="block md:hidden">{tool.short_description}</p>
          <div className="flex gap-3 md:gap-4 items-center">
            {tool.do_sponsor_website ? (
              <Link href={tool.website_url} rel="sponsored" target="_blank">
                <Button className="py-[10px] md:py-4 px-[50px] md:px-[69.5px] rounded-full">
                  Visit Site <BiLinkExternal className="w-5 h-5" />
                </Button>
              </Link>
            ) : tool.do_follow_website ? (
              <Link href={tool.website_url} target="_blank">
                <Button className="py-[10px] md:py-4 px-[50px] md:px-[69.5px] rounded-full">
                  Visit Site <BiLinkExternal className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link
                href={tool.website_url}
                rel="nofollow noopener"
                target="_blank"
              >
                <Button className="py-[10px] md:py-4 px-[50px] md:px-[69.5px] rounded-full">
                  Visit Site <BiLinkExternal className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <button
              onClick={() => handleShare(tool.name)}
              className="rounded-full p-3 cursor-pointer bg-odtheme/10"
            >
              <Share className="w-5 h-5" />
            </button>

            <button
              onClick={handleLoveSubmit}
              className="flex gap-1 items-center px-[10px] md:px-6 py-[10px] md:py-4 text-sm md:text-base rounded-full cursor-pointer bg-odtheme/10"
            >
              <BookMark className="w-4 md:w-5 h-4 md:h-5" />
              <span className="font-normal md:font-medium">Save</span>
            </button>
          </div>
        </div>

        <p className="hidden md:block w-1/2">{tool.short_description}</p>

        <div className="block md:hidden mt-5 space-y-7">
          {tool?.alternative_tool.save_count > 0 && (
            <div className="flex items-center gap-3">
              <h2 className="w-2/5 font-semibold text-odtheme/40">
                Popular alternative
              </h2>

              <div className="flex flex-col flex-wrap items-start gap-1 font-medium md:flex-row">
                <Link href={`/tools/${tool.alternative_tool.slug}`}>
                  <span className="underline">
                    {tool?.alternative_tool.name}
                  </span>
                  ({tool?.alternative_tool.save_count} Saves)
                </Link>
              </div>
            </div>
          )}

          <div className="flex gap-3 items-center">
            <h2 className="w-2/5 font-semibold text-odtheme/40">Added date</h2>
            <p className="w-3/5">
              {format(new Date(tool.created_at), "LLL, dd yyyy")}
            </p>
          </div>

          {(tool.email_url ||
            tool.facebook_url ||
            tool.twitter_url ||
            tool.tiktok_url ||
            tool.youtube_url ||
            tool.linkedin_url ||
            tool.github_url ||
            tool.discoard_url) && (
            <div className="flex items-center gap-3">
              <h2 className="w-2/5 font-semibold text-odtheme/40">Follow</h2>
              <div className="flex flex-wrap w-3/5 gap-1">
                {tool.email_url && (
                  <Link href={tool.email_url}>
                    <MdEmail className="w-6 h-6 text-blue-300" />
                  </Link>
                )}
                {tool.facebook_url && (
                  <Link href={tool.facebook_url}>
                    <FaFacebook className="w-6 h-6 text-blue-800" />
                  </Link>
                )}
                {tool.twitter_url && (
                  <Link href={tool.twitter_url}>
                    <AiFillTwitterCircle className="w-6 h-6 text-blue-600" />
                  </Link>
                )}
                {tool.tiktok_url && (
                  <Link href={tool.tiktok_url}>
                    <FaTiktok className="w-6 h-6 text-blue-400" />
                  </Link>
                )}
                {tool.facebook_url && (
                  <Link href={tool.facebook_url}>
                    <Image
                      alt="instagram"
                      className="w-6 h-6"
                      src={instagram}
                    />
                  </Link>
                )}
                {tool.youtube_url && (
                  <Link href={tool.youtube_url}>
                    <FaYoutube className="w-6 h-6 text-red-500" />
                  </Link>
                )}
                {tool.linkedin_url && (
                  <Link href={tool.linkedin_url}>
                    <FaLinkedin className="w-6 h-6 text-blue-900" />
                  </Link>
                )}
                {tool.github_url && (
                  <Link href={tool.github_url}>
                    <IoLogoGithub className="w-6 h-6 text-blue-700" />
                  </Link>
                )}
                {tool.discoard_url && (
                  <Link href={tool.discoard_url}>
                    <FaDiscord className="w-6 h-6 text-sky-500" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex justify-between items-center pt-5">
          {tool?.alternative_tool.save_count > 0 && (
            <div className="flex gap-2 items-center text-odtheme/60">
              <Fire className="w-3 h-4" />
              <p>Popular alternative</p>
              <div className="flex items-center gap-1 font-medium leading-[20px] text-odtheme">
                <Link href={`/tools/${tool.alternative_tool.slug}`}>
                  <span className="underline">
                    {tool?.alternative_tool.name}
                  </span>
                  ({tool?.alternative_tool.save_count} Saves)
                </Link>
              </div>
            </div>
          )}
          <div className="flex gap-2 items-center text-odtheme/60">
            <Calender className="w-5 h-5" />
            <p>
              Updated on{" "}
              <span className="font-medium">
                {" "}
                {format(new Date(tool.created_at), "dd MMM yyyy")}
              </span>
            </p>
          </div>
          {(tool.email_url ||
            tool.facebook_url ||
            tool.twitter_url ||
            tool.tiktok_url ||
            tool.youtube_url ||
            tool.linkedin_url ||
            tool.github_url ||
            tool.discoard_url) && (
            <div className="flex gap-2 items-center text-odtheme/60">
              <UserPlus className="w-5 h-5" />
              <p className="text-odtheme/60">Follow</p>
              {(tool.email_url ||
                tool.facebook_url ||
                tool.twitter_url ||
                tool.tiktok_url ||
                tool.youtube_url ||
                tool.linkedin_url ||
                tool.github_url ||
                tool.discoard_url) && (
                <div className="flex items-center gap-3">
                  <h2 className="w-2/5 font-semibold text-odtheme/40">
                    Social links
                  </h2>
                  <div className="flex flex-wrap w-3/5 gap-1">
                    {tool.email_url && (
                      <Link href={tool.email_url}>
                        <MdEmail className="w-6 h-6 text-blue-300" />
                      </Link>
                    )}
                    {tool.facebook_url && (
                      <Link href={tool.facebook_url}>
                        <FaFacebook className="w-6 h-6 text-blue-800" />
                      </Link>
                    )}
                    {tool.twitter_url && (
                      <Link href={tool.twitter_url}>
                        <AiFillTwitterCircle className="w-6 h-6 text-blue-600" />
                      </Link>
                    )}
                    {tool.tiktok_url && (
                      <Link href={tool.tiktok_url}>
                        <FaTiktok className="w-6 h-6 text-blue-400" />
                      </Link>
                    )}
                    {tool.facebook_url && (
                      <Link href={tool.facebook_url}>
                        <Image
                          alt="instagram"
                          className="w-6 h-6"
                          src={instagram}
                        />
                      </Link>
                    )}
                    {tool.youtube_url && (
                      <Link href={tool.youtube_url}>
                        <FaYoutube className="w-6 h-6 text-red-500" />
                      </Link>
                    )}
                    {tool.linkedin_url && (
                      <Link href={tool.linkedin_url}>
                        <FaLinkedin className="w-6 h-6 text-blue-900" />
                      </Link>
                    )}
                    {tool.github_url && (
                      <Link href={tool.github_url}>
                        <IoLogoGithub className="w-6 h-6 text-blue-700" />
                      </Link>
                    )}
                    {tool.discoard_url && (
                      <Link href={tool.discoard_url}>
                        <FaDiscord className="w-6 h-6 text-sky-500" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Verification tools section */}
      <ToolsVerification
        toolsName={tool.name}
        url={tool.website_url}
        code={tool.verification_code}
        index_no={tool.index_no}
        params={params}
        is_verified={tool.is_verified}
      />

      <section
        id="short-description"
        className="flex flex-col md:flex-row justify-between gap-6 md:gap-32"
      >
        <div className="w-full md:w-3/5">
          <Image
            width={860}
            height={480}
            src={tool.image || imagePlaceHolder}
            alt="card-banner"
            className="hidden md:block w-[860px] h-[480px] object-cover rounded-xl"
          />
          <Image
            width={320}
            height={200}
            src={tool.image || imagePlaceHolder}
            alt="card-banner"
            className="block md:hidden h-[200px] object-cover rounded-xl w-full"
          />
        </div>
        <div id="best-alternatives" className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold">Best Alternatives</h3>
          <div></div>
        </div>
      </section>

      <section id="description" className="flex flex-col gap-3 md:gap-4">
        {tool.description && (
          <div
            className="override-style bg-odtheme/5 px-8 py-5 rounded-lg"
            dangerouslySetInnerHTML={{ __html: tool.description }}
          />
        )}

        {tool.do_sponsor_website ? (
          <Link href={tool.website_url} rel="sponsored" target="_blank">
            <Button className="rounded-md py-[10px] md:py-4 font-bold text-base w-full">
              Visit Site <BiLinkExternal className="w-5 h-5" />
            </Button>
          </Link>
        ) : tool.do_follow_website ? (
          <Link href={tool.website_url} target="_blank">
            <Button className="rounded-md py-[10px] md:py-4 font-bold text-base w-full">
              Visit Site <BiLinkExternal className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <Link href={tool.website_url} rel="nofollow noopener" target="_blank">
            <Button className="rounded-md py-[10px] md:py-4 font-bold text-base w-full">
              Visit Site <BiLinkExternal className="w-5 h-5" />
            </Button>
          </Link>
        )}

        <button
          id="button"
          onClick={handleLoveSubmit}
          className="flex justify-center items-center gap-2 cursor-pointer bg-odtheme/10 rounded-md py-4"
        >
          <BookMark className="w-5 h-5" />
          <span className="font-medium">Save</span>
        </button>
      </section>

      <section id="rating">
        <div
          id="review-section"
          className="flex flex-col md:flex-row justify-start md:justify-between items-center gap-10"
        >
          <AddFeedback slug={tool.slug} refetch={refetch} />
          <AverageRating
            averageRating={tool.average_ratings}
            ratings_distribution={tool.ratings_distribution}
            rating_count={tool.ratings.length}
          />
        </div>
        <div className="py-4 divide-y divide-odtheme/10">
          {tool.ratings.length ? (
            tool.ratings.map((item, i) => (
              <RatingCard key={i} item={item} created_at={tool.created_at} />
            ))
          ) : (
            <p className="text-sm font-bold">There is no reviews yet.</p>
          )}
        </div>
      </section>

      <section className="space-y-5" id="alternatives">
        <div className="flex items-center gap-1">
          <h2 className="text-2xl font-bold">
            {tool.related_tools.length} Alternatives To
          </h2>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tool.related_tools.length > 0 ? (
            tool.related_tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} refetch={refetch} />
            ))
          ) : (
            <p>No Alternative Tools Found Yet</p>
          )}
        </div>
      </section>
    </>
  );
}
