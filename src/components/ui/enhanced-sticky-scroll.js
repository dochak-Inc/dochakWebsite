"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { getTotalSections, getSectionIndices } from "../../utils/dataTransform";
import { optimizeScrollHandler, getOptimizedDuration } from "../../utils/scrollOptimization";
import "./enhanced-sticky-scroll.css";

// Technology Image Component with enhanced error handling and loading states
const TechnologyImage = ({ technology, isActive }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef(null);
    const retryCountRef = useRef(0);
    const maxRetries = 3;

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
        setIsLoading(false);
        setImageError(false);
        retryCountRef.current = 0;
    }, []);

    const handleImageError = useCallback(() => {
        console.warn(`Failed to load image: ${technology.image}, attempt ${retryCountRef.current + 1}`);
        
        if (retryCountRef.current < maxRetries) {
            retryCountRef.current += 1;
            // Retry after a delay
            setTimeout(() => {
                if (imgRef.current) {
                    imgRef.current.src = technology.image + '?retry=' + retryCountRef.current;
                }
            }, 1000 * retryCountRef.current);
        } else {
            setImageError(true);
            setIsLoading(false);
            setImageLoaded(false);
        }
    }, [technology.image]);

    // Reset states when technology changes
    useEffect(() => {
        setImageLoaded(false);
        setImageError(false);
        setIsLoading(true);
        retryCountRef.current = 0;
    }, [technology.image]);

    return (
        <motion.div
            className="mb-6 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
        >
            <div className="relative overflow-hidden rounded-3xl">
                {/* Loading State */}
                {isLoading && (
                    <div className="sticky-image bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400">
                            <svg className="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {imageError && (
                    <div className="sticky-image bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-center p-6">
                        <div className="text-gray-400">
                            <div className="text-4xl mb-3">📊</div>
                            <div className="font-medium text-lg mb-1 text-white">{technology.title}</div>
                            <div className="text-sm opacity-70 text-gray-400">Image not available</div>
                        </div>
                    </div>
                )}

                {/* Actual Image */}
                <img
                    ref={imgRef}
                    src={technology.image}
                    alt={technology.title}
                    className={cn(
                        "sticky-image transition-all duration-500",
                        imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    )}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                    style={{
                        display: imageError ? 'none' : 'block'
                    }}
                />

                {/* Hover Overlay */}
                {imageLoaded && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded-full">
                            {technology.title}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Content Renderer Component for different layout types
const ContentRenderer = ({ section, isActive }) => {
    const baseItemClass = "bg-gray-900 rounded-2xl shadow-sm border border-gray-800 transition-all duration-300 hover:shadow-md hover:border-gray-700";

    const renderListLayout = () => (
        <div className="space-y-4">
            {section.content.map((item, itemIndex) => (
                <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
                    transition={{ delay: itemIndex * 0.1, duration: 0.5 }}
                    className={cn(baseItemClass, "p-4 relative overflow-hidden")}
                >
                    <p className="text-gray-300 text-lg leading-relaxed">{item}</p>
                </motion.div>
            ))}
        </div>
    );

    const renderCardsLayout = () => (
        <div className="flex flex-wrap gap-6">
            {section.content.map((item, itemIndex) => (
                <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isActive ? 1 : 0.7, scale: 1 }}
                    transition={{ delay: itemIndex * 0.1, duration: 0.5 }}
                    className={cn(
                        baseItemClass,
                        "flex-1 min-w-0 p-6 text-center relative group cursor-pointer",
                        "hover:transform hover:scale-105"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-lg">{itemIndex + 1}</span>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">{item}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderGridLayout = () => {
        // Icon mapping for different content types
        const getIcon = (index) => {
            const icons = [
                "🏢", // Building/Organization
                "🎯", // Target/Goal
                "🌐", // Global/Network
                "📊", // Analytics/Data
                "🚀", // Innovation/Launch
                "⚙️", // Settings/Technical
                "📈", // Growth/Progress
                "🔧"  // Tools/Implementation
            ];
            return icons[index % icons.length];
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.content.map((item, itemIndex) => (
                    <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: isActive ? 1 : 0.7, x: 0 }}
                        transition={{ delay: itemIndex * 0.1, duration: 0.5 }}
                        className="p-4 relative group"
                    >
                        <div className="min-w-0">
                            <p className="text-gray-300 text-lg leading-relaxed break-words">{item}</p>
                        </div>

                    </motion.div>
                ))}
            </div>
        );
    };

    const renderDefaultLayout = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(baseItemClass, "p-6")}
        >
            {Array.isArray(section.content) ? (
                section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-300 text-lg leading-relaxed mb-4 last:mb-0">
                        {item}
                    </p>
                ))
            ) : (
                <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
            )}
        </motion.div>
    );

    // Render based on layout type
    switch (section.layout) {
        case 'list':
            return renderListLayout();
        case 'cards':
            return renderCardsLayout();
        case 'grid':
            return renderGridLayout();
        default:
            return renderDefaultLayout();
    }
};

export const EnhancedStickyScroll = ({
    content,
    className
}) => {
    const [activeTechnology, setActiveTechnology] = useState(0);
    const [activeSection, setActiveSection] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const ref = useRef(null);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ["start start", "end start"],
    });

    // Calculate total sections across all technologies
    const totalSections = getTotalSections(content);

    // Enhanced scroll logic with technology-based transitions
    const handleScrollProgress = useCallback(
        optimizeScrollHandler((latest) => {
            // Skip updates during transitions for performance
            if (isTransitioning) return;

            // Adjust scroll progress to activate sections earlier
            const adjustedProgress = Math.min(1, latest + 0.08);

            // Calculate current section index based on adjusted scroll progress
            let currentGlobalSectionIndex = Math.floor(adjustedProgress * totalSections);

            // Special handling for the last section - activate it when we're close to the end
            if (latest > 0.85 && currentGlobalSectionIndex < totalSections - 1) {
                currentGlobalSectionIndex = totalSections - 1;
            }

            // Ensure we don't exceed the total sections
            currentGlobalSectionIndex = Math.min(totalSections - 1, currentGlobalSectionIndex);

            // Get technology and section indices
            const { technologyIndex, sectionIndex } = getSectionIndices(currentGlobalSectionIndex, content);

            // Only update if technology has changed (not just section within technology)
            if (technologyIndex !== activeTechnology) {
                setIsTransitioning(true);
                setActiveTechnology(technologyIndex);

                // Reset transition flag after animation completes
                const duration = getOptimizedDuration(600);
                setTimeout(() => setIsTransitioning(false), duration);
            }

            // Always update active section for progress indication
            setActiveSection(sectionIndex);
        }, { throttleMs: 16, useRAF: true }),
        [activeTechnology, content, totalSections, isTransitioning]
    );

    useMotionValueEvent(scrollYProgress, "change", handleScrollProgress);

    // Background colors that match the dark theme design system
    const backgroundColors = [
        "#070707", // Dark background matching App.css
        "#0a0a0a", // Slightly lighter variant
        "#0f0f0f", // Another dark variant
    ];

    const [currentBackground, setCurrentBackground] = useState(backgroundColors[0]);

    useEffect(() => {
        setCurrentBackground(backgroundColors[activeTechnology % backgroundColors.length]);
    }, [activeTechnology]);

    // Get current technology data
    const currentTechnology = content[activeTechnology] || content[0];

    return (
        <motion.div
            animate={{
                backgroundColor: currentBackground,
            }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                "enhanced-sticky-scroll relative flex w-full overflow-y-auto",
                className
            )}
            ref={ref}
            style={{
                height: '100vh',
                minHeight: '100vh'
            }}>

            {/* Content Area - Left Side */}
            <div className="flex-1 relative flex items-start justify-center px-4">
                <div className="w-full max-w-4xl">
                    {content.map((technology, techIndex) => (
                        <div key={technology.title + techIndex} className="technology-content">
                            {/* Mobile Technology Header - Show before content sections on mobile */}
                            {isMobile && (
                                <div className="mobile-tech-header lg:hidden min-h-screen flex flex-col justify-center py-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                        className="text-center"
                                    >
                                        {/* Technology Image */}
                                        <TechnologyImage
                                            technology={technology}
                                            isActive={true}
                                        />

                                        {/* Technology Title */}
                                        <motion.h2
                                            className="mobile-tech-title text-3xl font-bold text-white mb-4 mt-6"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            {technology.title}
                                        </motion.h2>

                                        {/* Technology Subtitle */}
                                        <motion.p
                                            className="mobile-tech-subtitle text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        >
                                            {technology.subtitle}
                                        </motion.p>
                                    </motion.div>
                                </div>
                            )}

                            {/* Content Sections */}
                            {technology.sections.map((section, sectionIndex) => (
                                <div
                                    key={`${techIndex}-${sectionIndex}`}
                                    className={cn(
                                        "content-section min-h-screen flex flex-col justify-center py-16",
                                        activeTechnology === techIndex && activeSection === sectionIndex
                                            ? "active"
                                            : activeTechnology === techIndex
                                                ? "semi-active"
                                                : "inactive"
                                    )}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: activeTechnology === techIndex ? 1 : 0.4,
                                            x: activeTechnology === techIndex ? 0 : -20,
                                        }}
                                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <h3 className="text-2xl font-semibold text-cyan-400 mb-6">
                                            {section.sectionTitle}
                                        </h3>

                                        {/* Render content based on layout type */}
                                        <ContentRenderer
                                            section={section}
                                            isActive={activeTechnology === techIndex}
                                        />
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="h-40" />
                </div>
            </div>

            {/* Sticky Area - Right Side */}
            <div className="sticky-area hidden lg:flex">
                <motion.div
                    key={activeTechnology}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                        staggerChildren: 0.1
                    }}
                    className="text-center w-full"
                >
                    {/* Technology Image */}
                    <TechnologyImage
                        technology={currentTechnology}
                        isActive={true}
                    />

                    {/* Technology Title */}
                    <motion.h2
                        className="sticky-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {currentTechnology.title}
                    </motion.h2>

                    {/* Technology Subtitle */}
                    <motion.p
                        className="sticky-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {currentTechnology.subtitle}
                    </motion.p>



                    {/* Technology Navigation Dots */}
                    <motion.div
                        className="mt-6 flex justify-center space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {content.map((_, techIndex) => (
                            <div
                                key={techIndex}
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                    techIndex === activeTechnology
                                        ? "bg-cyan-400 w-6"
                                        : "bg-gray-600 hover:bg-gray-500"
                                )}
                                onClick={() => {
                                    // Scroll to specific technology (optional feature)
                                    const targetSection = techIndex * 3; // 3 sections per technology
                                    const scrollProgress = targetSection / totalSections;
                                    if (ref.current) {
                                        const scrollHeight = ref.current.scrollHeight - ref.current.clientHeight;
                                        ref.current.scrollTop = scrollProgress * scrollHeight;
                                    }
                                }}
                                title={`Go to ${content[techIndex].title}`}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};
