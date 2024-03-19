import Link from "next/link";
import Button from "@/components/buttons/Button";

import { RxCross2, RxDoubleArrowUp } from "react-icons/rx";
import { useRef, useState } from "react";
import Modal from "@/components/modal/Modal";
import { toast } from "sonner";
import { userApi } from "@/services/axios";
import useDynamicLogo from "@/hooks/useDynamicLogo";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { CopyIcon, Mike } from "@/components/svg/icons";

export default function ToolsVerification({
  toolsName,
  url,
  code,
  index_no,
  params,
  is_verified,
}) {
  const [verificationModal, setVerificationModal] = useState(false);
  const [isCheckVerification, setCheckVerification] = useState(false);

  const codeRef = useRef();

  const handleCopyClick = () => {
    const textToCopy = codeRef.current.outerHTML;
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);

    // Show a toast notification on successful copy
    toast.success("Code Copied Successfully!");
  };

  const handleVerification = async () => {
    setCheckVerification(true);
    try {
      await userApi.get(`/me/tools/${params.slug}/verify`);
      setCheckVerification(false);
      toast.success("Verification successfully!");
    } catch (error) {
      toast.error("Sorry, verification is not successful!");
      setCheckVerification(false);
    }
  };

  const logo = useDynamicLogo();

  return (
    <div className="flex flex-col justify-between h-full gap-4 md:flex-row rounded-xl">
      <div className="flex flex-col items-center justify-between w-full gap-4 p-3 text-center md:flex-row rounded-xl bg-odtheme/5">
        <div className="flex flex-wrap items-stretch justify-center gap-5">
          <div className="w-full md:w-fit flex items-center justify-between px-11 md:px-3 py-4 md:py-2 rounded-lg bg-dtheme gap-x-4">
            <div className="flex flex-col items-start text-xs md:text-base">
              <p className="">Featured on</p>
              <Image
                src={logo}
                alt="100-AiTools-Logo"
                className="h-5 w-fit lg:h-5"
              />
            </div>
            <p>|</p>
            <div className="flex items-center gap-1">
              <FaBookmark className="w-5" />
              <span className="text-xs font-bold md:text-lg text-odtheme">
                {index_no}
              </span>
            </div>
          </div>
          <div
            onClick={() => handleCopyClick()}
            className="w-full md:w-fit flex items-center gap-1 px-10 md:px-3 py-4 md:py-2 text-sm border-2 rounded-lg cursor-pointer border-odtheme/10 md:gap-2 md:text-base"
          >
            <CopyIcon className="w-5"/>
            <p className="font-bold">Copy Embed Code</p>
          </div>
        </div>
        <Link
          href="/submit-ai-tools"
          className="flex items-center gap-1 font-bold px-11 py-3 md:py-4 bg-odtheme text-dtheme rounded-full"
        >
          <Mike className="w-5 h-5"/>
          Promote this AI
        </Link>
      </div>
      {!is_verified && (
        <Button
          onClick={() => setVerificationModal(true)}
          variant="secondary"
          className="border-0 flex gap-1 items-center font-bold"
        >
          Claim this AI <IoIosArrowForward className="w-4 h-4" />
        </Button>
      )}

      {/* embed code */}
      <div className="hidden">
        <a
          href={`https://aitools-staging.vercel.app/tools/${params.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderRadius: "8px",
            backgroundColor: "#f2f0f0",
            gap: "8px",
            maxWidth: "100%",
            color: "black", // Ensure all text is black
          }}
          ref={codeRef}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              fontSize: "0.875rem",
              color: "black", // Ensure all text is black
            }}
          >
            <p style={{ margin: 0, color: "black" }}>Featured on</p>
            <div style={{ display: "flex", gap: "1px" }}>
              <img
                src="https://aitools-staging.vercel.app/logo.png"
                alt="100 ai tools"
                style={{ width: "100px", height: "40px" }}
                width="100"
                height="40"
              />
            </div>
          </div>
          <p style={{ display: "none" }}>{code}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1px",
              color: "black",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ width: "1.25rem" }}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5m8 6L5 7l-4 4"
              />
            </svg>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, color1, color2)",
                color: "black", // Ensure all text is black
              }}
            >
              {index_no}
            </span>
          </div>
        </a>
      </div>

      <Modal show={verificationModal} onClose={setVerificationModal}>
        <button
          className="self-end text-odtheme focus:outline-none absolute top-2"
          onClick={() => setVerificationModal(!verificationModal)}
        >
          <span className="sr-only">Close menu</span>
          <RxCross2 className="w-5 h-5" />
        </button>
        <section className="space-y-4">
          <div className="space-y-5">
            <p className="text-center font-semibold text-xl">
              Verify {toolsName}
            </p>
            <p className="text-center">
              Verify {url || "#"} for free to gain edit rights and boost
              credibility
            </p>
          </div>
          <hr />
          <div className="space-y-5">
            <p className="text-odtheme/40">Benefits of getting verified</p>
            <div className="space-y-3">
              <p>
                - Removes the need for manual edits by our team, which cost $49
                each
              </p>
              <p>- Verified AIs get more attention and clicks</p>
            </div>

            <p className="text-odtheme/40">Verification steps</p>
            <div className="space-y-3">
              <p>
                {" "}
                1. Place the embed code below on your website:{url || "#"}{" "}
              </p>
              <p> 2. Click the button below to verify.</p>
            </div>

            <div className="flex gap-2">
              <div className="flex items-center justify-between px-3 py-2 divide-x rounded-lg bg-odtheme/5 gap-x-2">
                <div className="flex flex-col items-start text-xs md:text-base">
                  <p className="">Featured on</p>
                  <Image
                    src={logo}
                    alt="100-AiTools-Logo"
                    className="h-6 w-fit lg:h-8"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <RxDoubleArrowUp className="w-5" />
                  <span className="text-xs font-semibold md:text-lg text-gradient">
                    {index_no}
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleCopyClick()}
                className="flex items-center gap-1 px-3 py-2 text-sm border-2 rounded-lg cursor-pointer border-odtheme/10 md:gap-2 md:text-base"
              >
                <CopyIcon className="w-5"/>
                <p>Copy Embed Code</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleVerification}
                className="justify-center"
                variant="primary"
                disabled={isCheckVerification}
              >
                {isCheckVerification ? "Please wait" : "Code placed, verify!"}
              </Button>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
}
