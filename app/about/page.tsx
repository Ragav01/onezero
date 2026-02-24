import Image from 'next/image'
import ImgA from '../assets/post-hobbies.jpg'
import ImgB from '../assets/slide-entertainment.jpg'
import ImgC from '../assets/slide-technology.jpg'

const About = () => {
  return (
    <div className='main'>
        <h1 className='mt-10 text-2xl md:text-4xl font-semibold text-center md:w-1/2 mx-auto'>Connecting people with ideas that inform, inspire, and empower</h1>
        <div className='my-6 md:my-16 grid grid-cols-2 grid-rows-2 gap-4 h-100 md:h-150'>
            <div className='relative row-span-2'>
                <Image src={ImgA} alt='about' fill className='object-cover rounded-md' />
            </div>
            <div className='relative'>
                <Image src={ImgB} alt='about' fill className='object-cover rounded-md' />
            </div>
            <div className='relative'>
                <Image src={ImgC} alt='about' fill className='object-cover rounded-md' />
            </div>
        </div>
        <div className='pb-16 md:w-1/2 mx-auto space-y-3'>
            <h2 className='text-lg md:text-2xl font-semibold'>We’re here to create meaningful solutions that help businesses, communities, and individuals thrive in a rapidly changing environment.</h2>
            <p>From global business shifts to cultural movements, emerging technology to everyday passions, we publish journalism that goes beyond headlines. Our magazine exists for readers who value context, depth, and ideas that stay relevant long after the news cycle moves on.</p>
            <p>To lead innovation globally, empowering people and businesses to create lasting impact and meaningful growth.</p>
            <p>We provide people-focused strategies and solutions that spark change, foster success, and drive industries forward.</p>
        </div>
    </div>
  )
}

export default About