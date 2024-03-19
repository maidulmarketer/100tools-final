"use client";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "./Button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="secondaryOutlined"
      onClick={() => router.back()}
      className="p-2"
    >
      <AiOutlineArrowLeft className="w-5 h-5" />
    </Button>
  );
}
