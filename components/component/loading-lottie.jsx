// src/components/Loading.js
"use client"
import React from 'react';
import Lottie from 'react-lottie';


const Loading = ({animation}) => {
    const defaultOptions = {
        loop: true, // Lặp lại animation
        autoplay: true, // Tự động phát
        animationData: animation, // Dữ liệu animation
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice' 
        }
    };

    return (
        <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Lottie options={defaultOptions} height={800} width={800} />
        </div>
    );
};

export default Loading;
