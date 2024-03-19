import { AiOutlineStar } from "react-icons/ai";

function Rating({ averageRating }) {
  const fullStars = Math.floor(averageRating);
  const partialStar = averageRating - fullStars;

  return (
    <div className="flex items-center justify-center">
      {[...Array(5)].map((_, index) => (
        <div key={index} className=" flex items-center w-6 h-6">
          <span
            className={`star ${
              index < fullStars ? "text-black" : "text-gray-400"
            } text-2xl`}
          >
            &#9733;
          </span>
        </div>
      ))}
    </div>
  );
}

export default Rating;