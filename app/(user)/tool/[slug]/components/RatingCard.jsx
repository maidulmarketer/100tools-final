import { format } from "date-fns";
import Rating from "./Rating";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";

export default function RatingCard({ item, created_at }) {
  return (
    <div className="py-5 space-y-4" key={item.slug}>
      <div className="flex items-center gap-3">
        <MdOutlineVerified className="w-5 h-5 text-green-400" />
        <p className="font-bold">
          {item.user.first_name + " " + item.user.last_name}
        </p>
        <Rating averageRating={item.rating} />
      </div>
      <div>{item.review}</div>
      {item.pros && (
        <div className="flex items-center gap-2">
          <FaThumbsUp className="text-green-300 w-5 mr-1" /> {item.pros}
        </div>
      )}
      {item.cons && (
        <div className="flex items-center gap-2">
          <FaThumbsDown className="text-red-300 w-5 mr-1" /> {item.cons}
        </div>
      )}

      <p className="text-sm text-odtheme/40">{format(new Date(created_at), "dd LLL")}</p>
    </div>
  );
}
