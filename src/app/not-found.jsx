import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-4 text-gray-700'> 
      <h2 className='font-bold text-lg sm:text-2xl'>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <div className='flex sm:flex-row gap-3'>
        <Link href="/dashboard" className='py-2 px-4 rounded border text-blue-500 border-blue-500 ease-transition hover:border-gray-500'>Go Back</Link>
        <Link href="/dashboard" className='py-2 px-3 rounded text-white bg-blue-500 ease-transition hover:bg-blue-700'>Return Home</Link>
      </div>
    </div>
  )
}