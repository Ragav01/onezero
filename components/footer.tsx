'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface navItems {
    name: string;
    link: string;
}
interface categories {
    name: string;
    link: string;
}
const Footer = () => {
  const navigation: navItems[] = [
        { name: 'Home', link: '/' },
        { name: 'Articles', link: '/articles' },
        { name: 'Categories', link: '/categories' },
        { name: 'About', link: '/about' },
    ];
    const categories: categories[] = [
        { name: 'Business', link: '/business' },
        { name: 'Technology', link: '/technology' },
        { name: 'Automotive', link: '/automotive' },
        { name: 'Science', link: '/science' },
        { name: 'More', link: '/categories' },
    ];
    const pathname = usePathname();
        const isStudioRoute = pathname.startsWith('/studio');
    
        if (isStudioRoute) {
            return null; // Do not render Navbar on Sanity Studio routes
        }   
    return (
        <div className='bg-card w-full'>
            <div className='max-w-6xl mx-auto px-4 pt-14 pb-8'>
                <div className='grid  md:grid-cols-12 gap-10 md:gap-4'>
                    <div className='md:col-span-8 max-w-110 space-y-6'>
                        <Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/logo.svg" alt="Logo" width={100} height={30} />
                        <p>Delivering independent journalism, thought-provoking insights, and trustworthy reporting to keep you informed, inspired, and engaged with the world every day.</p>
                        <div className="flex gap-2">
                            <Link href="#"><Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/X.svg" alt="X" width={24} height={24} /></Link>
                            <Link href="#"><Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/instagram.svg" alt="Instagram" width={24} height={24} /></Link>
                            <Link href="#"><Image src="https://raw.githubusercontent.com/Ragav01/bi/78f7f0199a489c271ccf1e5c3b32c6972652859c/images/facebook.svg" alt="Facebook" width={24} height={24} /></Link>
                        </div>
                    </div>
                    <div className='md:col-span-4 flex flex-row md:justify-end gap-12 md:gap-16'>
                        <div>
                            <p className='uppercase text-sm font-medium'>Quick Link</p>
                            <ul className='py-3 space-y-3'>
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.link} className='text-foreground-muted hover:text-foreground hover:underline'>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className='uppercase text-sm font-medium'>Categories</p>
                            <ul className='py-3 space-y-3'>
                                {categories.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.link} className='text-foreground-muted hover:text-foreground hover:underline'>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
                <div className='mt-4 pt-6 flex flex-wrap-reverse md:flex-row gap-2 md:gap-6 text-foreground-muted'>
                    <p className='text-foreground-muted'>&copy; 2024 YourCompany. All rights reserved.</p>
                    <Link href={'#'} className='hover:text-foreground duration-150'>
                        Terms of Service
                    </Link>
                    <Link href={'#'} className='hover:text-foreground duration-150'>
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer