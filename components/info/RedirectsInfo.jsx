import { IoMdInformationCircleOutline } from "react-icons/io";

export default function RedirectsInfo() {
  return (
    <div className="flex gap-2 p-4 border rounded border-odtheme/5 bg-odtheme/5">
      <IoMdInformationCircleOutline className="w-8 h-8" />
      <div className="">
        <p>
          <span className="font-semibold">Permanent Checked:</span> 308 status
          code which instructs clients/search engines to cache the redirect
          forever.
        </p>
        <p>
          <span className="font-semibold">Permanent Unchecked:</span> 307 status
          code which is temporary and is not cached.
        </p>
      </div>
    </div>
  );
}
