import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="relative w-[100%] sm:h-20 h-16 text-white z-10">
      <nav className="fixed w-full flex bg-black">
        <div className="flex items-center justify-center sm:space-x-12 space-x-4 py-3 text-white w-[50%]">
          <Link href="/" passHref>
            <a
              className="rounded-md sm:py-2 sm:px-2 py-1 px-1 flex items-center sm:text-3xl text-center text-md font-bold leading-snug 
                                transition ease-in-out duration-300 hover:bg-white hover:text-black"
            >
              <span>
                Blogg
                <FontAwesomeIcon icon={faBookOpen} className="px-2" />
              </span>
            </a>
          </Link>
          <Link href="/about" passHref>
            <a
              className="rounded-md sm:py-2 sm:px-2 px-1 py-1 flex items-center sm:text-3xl  text-md font-bold leading-snug 
                                transition ease-in-out duration-300 hover:bg-white hover:text-black"
            >
              <span>Info</span>
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-4 py-3 text-white w-[50%]">
          <a
            href="https://github.com/haraldvinje"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              className="text-white h-6 transition ease-in-out duration-300 hover:scale-125 hover:opacity-70"
              icon={faGithub}
              color="white"
            />
          </a>
          <a
            href="https://no.linkedin.com/in/haraldvinje"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              className="text-white h-6 transition ease-in-out duration-300 hover:scale-125 hover:opacity-70"
              icon={faLinkedinIn}
              color="white"
            />
          </a>
          <a
            href="https://www.instagram.com/haraldvinje/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              className="text-white h-6 transition ease-in-out duration-300 hover:scale-125 hover:opacity-70"
              icon={faInstagram}
              color="white"
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
