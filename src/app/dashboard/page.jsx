"use client";
import React, { useState } from 'react';
import TruckListItem from '@/components/TruckListItem';

const Page = () => {
    const [statusFilter, setStatusFilter] = useState("all");
    const [filteredTrucks, setFilteredTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const day = new Date().getDate();
    const month = new Date().getMonth() + 1; 
    const year = new Date().getFullYear();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayDivision = day.toString().split("");

    const today = `${day}${dayDivision.includes("1") ? "st" : dayDivision.includes("2") == 2 ? "nd" : dayDivision.includes("3") == 3 ? "rd" : "th"} ${months[month - 1]}, ${year}`;

    const trucks = [
        {
            id: "TRK001",
            driver: "John Doe",
            status: "In Transit",
            location: {
                city: "Dallas",
                lat: 32.7767,
                lng: -96.7970
            }
        },
        {
            id: "TRK002",
            driver: "Jane Smith",
            status: "Idle",
            location: {
                city: "Houston",
                lat: 29.7604,
                lng: -95.3698
            }
        },
        {
            id: "TRK003",
            driver: "Mike Johnson",
            status: "Maintenance",
            location: {
                city: "Austin",
                lat: 30.2672,
                lng: -97.7431
            }
        },
        {
            id: "TRK004",
            driver: "Sarah Wilson",
            status: "In Transit",
            location: {
                city: "San Antonio",
                lat: 29.4241,
                lng: -98.4936
            }
        },
        {
            id: "TRK005",
            driver: "Robert Brown",
            status: "Idle",
            location: {
                city: "Fort Worth",
                lat: 32.7555,
                lng: -97.3308
            }
        }
    ];

    // save trucks to local storage
    if (typeof window !== "undefined") {
        localStorage.setItem("trucks", JSON.stringify(trucks));
    }
    
    return (
        <div id='DashboardPage' className='bg-gray-100 pt-[3.5rem] min-h-screen sm:pt-20'>
            <header className='w-full flex justify-between fixed top-0 left-0 items-center p-4 sm:p-6 bg-white shadow'>
                <div className='flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>

                    <h1 className='font-bold sm:text-lg'>FleetTracker</h1>
                </div>

                <p className='text-sm'>{today}.</p>
            </header>

            <div id="dashboard" className='p-4 sm:px-8 sm:py-6'>
                {/* 
                ==============================================================================================================================================

                    DASHBOARD OVERVIEW 
                ______________________________________________________________________________________________________________________________________________
                */}

                <div id='overview' className='flex flex-col gap-3 sm:flex-row sm:gap-6 w-full'>
                    <div id="total-trucks" className='bg-white gap-4 ease-transition w-full flex flex-col justify-between p-4 rounded-lg hover:shadow-md'>
                        <div className='flex items-center w-full justify-between font-semibold text-gray-500'>
                            <h2 className='text-black'>Total Trucks</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                        </div>

                        <h1 className='font-extrabold mt-auto text-3xl'>5</h1>
                    </div>

                    <div id="trucks-in-transit" className='bg-white gap-4 ease-transition flex flex-col justify-between p-4 w-full rounded-lg hover:shadow-md'>
                        <div className='flex items-center w-full justify-between font-semibold text-gray-500'>
                            <h2 className='text-black'>In Transit</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>
                        </div>

                        <h1 className='font-extrabold mt-auto text-green-500 text-3xl'>2</h1>
                    </div>

                    <div id="idle-trucks" className='bg-white gap-4 ease-transition flex flex-col justify-between p-4 rounded-lg w-full hover:shadow-md'>
                        <div className='flex items-center w-full justify-between font-semibold text-gray-500'>
                            <h2 className='text-black'>Idle</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange    " className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                            </svg>
                        </div>

                        <h1 className='font-extrabold mt-auto text-orange-500 text-3xl'>2</h1>
                    </div>

                    <div id="maintenance-trucks" className='bg-white ease-transition gap-4 flex flex-col justify-between p-4 w-full rounded-lg hover:shadow-md'>
                        <div className='flex items-center w-full justify-between font-semibold text-gray-500'>
                            <h2 className='text-black'>Avg Idle TIme</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                            </svg>
                        </div>

                        <h1 className='font-extrabold mt-auto text-red-500 text-3xl'>1.06</h1>
                    </div>
                </div>

                {/* 
                ==============================================================================================================================================

                    FLEET OVERVIEW 
                ______________________________________________________________________________________________________________________________________________
                */}

                <div id='fleet-overview'>
                    <div id="heading" className='w-full flex items-center py-6 sm:py-7 justify-between gap-4'>
                        <h1 className='font-semibold sm:text-xl'>Fleet Overview</h1>

                        <select name="filter" id="Filter" className='cursor-pointer text-sm p-2 outline-none rounded-lg'>
                            <option value="All">All Status</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Idle">Idle</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>

                    <div id="trucks-listing" className='flex flex-col gap-4 sm:gap-6 w-full md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {trucks.map(truck => (
                            <TruckListItem 
                                key={truck.id}
                                truckId={truck.id} 
                                truckStatus={truck.status} 
                                truckDriver={truck.driver} 
                                truckCity={truck.location.city}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
