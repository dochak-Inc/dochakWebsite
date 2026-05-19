import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
            <div
            key={index}
            className={`flex justify-start ${
                index === 0 ? "pt-5 md:pt-20" : "pt-10 md:pt-40"
            } md:gap-10`}
            >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                {/* Cyan timeline dot with soft glow — matches landing accent. */}
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: "#57bceb",
                    boxShadow: "0 0 12px rgba(87, 188, 235, 0.6)",
                  }}
                />
              </div>
              <h3
                className="hidden md:block md:pl-20"
                style={{
                  color: "#ffffff",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 200,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block mb-4 text-left"
                style={{
                  color: "#ffffff",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
                  fontSize: "24px",
                  fontWeight: 200,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-[rgba(87,188,235,0.25)] to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[rgba(87,188,235,0.8)] via-[rgba(87,188,235,0.5)] to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
