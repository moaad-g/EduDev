'use client'
import React, { useState } from "react";
import { motion, useMotionValue, useTransform , useDragControls } from "framer-motion";


const SubWindowWithDraggableNavbar = () => {
    const [icons, setIcons] = useState([{ x: 0, y: 0 }]);
    const dragControls = useDragControls();

    const handleIconDrag = (index, event, info) => {
        const updatedIcons = [...icons];
        updatedIcons[index] = { x: info.point.x, y: info.point.y };
        setIcons(updatedIcons);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Sub-window */}
            <div className="bg-gray-200 rounded-lg shadow-lg relative w-1/2 h-2/3">
                {/* Navbar attached to sub-window */}
                <nav className="absolute top-0 left-0 bg-gray-800 text-white py-2 px-4 w-full">
                    {/* Navbar content */}
                    <div className="flex space-x-4">
                        {/* Icon */}
                        {icons.map((icon, index) => (
                            <motion.div
                                key={index}
                                drag
                                dragControls={dragControls}
                                dragElastic={0}
                                dragMomentum={false}
                                onDragEnd={(event, info) => handleIconDrag(index, event, info)}
                                style={{
                                    x: icon.x,
                                    y: icon.y,
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H3a1 1 0 0 1 0-2h6V3a1 1 0 0 1 1-1z" clipRule="evenodd" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>
                </nav>

                {/* Main content box */}
                <div className="mt-16">
                </div>
            </div>
        </div>
    );
};

export default SubWindowWithDraggableNavbar;
