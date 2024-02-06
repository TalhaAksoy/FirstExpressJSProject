const Navbar = () => {
  return (
    <>
      <nav className="flex justify-around items-center w-full border-b-2 border-yellow-500 h-[3rem]">
        <span className="text-xl font-bold">LOGO</span>

        <ul className="flex justify-between items-center w-1/2">
          <li className="select-none hover:cursor-pointer">Home</li>
          <li className="select-none hover:cursor-pointer">About</li>
          <li className="select-none hover:cursor-pointer">Page 1</li>
          <li className="select-none hover:cursor-pointer">Page 2</li>
          <li className="select-none hover:cursor-pointer">Page 3</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
