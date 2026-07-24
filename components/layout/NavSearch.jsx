import { FiSearch } from "react-icons/fi";

export default function NavSearch() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        className="
          h-14
          w-full
          rounded-full
          border-2
          border-border
         
          pl-5
          pr-14
          outline-none
         
          transition
          focus:border-primary
        "
      />

      <button
        className="
          absolute
    right-1
    top-1
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-full
    bg-primary
    text-white
    transition
    hover:bg-secondary
        "
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
}
