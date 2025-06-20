import React from 'react';
import { Suspense } from 'react';

export default async function Page({ params }) {
    const { truckId } = await params;

    return (
        <div className="flex items-center justify-center h-screen">
            <Suspense fallback={<div>Loading...</div>}> 
                params.truckId: {truckId}
            </Suspense>
        </div>
    );
}
