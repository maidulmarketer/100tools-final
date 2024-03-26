import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SearchModal({
  show,
  onClose,
  children,
  width,
  positionFromLeft,
  formTopPosition
}) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div
          style={{ left: `${positionFromLeft || 0}px`, top: `${formTopPosition ||  0}px` }}
          className={`fixed top-[2590px] z-10 pl-1`}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              style={{ width: `${width}px` }}
              className="relative h-full md:h-[464px] py-3 px-5 flex flex-col text-left transition-all transform bg-dtheme text-odtheme rounded-xl"
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
