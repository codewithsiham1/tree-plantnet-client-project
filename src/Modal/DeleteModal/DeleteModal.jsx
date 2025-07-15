import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'

const DeleteModal = ({ closeModal, isOpen, handleDelete }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm' />
        </TransitionChild>

        {/* Modal Container */}
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 sm:p-6 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-sm sm:max-w-md lg:max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg sm:text-xl font-semibold leading-6 text-gray-900'
                >
                  Are you sure?
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm sm:text-base text-gray-600'>
                    You cannot undo once it&apos;s done!
                  </p>
                </div>

                <hr className='my-6 border-gray-200' />

                <div className='flex flex-col sm:flex-row justify-end gap-3'>
                  <button
                    onClick={handleDelete}
                    type='button'
                    className='w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition'
                  >
                    Yes
                  </button>
                  <button
                    onClick={closeModal}
                    type='button'
                    className='w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition'
                  >
                    No
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

DeleteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default DeleteModal
