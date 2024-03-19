import ToolsForm from "./components/ToolsForm";

export default function SubmitAiTools() {
  return (
    <div className=" flex flex-col px-6 bg-radials">
      <div
        id="header"
        className="flex flex-col justify-start lg:justify-center items-start lg:items-center gap-6 pt-14 pb-12"
      >
        <h1 className="font-bold text-3xl lg:text-6xl">
          Submit your
          <span className="text-gradient font-extrabold">AI tool</span>
        </h1>
        <p className="text-left lg:text-center text-sm lg:text-lg max-w-[640px]">
          AI low-code/no-code tools provide significant advantages, such as ease
          of use, rapid development, and minimal programming knowledge required.
          These tools can be utilized in various use cases, including:
        </p>
      </div>

      <div className="mx-auto max-w-[640px]">
        <ToolsForm />
        <p className="pt-8 pb-20">
          By clicking the “Submit” button, you acknowledge and agree to the
          following terms and conditions: We reserve the right to reject any
          submissions for any reason, and if that occurs, you will receive a
          full refund, excluding payment processing fees. If we approve and list
          your submissions, we reserve the right to remove them for any reasons
          we may have, at any time. However, this is solely for our protection,
          and we do not publish any content that promotes violence, graphic
          sexual content, terrorism, or any other objectionable material. Our
          guidelines are broad, and we hope that our common sense approach will
          be sufficient for everyone to understand. Our goal is to provide an
          excellent service, and If you are as well-intentioned as we are, we
          are both going to be happy.
        </p>
      </div>
    </div>
  );
}
