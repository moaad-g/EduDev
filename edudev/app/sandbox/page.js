'use client'
import Image from 'next/image'
import React, { useState , useEffect } from "react";
import { motion, useMotionValue, useTransform , useDragControls } from "framer-motion";
import { AuthContext } from "@/app/layout";
import { db } from "@/app/firebase";



const Sandbox = () => {
    const [devices,setDevices] = useState([{
        x:50 , y:50 , name:"my PC" , type:"PC", cpu:"4", ram:"" , storage:"500 GB"
    }])

    const ramVals = {"PC":["4 GB","8 GB","12 GB","16 GB"], "Server":["16,32,64,128"], "DB":["4,8,12,16"]}
    const stoVals = {"PC":["500 GB","1 TB","2 TB","4 TB"]}
    const cpuVals = {"PC":["4","6","8"]}

    const [newDeviceType, setNewDeviceType] = useState("");
    const [newCPU, setNewCPU] = useState("");
    const [newRam, setNewRam] = useState("");
    const [newName, setNewName] = useState("");
    const [newSto, setNewStorage] = useState("");

    const [disableForm, setDisableForm] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    /* {x: y: type: attr:{ram:suting suting}} */
    const dragControls = useDragControls();

    useEffect(() => {
        if (newRam === "" || newSto === "" || newCPU === "" || newDeviceType === "" || newName === ""){
            setDisableForm(true)
        } else {
            setDisableForm(false)
        }
    }, [newDeviceType, newCPU, newRam, newSto]);

    const handleDrag = (event,info,index) => {
        console.log(info.point.x)
        console.log(info.point.y)
        const updateddevices = [...devices];
        updateddevices[index].x = info.point.x
        updateddevices[index].y = info.point.y
        setDevices(updateddevices);
        console.log(updateddevices[index].x)
        console.log(updateddevices[index].y)
    };


    const addDevice = () => {
        const newDevice = {x: 50, y:50, name:newName , cpu:newCPU, ram:newRam, storage:newSto }
        setDevices([...devices,newDevice])
        resetDevice()
    }

    const deleteDevice = (index) => {
        const updatedDevices = [...devices];
        updatedDevices.splice(index, 1);
        setDevices(updatedDevices);
    }

    const resetDevice = () => {
        setNewCPU("")
        setNewRam("")
        setNewDeviceType("")
        setNewStorage("")
        setNewName("")
        setShowPopup(false)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {/* Sub-window */}
            <div className="bg-gray-200 rounded-lg shadow-lg relative w-1/2 h-2/3">
                <nav className="absolute top-0 left-0 bg-gray-800 text-white py-4 px-4 w-full">
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
                            onMouseEnter={() => setShowDetails(index)}
                            onMouseLeave={() => setShowDetails(null)}
                            className="cursor-pointer"
                        >
                            <Image
                                src={"/images/devices/computer.png"}
                                width={100}
                                height={100}
                                alt="Picture of the author"
                            />
                            {showDetails === index &&(
                                <div className="absolute p-3 rounded text-black text-xs bg-white">
                                    <p>Name: {devices[index].name}</p>
                                    <p>CPU Cores: {devices[index].cpu}</p>
                                    <p>RAM: {devices[index].ram}</p>
                                    <p>Storage: {devices[index].storage}</p>
                                    <button onClick={() => deleteDevice(index)} className="cursor-pointer bg-red-500 text-white py-1 px-2 m-1 rounded-md hover:bg-red-700"> Delete</button>
                                </div>
                            
                            )}
                        </motion.div>
                    ))}

                    {showPopup &&(
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg text-black">
                            <h2 className="text-lg font-bold mb-2">Add Device</h2>
                            <label className="block mb-1">
                                Device Name:
                            </label>
                            <input
                                className="rounded border bg-gray-100 p-1"
                                type="text"
                                name="name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <label className="block mb-2">
                                Device Type:
                                <select
                                    defaultValue=""
                                    onChange={(e) => setNewDeviceType(e.target.value)}
                                    className="block w-full mt-1 p-2 border rounded-md"
                                >   
                                    <option value="" disabled>Select Device Type</option>
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
                                            <label className="px-3" key={cpuVal}>
                                            <input
                                                type="radio"
                                                name="cpu"
                                                value={cpuVal}
                                                onChange={(e) => setNewCPU(e.target.value)}
                                            />
                                            {cpuVal} Cores
                                        </label>
                                        ))}
                                    </div>
                                    <div className="py-2">
                                        <h3 className="block mb-2">Choose Ram:</h3>
                                        {ramVals[newDeviceType].map((ramVal) => (
                                            <label className="px-3" key={ramVal}>
                                            <input
                                                type="radio"
                                                name="rem"
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
                                            <label className="px-3" key={stoVal}>
                                            <input
                                                type="radio"
                                                name="storage"
                                                value={stoVal}
                                                onChange={(e) => setNewStorage(e.target.value)}
                                            />
                                            {stoVal}
                                        </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button onClick={addDevice} className={`cursor-pointer text-white py-2 px-4 rounded-md mx-1 ${disableForm ? "bg-gray-500": "bg-blue-500 hover:bg-blue-700"}`} disabled={disableForm}>Add Device</button>
                            <button onClick={() => resetDevice()} className="cursor-pointer bg-red-500 text-white py-2 px-4 mx-1 rounded-md hover:bg-red-700">Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sandbox;