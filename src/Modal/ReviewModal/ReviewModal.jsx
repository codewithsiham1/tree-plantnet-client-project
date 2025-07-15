import { useState } from "react";
import Button from "../../Shared/Button/Button";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";

const ReviewModal = ({ plantId, orderId, closeModal, refetch }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const review = { rating: parseInt(rating), comment, plantId, orderId };
      const res = await axiosSecure.post("/review", review);
      if (res.data?.insertedId) {
        toast.success("Review submitted successfully!");
        closeModal();
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="flex justify-center">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-lime-500 inline-block w-fit">
            Write a Review
          </h2>
        </div>
        <form onSubmit={handlesubmit}>
          <label className="block mb-2 font-medium">Rating</label>
          <select
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-lime-500"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Comment</label>
          <textarea
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-lime-500"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <div className="flex justify-end space-x-2">
            <Button onClick={closeModal} label="Cancel" type="button" />
            <Button label="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
