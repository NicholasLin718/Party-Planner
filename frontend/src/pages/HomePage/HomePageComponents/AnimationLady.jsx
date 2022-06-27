import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function AnimationLady() {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../AnimationTest.json')
        });
        return () => {
            lottie.destroy();
        };
    }, []);

    return <div className='container' ref={container}></div>;
}

export default AnimationLady;
