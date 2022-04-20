import React, { useEffect, useState } from "react";
import Link from 'next/link'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        })
    }, [])

    return (

        <div className={`bg-top bg-cover bg-no-repeat bg-computer-image w-[100%] sm:h-24 h-16 overflow-hidden text-white`}>
            <nav className="fixed w-full">
                <div className={`flex items-center justify-between px-2 py-3 mb-3 text-white w-full ${scrolled && 'transition ease-in-out delay-150 text-slate-800 bg-white border-b-2 border-black'}`}>
                    <Link href="/" passHref>
                        <a
                            className="px-3 py-2 flex items-center sm:text-3xl text-md font-bold leading-snug hover:opacity-75 hover:underline"
                        >
                            <span className="ml-2">Hjem</span>
                        </a>
                    </Link>
                    <Link href="/about" passHref>
                        <a
                            className="px-3 py-2 flex items-center sm:text-3xl text-md font-bold leading-snug hover:opacity-75 hover:underline"
                        >
                            <span className="ml-2">Info</span>
                        </a>
                    </Link>
                </div>
            </nav>
        </div>
    );
}