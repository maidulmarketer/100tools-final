import { useForm } from "react-hook-form";
import { useState } from "react";
import { submitFeedback } from "@/services/user/toolsService";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import Button from "@/components/buttons/Button";
import Input from "@/components/forms/Input";
import StarRating from "@/components/feedback/StarRating";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function AddFeedback({ feedbackName, slug, refetch }) {
  const [backendErrors, setBackendErrors] = useState({});
  const [rating, setRating] = useState("");
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rating: "",
      review: "",
      pros: "",
      cons: "",
    },
  });


  function onSubmit(data) {
    if (!isAuthenticated) {
      signIn("google");
    } else {
      if (!rating) {
        setBackendErrors({ ...backendErrors, rating: "Please select rating" });
      } else {
        const payload = { ...data, rating: rating, tool_slug: slug };

        const promise = submitFeedback(payload)
          .then((res) => {
            setBackendErrors({});
            setRating("");
            reset();
            refetch();
          })
          .catch((err) => {
            setBackendErrors(err.response.data);
            throw err;
          });

        toast.promise(promise, {
          loading: "submitting your feedback",
          success: "Feedback submitted successfully",
          error: "Failed...!, Please try again",
        });
      }
    }
  }

  return (
    <div className="space-y-5 border rounded-xl py-9 px-8 w-full md:w-3/5 border-odtheme/10">
      <div className="flex flex-col gap-2 flex-wrap">
        <h5 className="text-2xl font-bold">
        Share your thoughts {feedbackName}
        </h5>
        <p className="text-base">
        Share your thoughts {feedbackName}
        </p>
        <div className="pt-3">
          <StarRating rating={rating} setRating={setRating} />
          {backendErrors && (
            <p className="text-red-400">{backendErrors.rating}</p>
          )}
        </div>
      </div>

      {/* <hr className="border-odtheme/10" /> */}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-center w-full gap-5">
          <div className="flex items-center border-b-2 border-odtheme/10 w-full">
            <FaThumbsUp className="text-green-200 mr-1 w-5" />
            <Input
              register={{
                ...register("pros"),
              }}
              error={errors.pros}
              backendError={backendErrors.pros}
              placeholder="Pros"
              className="border-0 bg-transparent px-1 rounded-none focus:outline-0"
            />
          </div>
          <div className="flex items-center border-b-2 border-odtheme/10 w-full">
            <FaThumbsDown className="text-red-200 mr-1 w-5" />
            <Input
              register={{
                ...register("cons"),
              }}
              error={errors.cons}
              backendError={backendErrors.cons}
              placeholder="Cons"
              className="border-0 bg-transparent px-1 rounded-none focus:outline-0"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center w-full gap-5">
          <Input
            register={{
              ...register("review"),
            }}
            error={errors.review}
            backendError={backendErrors.review}
            placeholder="Write your thoughts"
            className="border-0 bg-transparent border-b-2 border-odtheme/10 rounded-none px-1 focus:outline-0"
          />

          <Button
            type="submit"
            variant="secondaryOutlined"
            className="bg-odtheme/10 border-0"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
