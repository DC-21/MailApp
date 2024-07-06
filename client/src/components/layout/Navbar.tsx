const Navbar = () => {
  return (
    <nav className="p-2 w-full flex justify-between">
      <div className="mt-4 flex gap-4 items-center rounded-xl shadow shadow-black p-3">
        <input
          className="outline-none"
          placeholder="search emails"
          type="text"
        />
        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M18.319 14.433A8.001 8.001 0 006.343 3.868a8 8 0 0010.564 11.976l.043.045 4.242 4.243a1 1 0 101.415-1.415l-4.243-4.242a1.116 1.116 0 00-.045-.042zm-2.076-9.15a6 6 0 11-8.485 8.485 6 6 0 018.485-8.485z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
