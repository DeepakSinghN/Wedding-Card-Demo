import Image from "next/image";

const base = "/Wedding-card-2/Hero-section%20image";

export default function Hero() {
  return (
    <section
      className="@container relative flex min-h-screen w-full items-center justify-center bg-[#fbf4e6]"
      aria-labelledby="ganesh-vandana"
    >
      {/* 
        Portrait card sized to the 1240x1748 artwork aspect ratio.
        Marked as a @container so all internal typography and spacing scales 
        fluidly with the container's width using container query inline units (cqi).
      */}
      <div className="w-full h-full bg-[#fbf4e6]">

        {/* Layer 1: Floral Arch Frame Border */}
        <div className="absolute top-[0] inset-0 z-0 w-[100%] h-[100%] animate-slow-fade-in">
          <Image
            src={`${base}/frame-2.png`}
            alt="Floral Arch Frame"
            fill
            priority
            className="w-full h-[100%] object-cover pointer-events-none select-none"
          />
        </div>

        {/* Layer 2: Bottom Couple (Bride & Groom Sitting) */}
        <div className="w-[55%] h-[55%] absolute z-0 bottom-[0%] left-[22%] animate-slow-fade-in-bottom">
          <Image
            src={`${base}/couple.png`}
            alt="Wedding Couple"
            fill
            priority
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* Layer 3: Top Lord Ganesha Icon Drawing */}
        {/* Top frame canopy ornament above Ganesha */}
        <div className="absolute top-[2%] left-[20%] w-[60%] h-[6%] z-0 animate-slow-fade-in-top">
          <Image
            src={`${base}/Top%20frame.png`}
            alt="Top Frame Canopy"
            fill
            priority
            className="object-cover pointer-events-none select-none"
          />
        </div>

        <div className="absolute top-[7%] left-[43%] inset-0 z-0 w-[15%] h-[15%] animate-slow-fade-in">
          <div className="w-full h-full animate-float-slow">
            <Image
              src={`${base}/ganesh%20jii.png`}
              alt="Lord Ganesha"
              fill
              priority
              sizes="(min-width: 640px) 30rem, 100vw"
              className="object-cover pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Layer 4: Side Peacocks Flanking the Names */}
        {/* Left Peacock */}
        <div className="absolute top-[29%] left-[11%] w-[20%] h-[20%] z-0 animate-slow-fade-in-left">
          <Image
            src={`${base}/peacock.png`}
            alt="Left Peacock"
            fill
            priority
            sizes="(min-width: 640px) 30rem, 100vw"
            className="object-fill pointer-events-none select-none"
          />
        </div>

        {/* Right Peacock (Flipped) */}
        <div className="absolute top-[29%] right-[11%] w-[20%] h-[20%] z-0 animate-slow-fade-in-right">
          <div className="relative w-full h-full scale-x-[-1]">
            <Image
              src={`${base}/peacock.png`}
              alt="Right Peacock"
              fill
              priority
              sizes="(min-width: 640px) 30rem, 100vw"
              className="object-fill pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Layer 5: Interactive Text Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center">

          {/* Ganesh Vandana Shloka Section */}
          <div
            className="absolute top-[21%] left-0 right-0 flex flex-col items-center px-[8cqi] text-center animate-fade-in-up animation-delay-150"
            style={{ fontFamily: "var(--font-devanagari), serif" }}
          >
            <h1
              id="ganesh-vandana"
              className="text-[3.8cqi] font-semibold text-[#1e1e1e] tracking-wide select-none"
            >
              || श्री गणेशाय नमः ||
            </h1>
            {/* <p className="text-[3.2cqi] text-[#1e1e1e] my-[0.6cqi] select-none opacity-70">
              ||
            </p>
            <p className="text-[3.3cqi] leading-[1.6] text-[#2b2a29] max-w-[85%] font-medium">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
            </p>
            <p className="text-[3.3cqi] leading-[1.6] text-[#2b2a29] mt-[0.2cqi] max-w-[85%] font-medium">
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </p> */}
          </div>

          {/* Names Section (Deepak & Amrita) */}
          <div
            className="absolute top-[28%] left-0 right-0 flex flex-col items-center px-[10cqi] text-center animate-fade-in-up animation-delay-300"
            style={{ fontFamily: "var(--font-alex-brush), cursive" }}
          >
            <h2 className="text-[14cqi] leading-none text-[#C84B31] select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Karthik
            </h2>
            <span
              className="text-[7.5cqi] leading-none text-[#2b2a29] my-[1.2cqi] select-none opacity-90 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]"
              style={{ fontFamily: "var(--font-alex-brush), cursive" }}
            >
              &
            </span>
            <h2 className="text-[14cqi] leading-none text-[#C84B31] select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Pooja
            </h2>
          </div>

          {/* Date & Time Section */}
          <div
            className="absolute top-[50%] left-0 right-0 flex flex-col items-center select-none animate-fade-in-up animation-delay-450"
            style={{ fontFamily: "var(--font-arimo), sans-serif" }}
          >
            <span className="text-[3.2cqi] font-bold tracking-[0.25em] text-[#4A2511] uppercase mb-[1.2cqi]">
              MAY
            </span>
            <div className="flex items-center justify-center w-full px-[8cqi] gap-[3cqi]">
              {/* Left Column: Day of Week */}
              <div className="flex-1 border-y-2 border-[#344E41]/75 py-[1.8cqi] text-center">
                <span className="block text-[3.2cqi] font-bold tracking-[0.18em] text-[#2b2a29] uppercase">
                  TUESDAY
                </span>
              </div>

              {/* Center Column: Date */}
              <div className="flex-initial px-[2cqi] text-center">
                <span className="block text-[9.5cqi] font-bold text-[#1e1e1e] leading-none">
                  17
                </span>
              </div>

              {/* Right Column: Time */}
              <div className="flex-1 border-y-2 border-[#344E41]/75 py-[1.8cqi] text-center">
                <span className="block text-[3.2cqi] font-bold tracking-[0.05em] text-[#2b2a29] uppercase whitespace-nowrap">
                  7 AM - 9 PM
                </span>
              </div>
            </div>
            <span className="text-[3.2cqi] font-bold tracking-[0.28em] text-[#4A2511] mt-[1.8cqi]">
              2026
            </span>
          </div>

          {/* Layer 6: Falling Flower Petals Overlay (Reusable Component) */}

        </div>
      </div>
    </section>
  );
}
