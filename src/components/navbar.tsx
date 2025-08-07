import { MiniModal } from "./modal";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-5 py-3 border-b border-gray-100">
      <div>
        <input
          className="px-5 border py-2 rounded-lg border-gray-400 bg-gray-100"
          type="text"
          placeholder="search your country . . ."
        />
      </div>
    <MiniModal title1="Light" title2="Dark" title3="Settings"/>
    </nav>
  );
};
