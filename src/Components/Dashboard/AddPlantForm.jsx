import { useState } from "react"
import { imageUpload } from "../../api/Utils"
import Useauth from "../../Hooks/Useauth"
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"
import { shortImageName } from "../../Utilities"

const AddPlantForm = () => {
  const { user } = Useauth()
  const [uploadButton, setUploadButton] = useState({ name: "Upload Image" })
  const [loading, setLoading] = useState(false)
  const axiosSecure = useAxiosSecure()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const category = form.category.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageUrl = await imageUpload(image)

    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    const plantData = {
      name,
      description,
      category,
      price,
      quantity,
      image: imageUrl,
      seller,
    }

    try {
      const { data } = await axiosSecure.post("/plants", plantData, {
        withCredentials: true,
      })
      toast.success("Plant added successfully!")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add Plant</title>
      </Helmet>
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 py-10 bg-gray-50 text-gray-800">
        <form onSubmit={handleSubmit} className="w-full max-w-6xl bg-white p-6 md:p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-8 text-center text-green-700">Add a New Plant</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side */}
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Plant Name"
                  required
                  className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                />
              </div>

              {/* Category */}
              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600 font-medium">Category</label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Succulent">Succulent</option>
                  <option value="Flowering">Flowering</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600 font-medium">Description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Write plant description here..."
                  required
                  className="w-full h-32 px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                ></textarea>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Price & Quantity */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full space-y-1 text-sm">
                  <label htmlFor="price" className="block text-gray-600 font-medium">Price</label>
                  <input
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price per unit"
                    required
                    className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                  />
                </div>
                <div className="w-full space-y-1 text-sm">
                  <label htmlFor="quantity" className="block text-gray-600 font-medium">Quantity</label>
                  <input
                    name="quantity"
                    id="quantity"
                    type="number"
                    placeholder="Available quantity"
                    required
                    className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-gray-600 font-medium">Upload Image</label>
                <div className="file_upload px-4 py-3 border-2 border-dashed border-gray-300 rounded-md text-center">
                  <label className="cursor-pointer inline-block bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600">
                    {uploadButton.name}
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                      onChange={(e) => setUploadButton(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 rounded-md transition duration-200"
              >
                {loading ? "Submitting..." : "Save & Continue"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddPlantForm;
