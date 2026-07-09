"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";


export default function Test() {

    useGSAP(() => {

        gsap.registerPlugin(SplitText);
        const split = SplitText.create(".animate", {
            type: "words, chars, lines",

        });

        gsap.from(split.words, {
            y: 100,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 1
        })



    })




    return (
        <section className="relative w-full min-h-[100vh] z-100 bg-amber-500">
            <div className="w-full h-full flex flex-col justify-center items-center ">
                <p className="text-5xl ">hello</p>
                <h1 className=" animate text-2xl  mt-10 overflow-hidden">This is a SplitTest Animation.</h1>
            </div>
        </section>
    )

}