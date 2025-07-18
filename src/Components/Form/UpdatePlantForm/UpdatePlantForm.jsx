import { toast } from "react-toastify"
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure"

const UpdatePlantForm = ({plant, setIsEditModalOpen, refetch }) => {
  const axiosSecure=useAxiosSecure()
  const handleSubmit=async(e)=>{
    e.preventDefault()
  const form=e.target
  const name=form.name.value
  const category=form.category.value
  const description=form.description.value
  const price=form.price.value
  const quantity=form.quantity.value
  const imageFile=form.image.files[0]
  let imageURL=plant.image
  if(imageFile){
    const formData=new FormData()
    formData.append('image',imageFile)
    try{
      const res=await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,{
        method:'POST',
        body:formData,
       })
       const imgData=await res.json()
       imageURL=imgData.data.url

    }catch(error){
      console.log(error)
      toast.error('Image upload failed')
      return
    }
  }
// updateplant
const updatedPlant={
  name,category,description,price,quantity,image:imageURL,
}
console.log(updatedPlant)
// fetchdata
try{
const res=await axiosSecure.patch(`/plants/${plant._id}`,updatedPlant)
if(res.data.modifiedCount>0){
  toast.success('Plant updated successfully!')
  refetch()
  setIsEditModalOpen(false)
}else {
  toast.info('No changes made.')
}
}catch(error){
  toast.error('Failed to update plant')
  console.log(error)
}
  }
  return (
    <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='name'
                id='name'
                type='text'
                placeholder='Plant Name'
                required
              />
            </div>
            {/* Category */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600 '>
                Category
              </label>
              <select
                required
                className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='category'
              >
                <option value='Indoor'>Indoor</option>
                <option value='Outdoor'>Outdoor</option>
                <option value='Succulent'>Succulent</option>
                <option value='Flowering'>Flowering</option>
              </select>
            </div>
            {/* Description */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>

              <textarea
                id='description'
                placeholder='Write plant description here...'
                className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
                name='description'
              ></textarea>
            </div>
          </div>
          <div className='space-y-6 flex flex-col'>
            {/* Price & Quantity */}
            <div className='flex justify-between gap-2'>
              {/* Price */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600 '>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                  required
                />
              </div>

              {/* Quantity */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Quantity
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div>
            </div>
            {/* Image */}
            <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
            >
              Update Plant
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdatePlantForm