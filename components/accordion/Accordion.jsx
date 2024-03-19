import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

export default function Accordion({ title, body }) {
  return (
    <Disclosure as="div" className="p-2 border rounded-md border-odtheme/10">
      <Disclosure.Button className="w-full">
        <div className="flex items-center justify-between w-full py-2 font-medium">
          {title} <FaChevronDown className="w-5 h-5 text-odtheme/50" />
        </div>
      </Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="text-sm font-medium text-odtheme">
          {body}
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
}
