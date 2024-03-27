'use client'
import Image from 'next/image'
import React, { useState } from "react";
import { motion, useMotionValue, useTransform , useDragControls } from "framer-motion";


const Sandbox = () => {

    const [devices,setDevices] = useState([{
        x:50 , y:50 , type:"computer" , attr:{
        }
    }])

    const ramVals = {"PC":["4 GB","8 GB","12 GB","16 GB"], "Server":["16,32,64,128"], "DB":["4,8,12,16"]}
    const stoVals = {"PC":["500 GB","1 TB","2 TB","4 TB"]}
    const cpuVals = {"PC":["4","6","8"]}

    const [newDeviceType, setNewDeviceType] = useState("");
    const [newCPU, setNewCPU] = useState("");
    const [newRam, setNewRam] = useState("");
    const [newSto, setNewStorage] = useState("");
    const [newAttr, setNewDeviceAttr] = useState({});

    const [showPopup, setShowPopup] = useState(false)
    /* {x: y: type: attr:{ram:suting suting}} */
    const dragControls = useDragControls();


    const handleDrag = (event,info,index) => {
        console.log(index)
        console.log(info)
        const updateddevices = [...devices];
        updateddevices[index].x = info.point.x
        updateddevices[index].y = info.point.y
        setDevices(updateddevices);
        console.log(devices);
    };


    const addDevice = () => {
        setShowPopup(false);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Sub-window */}
            <div className="bg-gray-200 rounded-lg shadow-lg relative w-1/2 h-2/3">
                <nav className="absolute top-0 left-0 bg-gray-800 text-white py-2 px-4 w-full">
                    <button className="cursor-pointer" onClick={() => setShowPopup(true)}>
                        Add Device
                    </button>
                
                </nav>
                    {/* Navbar content */}
                <div className="flex space-x-4">
                    {/* Icon */}
                    {devices.map((device,index) => (
                        <motion.div
                            key={index}
                            drag
                            dragControls={dragControls}
                            dragElastic={0}
                            dragMomentum={false}
                            dragTransition={{ min: 0, max: Infinity }}
                            onDragEnd={(event,info) => handleDrag(event,info,index)}
                            style={{
                                x: device.x,
                                y: device.y,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="cursor-pointer"
                        >
                            <Image
                                src={"/images/devices/computer.png"}
                                width={100}
                                height={100}
                                alt="Picture of the author"
                            />
                            
                        </motion.div>
                    ))}

                    {showPopup &&(
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg text-black">
                            <h2 className="text-lg font-bold mb-2">Add Device</h2>
                            <label className="block mb-2">
                                Device Type:
                                <select
                                    onChange={(e) => setNewDeviceType(e.target.value)}
                                    className="block w-full mt-1 p-2 border rounded-md"
                                >   
                                    <option value="" disabled selected>Select Device Type</option>
                                    <option value="PC">Personal Computer</option>
                                    <option value="Server">App Server</option>
                                    <option value="DB">Database</option>
                                </select>
                            </label>
                            {newDeviceType != "" && (
                                <div>
                                    <div className="py-2">
                                        <h3 className="block mb-2">Choose CPU:</h3>
                                        {cpuVals[newDeviceType].map((cpuVal) => (
                                            <label className="px-3">
                                            <input
                                                type="radio"
                                                name="ram"
                                                value={cpuVal}
                                                onChange={(e) => setNewRam(e.target.value)}
                                            />
                                            {cpuVal} Cores
                                        </label>
                                        ))}
                                    </div>
                                    <div className="py-2">
                                        <h3 className="block mb-2">Choose Ram:</h3>
                                        {ramVals[newDeviceType].map((ramVal) => (
                                            <label className="px-3">
                                            <input
                                                type="radio"
                                                name="cpu"
                                                value={ramVal}
                                                onChange={(e) => setNewRam(e.target.value)}
                                            />
                                            {ramVal}
                                        </label>
                                        ))}
                                    </div>
                                    <div className="py-2">
                                        <h3 className="block mb-2">Choose Storage:</h3>
                                        {stoVals[newDeviceType].map((stoVal) => (
                                            <label className="px-3">
                                            <input
                                                type="radio"
                                                name="storage"
                                                value={stoVal}
                                                onChange={(e) => setNewRam(e.target.value)}
                                            />
                                            {stoVal}
                                        </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button onClick={addDevice} className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Device</button>
                            <button onClick={() => setShowPopup(false)} className="bg-red-500 text-white py-2 px-4 rounded-md">Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sandbox;