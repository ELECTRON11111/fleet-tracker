"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const TruckMap = dynamic(() => import("../../../components/TruckMap"), { ssr: false });

export default function Page() {
    const [truck, setTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [route, setRoute] = useState([]);

    const intervalRef = useRef(null);
    
    const { truckId } = useParams();
    const router = useRouter();

    const fallBackMapUI = (
        <div id="center-div" className='text-center rounded-md py-6 px-8 bg-white text-gray-500 gap-3 flex flex-col items-center justify-center'>
            <div className='p-3 rounded-full bg-blue-500 text-white '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            </div>
            <h1 className='my-2 font-semibold text-2xl text-black'>{truckId}</h1>
            <p>Some City</p>
            <span id="coordinates-location">{"lat"}, {"long"}</span>
        </div>
    );

    useEffect(() => {
        setLoading(true);

        // get truck data from local storage
        const trucks = JSON.parse(localStorage.getItem('trucks')) || [];

        if (trucks.length === 0) {
            // If no trucks are available, redirect to dashboard
            router.push('/dashboard');
            return;
        }
        
        // Find the truck with the given truckId
        const foundTruck = trucks.find(truck => truck.id === truckId);
        setTruck(foundTruck || null);

        if (foundTruck) {
            setRoute([[foundTruck.location.lat, foundTruck.location.lng]]);
        }

        setTimeout(() => setLoading(false), 2000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        } 
    }, [truckId]);

    // Simulate movement for "In Transit"
    useEffect(() => {
        if (!truck || truck.status !== "In Transit") return;
        intervalRef.current = setInterval(() => {
            setTruck(prev => {
                if (!prev) return prev;
                // Move slightly northeast
                const newLat = prev.location.lat + (Math.random() * 0.001);
                const newLng = prev.location.lng + (Math.random() * 0.001);
                const newLocation = { ...prev.location, lat: newLat, lng: newLng };
                setRoute(r => [...r, [newLat, newLng]]);
                return { ...prev, location: newLocation };
            });
        }, 10000); // every 10 seconds

        return () => clearInterval(intervalRef.current);
    }, [truck]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading truck data...</p>
                </div>
            </div>
        );
    };

    return (
        <div id="truck-details-page" className='bg-gray-100 min-h-screen pt-16 sm:pt-20'>
            <header className='w-full flex justify-between fixed top-0 left-0 items-center p-4 sm:p-6 bg-white shadow'>
                <div id="left-content" className='flex items-center gap-2 sm:gap-4'>
                    <button 
                        id="back-btn" 
                        className='text-gray-600 px-3 py-2 ease-transtion hover:bg-blue-50 rounded-lg text-sm flex items-center ease-transition gap-2' 
                        onClick={() => router.push('/dashboard')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <p className='hidden sm:inline'>Back to Dashboard</p>
                    </button>

                    <div id="logo-truck-id" className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>

                        <h1 className='font-bold sm:text-lg'>Truck {truckId}</h1>
                    </div>
                </div>

                <span 
                    className={ truck.status === "In Transit" ?
                        `text-xs text-green-500 p-1 px-2 rounded-3xl bg-green-100 border border-green-200`
                        : truck.status === "Idle" ?
                        `text-xs text-orange-500 p-1 px-2 rounded-3xl bg-orange-100 border border-orange-200`
                        :`text-xs text-red-500 p-1 px-2 rounded-3xl bg-red-100 border border-red-200`
                    }
                >
                    {truck.status}
                </span>
            </header>

            <main className='p-6 flex w-full flex-col md:mt-12 gap-6 md:flex-row md:gap-8 lg:gap-12'>
                {/* 
                ================================================================================================================================================
                    TRUCK INFORMATION SECTION
                ________________________________________________________________________________________________________________________________________________
                */}

                <div id="truck-info" className='text-gray-500 bg-white w-full space-y-4 p-4 sm:p-6 rounded-md md:basis-[35%]'>
                    <h1 className='text-black font-bold text-lg sm:text-xl'>Truck Information</h1>

                    <div id="id" className='space-y-2'>
                        <h2>Truck Id</h2>
                        <p className='text-black font-semibold'>{truckId}</p>
                    </div>

                    <div id="driver" className='space-y-2'>
                        <h2>Driver</h2>
                        <div className='flex items-center gap-2 text-sm sm:text-base'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                            <p className='text-black font-semibold'>{truck.driver}</p>
                        </div>
                    </div>

                    <div id="status" className='space-y-2'>
                        <h2>Status</h2>
                        <div className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                            </svg>

                            <span 
                                className={ truck.status === "In Transit" ?
                                    `text-xs text-green-500 p-1 px-2 rounded-3xl bg-green-100 border border-green-200`
                                    : truck.status === "Idle" ?
                                    `text-xs text-orange-500 p-1 px-2 rounded-3xl bg-orange-100 border border-orange-200`
                                    :`text-xs text-red-500 p-1 px-2 rounded-3xl bg-red-100 border border-red-200`
                                }
                            >
                                {truck.status}
                            </span>
                        </div>
                    </div>

                    <div id="location" className='flex flex-col gap-2'>
                        <h2>Location</h2>
                        <div className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <p className='text-black font-semibold'>{truck.location.city}</p>
                        </div>
                        <span id="coordinates">{truck.location.lat}, {truck.location.lng}</span>
                    </div>
                </div>

                {/* 
                ================================================================================================================================================
                    CURRENT LOCATION SECTION
                ________________________________________________________________________________________________________________________________________________
                */}

                <div id="current-location" className='text-gray-500 w-full bg-white space-y-2 p-4 sm:p-6 rounded-md md:basis-[65%]'>
                    <h1 className='text-black font-bold p-2 text-lg sm:text-xl'>Current Location</h1>  
                    <Suspense fallback={fallBackMapUI}>
                        {truck ? (
                            <TruckMap
                                position={[truck.location.lat, truck.location.lng]}
                                route={route}
                            />
                        ) : (
                            <div id='map' className='bg-gradient-to-br from-blue-200 min-h-[50vh] ease-transition to-green-100 rounded-md p-6 sm:p-12 cursor-pointer w-full flex items-center justify-center'>
                                {fallBackMapUI}
                            </div>
                        )}
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
