import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'
import {
  Dialog,
  Listbox,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineDown } from 'react-icons/ai'

const roles = ['customer', 'seller', 'admin']

const UpdateUserModal = ({ setIsOpen, isOpen, role, updaterole }) => {
  const [selected, setSelected] = useState(role)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        {/* Background Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal Wrapper */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-sm sm:max-w-md md:max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 py-8 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg sm:text-xl font-semibold text-center text-gray-900"
                >
                  Update User Role
                </DialogTitle>

                {/* Dropdown */}
                <div className="mt-6 w-full">
                  <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                        <span className="block truncate">{selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <AiOutlineDown className="h-4 w-4 text-gray-400" />
                        </span>
                      </ListboxButton>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                          {roles.map((role, idx) => (
                            <ListboxOption
                              key={idx}
                              className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-green-100 hover:text-green-900"
                              value={role}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {role}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                      <BsCheckLg className="h-4 w-4" />
                                    </span>
                                  )}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* Divider */}
                <hr className="my-8" />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => updaterole(selected)}
                    type="button"
                    className="w-full sm:w-auto inline-flex justify-center rounded-md bg-green-100 px-5 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="w-full sm:w-auto inline-flex justify-center rounded-md bg-red-100 px-5 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition"
                  >
                    Cancel
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

UpdateUserModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  updaterole: PropTypes.func.isRequired,
}

export default UpdateUserModal
