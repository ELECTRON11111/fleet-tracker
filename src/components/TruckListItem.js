import React from 'react';

const TruckListItem = ({ truckId, truckStatus, truckDriver, truckCity }) => {
    return (
        <div 
            key={truckId} 
            className="truck-list-item cursor-pointer flex flex-col gap-2 text-gray-500 ease-transition bg-white border border-gray-300 rounded-lg p-4 w-full hover:shadow-md"
        >
            <div className='flex items-center justify-between gap-3 w-full'>
                <h1 className='text-black font-semibold text-xl'>{truckId}</h1>
                <span 
                    className={ truckStatus === "In Transit" ?
                        `text-xs text-green-500 p-1 px-2 rounded-3xl bg-green-100 border border-green-200`
                        : truckStatus === "Idle" ?
                        `text-xs text-orange-500 p-1 px-2 rounded-3xl bg-orange-100 border border-orange-200`
                        :`text-xs text-red-500 p-1 px-2 rounded-3xl bg-red-100 border border-red-200`
                    }
                >
                    {truckStatus}
                </span>
            </div>

            <div id="driver" className='text-sm mt-3 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <p>{truckDriver}</p>
            </div>

            <div id="location" className='text-sm flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p>{truckCity}</p>
            </div>
        </div>
    );
}

export default TruckListItem;
