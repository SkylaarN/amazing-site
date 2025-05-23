import React, { use } from 'react'
import { useRef, useState } from 'react'
import Button from "./button.js";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";


const Hero = () => {
    const [ currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [_isLoading, _setIsLoading] = useState(true);
    const [_loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }

    useGSAP(()=>{
    if (hasClicked) {
        gsap.set('#next-video', {visibility: 'visible'});
        gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onStart: () => nextVideoRef.current.play(),
        });
        gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 1.5,
            ease: 'power1.inOut',
        })
    }
    }, {dependencies: [currentIndex], revertOnUpdate: true})

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                        <video
                        ref={nextVideoRef}
                        src={getVideoSrc(upcomingVideoIndex)}
                        loop
                        muted
                        id='current-video'
                        className='size-64 origin-center scale-150 object-cover object-center'
                        onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>
                <video
                ref={nextVideoRef}
                src={getVideoSrc(currentIndex)}
                loop
                muted
                id='current-video'
                className='absolute-center invisible z-20 size-64 object-cover object-center'
                onLoadedData={handleVideoLoad} />
                <video
                src={getVideoSrc(currentIndex === totalVideos - 1? 1 : currentIndex)}
                autoPlay
                loop
                muted
                className="absolute left-0 top-0 size-full object-cover object-center"
                onLoadedData={handleVideoLoad}
                />
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                Silim<b>a</b>
            </h1>

            <div className="absolute top-0 left-0 size-full">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font hero-heading text-blue-75">
                       N<b>a</b>thi
                    </h1>

                    <p className="mb-5 max-w-64 font-robert-regular text-blue-75">
                        Enter the world of SkylaarN <br /> Dive in the coolest tech projects
                    </p>

                    <Button id="expolre-now" title="Explore Now" leftIcon={<TiLocationArrow/>} containerClass="!bg-yellow-300 flex-center gap-1"/>
                </div>
            </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-black">
            Silim<b>a</b>
        </h1>

    </div>
  )
}

export default Hero