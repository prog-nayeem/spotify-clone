import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoCaretBack } from "react-icons/io5";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { BsSearch } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { searchInputValue, showSearchInput } from "../atoms/searchAtom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { data: session } = useSession();
  const [input, setInput] = useRecoilState(searchInputValue);
  const [showInput, setShowInput] = useRecoilState(showSearchInput);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <nav className="flex items-center justify-between lg:px-10 px-6 h-16">
        <div className="flex items-center space-x-4">
          <span className="p-2 text-white bg-slate-600 text-xl rounded-full cursor-pointer">
            <IoIosArrowBack />
          </span>
          <span className="p-2 text-slate-400 text-xl bg-slate-600 rounded-full cursor-pointer">
            <IoIosArrowForward />
          </span>
          {showInput && (
            <div className="bg-white lg:w-80 w-52 md:w-60 hidden sm:inline-flex rounded-full !ml-7 items-center space-x-3 px-3 h-10">
              <BsSearch className="text-xl" />
              <input
                className="outline-none w-full placeholder:text-ellipsis placeholder:text-gray-400"
                type="text"
                placeholder="Artists,songs or products"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-5">
          <button className="uppercase hidden md:inline-block text-sm text-white px-8 border  hover:border-white py-2 rounded-full bg-black hover:scale-110 transform">
            Upgrade
          </button>
          <Stack>
            <div
              ref={anchorRef}
              onClick={handleToggle}
              className="flex items-center cursor-pointer bg-black text-white px-4 py-2 rounded-full space-x-2"
            >
              <CgProfile className="text-3xl" />
              <p className="text-sm font-semibold">{session?.user?.name}</p>
              <IoCaretBack className="-rotate-90 transform" />
              <div>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  className="z-40 shadow-sm"
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <div className="bg-black z-40 mt-2 rounded-md text-white w-52">
                        <MenuList autoFocusItem={open}>
                          <MenuItem
                            className="hover:bg-gray-800"
                            onClick={handleClose}
                          >
                            Account
                          </MenuItem>
                          <MenuItem
                            className="hover:bg-gray-800"
                            onClick={handleClose}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            className="hover:bg-gray-800"
                            onClick={signOut}
                          >
                            Log out
                          </MenuItem>
                        </MenuList>
                      </div>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
          </Stack>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
