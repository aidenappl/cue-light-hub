"use client";
import { useEffect, useRef, useState } from "react";
import { DropdownItems } from "./Dropdown.types";
import { useRouter } from "next/navigation";

interface DropdownProps {
  children?: React.ReactNode;
  items: DropdownItems[];
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children, items } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  const styleTypes = {
    bold: "text-gray-900 font-semibold",
    normal: "text-gray-700",
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Attach the listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="cursor-pointer relative inline-block text-left z-10"
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="text-nowrap inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
        >
          {children}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        role="menu"
        hidden={!isOpen}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`hover:bg-gray-100 hover:text-gray-900 select-none cursor-pointer block px-4 py-2 text-sm ${
                item.style ? styleTypes[item.style] : styleTypes.normal
              }`}
              role="menuitem"
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();
                navigate.push(item.href!);
              }}
              id={`menu-item-${index}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dropdown;
