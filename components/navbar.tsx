"use client"

import React, { useState } from 'react'
import Image from 'next/image';
// import Logo from '../../assets/logo.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface navItems {
    name: string;
    link: string;
}
export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigation: navItems[] = [
        { name: 'Home', link: '/' },
        { name: 'Articles', link: '/articles' },
        { name: 'Categories', link: '/categories' },
        { name: 'About', link: '/about' },
    ];

    const pathname = usePathname();
    const isStudioRoute = pathname.startsWith('/studio');

    if (isStudioRoute) {
        return null; // Do not render Navbar on Sanity Studio routes
    }   
    return (
        <>
            {/* Mobile Navigation */}
            <div className='md:hidden bg-card absolute top-0 inset-x-0 w-full z-50'>
                <nav className={`${menuOpen ? 'h-fit' : 'h-16'} overflow-hidden transition-all duration-300 ease-in-out`}>
                    <div className='flex items-center justify-between px-4 py-4'>
                        <Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/logo.svg" alt="Logo" width={100} height={30} />
                        <button onClick={()=> setMenuOpen(!menuOpen)}
                            className={`${menuOpen ? 'items-center gap-0' : 'items-start gap-1.5'} px-3 group flex flex-col cursor-pointer outline-none border-none bg-transparent`}>
                            <span className={`${menuOpen ? ' rotate-45': 'rotate-0'} w-6 group-hover:w-6 h-0.5 duration-300 block bg-foreground`}></span>
                            <span className={`${menuOpen ? 'w-6 -rotate-45 -mt-0.5': 'rotate-0 mt-0'} w-3 group-hover:w-6 h-0.5 duration-300 block bg-foreground`}></span>
                        </button>
                    </div>
                    <div className='flex flex-col p-4 space-y-6'>
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.link}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className='px-4 py-8'>
                        <Button size={'lg'} asChild>
                            <a href='mailto:isofinsec@gmail.com'>
                                Let&apos;s Talk
                                <ArrowRight />
                            </a>
                        </Button>
                    </div>
                </nav>
            </div>
            {/* Desktop Navigation */}
            <div className='hidden md:block'>
                <nav className='max-w-6xl mx-auto my-4 px-4 py-3 xl:hover:bg-card duration-200 flex justify-between items-center rounded-lg'>
                    <div className='flex items-center gap-14'>
                        <Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/logo.svg" alt="Logo" width={100} height={30} />
                        <div className='flex items-center gap-5'>
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.link}>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Button size={'lg'} asChild>
                        <a href='mailto:isofinsec@gmail.com' className='no-underline'>
                            Let&apos;s Talk
                            <ArrowRight />
                        </a>
                    </Button>
                </nav>
            </div>
        </>
    )
}
export default Navbar;