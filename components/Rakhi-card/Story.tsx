"use client";

import Image from "next/image";

export default function Story() {
    return (
        <section
            id="rakhi-next-section"
            className="relative z-20 w-full min-h-[100dvh] flex flex-col items-center justify-center py-16 px-6 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
            style={{
                background: "#FFF8F0",
                borderTopLeftRadius: "100px",
                borderTopRightRadius: "100px",
            }}
        >
            <div className="w-full max-w-[430px] mx-auto flex flex-col items-center">
                {/* Top small header */}
                <p
                    className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                    style={{
                        fontFamily: "var(--font-body, Poppins, sans-serif)",
                        color: "#6B7280",
                    }}
                >
                    WISHING YOU A
                </p>

                {/* Divider thread line: left and right, space in middle for butterfly */}
                <div className="flex items-center justify-between w-full px-4 gap-2 mb-6">
                    <div className="flex-1 h-[12px] relative">
                        <Image
                            src="/Rakhi-card-media/red-line.png"
                            alt="Decorative thread"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Target anchor for butterfly landing */}
                    <div
                        id="butterfly-end-anchor"
                        className="w-16 h-16 relative flex items-center justify-center flex-shrink-0"
                    >
                        {/* The global butterfly will fly here! */}
                    </div>

                    <div className="flex-1 h-[12px] relative scale-x-[-1]">
                        <Image
                            src="/Rakhi-card-media/red-line.png"
                            alt="Decorative thread flipped"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Photo Container with Hand-Drawn Frame */}
                <div className="relative w-[300px] h-[400px] my-1 flex items-center justify-center">
                    {/* Sibling photo placed inside/behind the frame */}
                    <div className="absolute w-[75%] h-[83%] overflow-hidden rounded-[16px] top-[7.5%] left-[12%]">
                        <Image
                            src="/Rakhi-card-media/photo-3.jpg"
                            alt="Sibling moment"
                            fill
                            className="object-cover"
                            sizes="250px"
                            priority
                        />
                    </div>

                    {/* Polaroid Frame Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                        <Image
                            src="/Rakhi-card-media/Story-frame.png"
                            alt="Story Frame"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Cursive Handwriting Coda */}
                <h2
                    className="text-4xl mt-4 select-none"
                    style={{
                        fontFamily: "var(--font-script, 'Great Vibes', cursive)",
                        color: "var(--rakhi-maroon)",
                    }}
                >
                    Happy Rakshabandhan
                </h2>
            </div>
        </section>
    );
}
