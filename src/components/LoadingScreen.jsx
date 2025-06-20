import Spinner from './Spinner';
import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-screen" id="Loading Screen">
            <Spinner />
            <p className="text-gray-600">Loading dashboard ...</p>
        </div>
    );
}

export default LoadingScreen;
