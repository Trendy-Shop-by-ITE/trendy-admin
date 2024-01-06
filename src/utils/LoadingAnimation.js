import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../asset/Animation.json'; // Replace with the path to your animation file

const LoadingAnimation = () => {
    return (
        <div>
            <Lottie
                animationData={animationData}
                loop
                autoplay
                speed={1.5}
                style={{ width: 200, height: 200 }}
            />
        </div>
    );
};

export default LoadingAnimation;
