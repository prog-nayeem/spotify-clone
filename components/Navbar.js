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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { data: session } = useSession();

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
      <nav className="flex items-center justify-between px-10 h-16">
        <div className="flex items-center space-x-4">
          <span className="p-2 text-white bg-slate-600 text-xl rounded-full cursor-pointer">
            <IoIosArrowBack />
          </span>
          <span className="p-2 text-slate-400 text-xl bg-slate-600 rounded-full cursor-pointer">
            <IoIosArrowForward />
          </span>
        </div>
        <div className="flex items-center space-x-5">
          <button className="uppercase text-sm text-white px-8 border  hover:border-white py-2 rounded-full bg-black hover:scale-110 transform">
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
                      <div className="bg-black mt-2 rounded-md text-white w-52">
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
