import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SunIcon, MoonIcon, CogIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  title1: string;
  title2: string;
  title3: string;
}

export const MiniModal = ({ title1, title2, title3 }: ModalProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <Menu>
        <MenuButton className="cursor-pointer rounded-lg p-4 hover:bg-yellow-500 transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="18"
            height="18"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(5.33333,5.33333)">
                <path d="M47,22v2.5c0,0.911 -0.539,1.736 -1.374,2.101l-4.2,1.838c-0.43,1.691 -1.095,3.283 -1.965,4.745l2.217,5.666l-1.768,1.768c-0.644,0.644 -1.609,0.846 -2.458,0.514l-4.268,-1.67c-1.462,0.87 -3.055,1.535 -4.746,1.965l-2.438,5.573h-2.5c-0.911,0 -1.736,-0.539 -2.101,-1.374l-1.838,-4.2c-1.691,-0.43 -3.283,-1.095 -4.745,-1.965l-5.666,2.217l-1.767,-1.768c-0.644,-0.644 -0.846,-1.609 -0.514,-2.458l1.67,-4.268c-0.871,-1.462 -1.535,-3.055 -1.965,-4.746l-5.574,-2.438v-2.5c0,-0.911 0.539,-1.736 1.374,-2.101l4.2,-1.838c0.43,-1.691 1.095,-3.283 1.965,-4.745l-2.217,-5.665l1.768,-1.768c0.644,-0.644 1.609,-0.846 2.457,-0.514l4.268,1.67c1.462,-0.87 3.054,-1.535 4.746,-1.965l2.439,-5.574h2.5c0.911,0 1.736,0.539 2.101,1.374l1.838,4.2c1.691,0.43 3.283,1.095 4.745,1.965l5.666,-2.217l1.768,1.768c0.644,0.644 0.846,1.609 0.514,2.457l-1.67,4.268c0.871,1.462 1.535,3.055 1.965,4.746zM24,14c-5.523,0 -10,4.478 -10,10c0,5.522 4.478,10 10,10c5.522,0 10,-4.478 10,-10c0,-5.522 -4.478,-10 -10,-10z"></path>
              </g>
            </g>
          </svg>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-36 origin-top-right rounded-xl border border-gray-200 bg-gray-200 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex cursor-pointer w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <SunIcon className="size-4" />
              {title1}
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-gray-400" />
          <MenuItem>
            <button className="group cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <MoonIcon className="size-4" />
              {title2}
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-gray-400" />
          <MenuItem>
            <button
              onClick={() => navigate("/settings")}
              className="group cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
            >
              <CogIcon className="size-4" />
              {title3}
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};
