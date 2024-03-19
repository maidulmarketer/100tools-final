import { generateFormData } from "@/lib/utils";
import Rating from "./Rating";
import { format } from "date-fns";

export default function AverageRating({ averageRating, ratings_distribution, rating_count }) {
  console.log(rating_count);
  const ratings = Object.keys(ratings_distribution);
  return (
    <div className="flex flex-col gap-5 w-full md:w-2/5 bg-[#F4F6FB] text-black px-9 py-16 rounded-xl">
      {/* <h3 className="font-bold text-xl">Reviews</h3> */}
      <div className="flex justify-between items-center">
      <div className="flex justify-start items-center">
        <Rating averageRating={averageRating} />
        <p className="font-medium text-sm">({rating_count}  Reviews)</p>
      </div>
        <p className="text-2xl font-black">{averageRating || "0.0"}<span className="text-base font-semibold">/5</span></p>
      </div>
      
      <div className="w-full">
        {ratings.map((rating) => (
          <div
            key={rating}
            className="flex justify-start gap-2 items-center w-full"
          >
            <p className="font-semibold ">{rating}</p>
            <p className="star text-2xl">&#9733;</p>

            <div className="flex items-center w-3/4 bg-gray-300 h-2 rounded">
              <div
                className="h-full bg-black rounded w-full"
                style={{ width: `${ratings_distribution[rating]}%` }}
              ></div>
            </div>
            <span className="ml-2 text-base font-semibold">
              {`${ratings_distribution[rating]}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
