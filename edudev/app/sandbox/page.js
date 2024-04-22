'use client'
import Image from 'next/image'
import React, { useState , useEffect , useRef , useContext } from "react";
import { motion, useDragControls } from "framer-motion";
import { AuthContext } from "@/app/layout";
import { db } from "@/app/firebase";
import Xarrow from "react-xarrows";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button , IconButton , Fab , Switch , Slider , FormControlLabel , Dialog , DialogTitle , DialogContent , Divider , Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LanIcon from '@mui/icons-material/Lan';
import SaveIcon from '@mui/icons-material/Save';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { toast } from 'react-toastify'
import { collection , getDocs , doc , setDoc } from 'firebase/firestore';


const Sandbox = () => {
    const user = useContext(AuthContext);
    const windowRef = useRef(null);
    const [devices,setDevices] = useState([{ 
        id: "1" , x:50 , y:50 , name:"my PC" , info:{type:"PC", cpu:"4", ram:"" , storage:"500 GB"}
    }, {
        id: "2" , x:50 , y:100 , name:"my PC" , info:{type:"PC", cpu:"4", ram:"" , storage:"500 GB"}
    },{
        id: "3" , x:50 , y:150 , name:"my PC" , info:{type:"PC", cpu:"4", ram:"" , storage:"500 GB"}
    }])
    const [connections,setConnections] = useState([{start:"1" , end:"2"}, {start:"1" , end:"3"}]);

    // [id: [{id2: ,  type:}]]

    const ramValues = { "PC":[{value:1 ,label:"8GB"},{value:2 ,label:"16GB"},{value:3 ,label:"32GB"},{value:4 ,label:"64GB"},{value:5 ,label:"128GB"}],
                        "Server":[{value:1 ,label:"32GB"},{value:2 ,label:"64GB"},{value:3 ,label:"128GB"},{value:4 ,label:"256GB"},{value:5 ,label:"512GB"},{value:6 ,label:"1TB"}],
    };
    const stoValues = { "PC":[{value:1 ,label:"8GB"},{value:2 ,label:"16GB"},{value:3 ,label:"32GB"},{value:4 ,label:"64GB"},{value:5 ,label:"128GB"}],
    "Server":[{value:1 ,label:"64GB"},{value:2 ,label:"128GB"},{value:3 ,label:"256GB"},{value:4 ,label:"512GB"},{value:5 ,label:"1TB"}],
    };
    const cpuValues = { "PC":[{value:1 ,label:"2 Cores"},{value:2 ,label:"4 Cores"},{value:3 ,label:"6 Cores"},{value:4 ,label:"8 Cores"},{value:5 ,label:"12 Cores"}],
    "Server":[{value:1 ,label:"64GB"},{value:2 ,label:"128GB"},{value:3 ,label:"256GB"},{value:4 ,label:"512GB"},{value:5 ,label:"1TB"}],
    };

    const softwareList = {"PC":["Ubuntu", "Mint","Debian" , "Windows"], "Server":["RHEL","CentOS","Windows Enterprise"] , "Database": ["MySQL","PostgreSQL","MongoDB","Firebase"] , "Cluster": ["Database Cluster","App Cluster"] };

    const [newDeviceType, setNewDeviceType] = useState("");
    const [newCPU, setNewCPU] = useState();
    const [newRam, setNewRam] = useState();
    const [newName, setNewName] = useState("");
    const [newSto, setNewStorage] = useState();
    const [newStart, setNewStart] = useState(null);
    const [loadSand, setLoadSand] = useState("");
    const [savedSands , setSavedSands] = useState([]);
    const [showLoad,setShowLoad] = useState(false);
    const [showSave,setShowSave] = useState(false);
    const [disableForm, setDisableForm] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    const [sandName, setSandName] = useState("");
    const [isVirtual, setVirtual] = useState(false);
    const [isCloud, setCloud] = useState(false);
    const [servType, setServeType] = useState("");
    const [vmNum , setVmNum] = useState(1);
    const [virtualMachines , setVirtualMachines] = useState([{}]);
    const [fetchSaves, setFetchSaves] = useState(false);
    const [newOS, setNewOS] = useState("");

    useEffect(() => {
        const setForm = () =>{
            if (newDeviceType === "" || newName === ""){
                return true
            }
            if (newDeviceType != "Cluster"){
                if (newRam === "" || newSto === "" || newCPU === ""){
                    return true
                }
            }
            if (newDeviceType != "Server"){
                if (servType === ""){
                    return true
                }
            }
            
        }
        setDisableForm(setForm);
    }, [newDeviceType, newCPU, newRam, newSto, servType, newName]);
    
    useEffect (() => {
        (async() =>{
            try {
                if (user){
                    const sandRef = collection(db, "Users", user.email, "Sandboxes" );
                    const sandData = await getDocs(sandRef);
                    sandData.forEach((doc) => {
                        setSavedSands(savedSands  =>[...savedSands,{name:doc.id , devices:doc.data().devices , connections:doc.data().connections}]);
                    })
                }
            } catch (error) {
                console.error(error);
            }
        })
        ();
    },[user , fetchSaves])

    const saveSandbox = async() => {
        const sandRef = doc(db, "Users", user.email, "Sandboxes", sandName )
        const setSand = await setDoc(sandRef, {devices:devices, connections:connections }, { merge: true })
        setShowSave(false);
        setFetchSaves(!fetchSaves);
    }
    const loadSandbox = async() => {
        setDevices([])
        setConnections([])
        try{
            const sandboxObj = savedSands.find(map => map.name === loadSand);
            setDevices(devices => sandboxObj.devices);
            setConnections(connections => sandboxObj.connections)
            setNewName(sandboxObj.name);
            setShowLoad(false);
        } catch (error){
            console.error(error)
        }
    }

    const createNextID = () => {
        var tempIdList = [];
        var randId = randId = Math.floor((Math.random() * 1000) + 1);
        devices.forEach((device) => tempIdList.push(device.id))
        while (tempIdList.includes(randId)){
            randId = Math.floor((Math.random() * 1000) + 1)
        }  
        return randId
    };

    const handleDrag = (event,info,index) => {
        const updateddevices = [...devices];
        updateddevices[index].x = info.point.x
        updateddevices[index].y = info.point.y
        setDevices(updateddevices);
    };

    const setVmLength = (num) => {
        setVmNum(num);
        var tempVirtualMachines = [...virtualMachines];
        if (virtualMachines.length < num){
            tempVirtualMachines.push({})
        } else {
            tempVirtualMachines.length = num;
        }
        setVirtualMachines(virtualMachines => tempVirtualMachines)
    }

    const setVmFunc = (index , func) => {
        var tempVirtualMachines = [...virtualMachines]
        tempVirtualMachines[index] = { ...tempVirtualMachines[index], function: func };
        setVirtualMachines(virtualMachines => tempVirtualMachines);
    };

    const setVmSoft = (index , soft) => {
        var tempVirtualMachines = [...virtualMachines]
        tempVirtualMachines[index] = { ...tempVirtualMachines[index], software: soft };
        setVirtualMachines(virtualMachines => tempVirtualMachines);
    };


    const addDevice = () => {
        const newId = createNextID();
        var newDeviceInfo = {};

        if (newDeviceType =="PC"){
            const ramString = ramValues[newDeviceType][newRam-1].label;
            const stoString = stoValues[newDeviceType][newSto-1].label;
            const cpuString = ramValues[newDeviceType][newCPU-1].label;
            newDeviceInfo = {Type:newDeviceType , OS : "" , CPU: cpuString , RAM:ramString, STO:stoString}
        } else if (newDeviceType =="Server"){
            const ramString = ramValues[newDeviceType][newRam-1].label;
            const stoString = stoValues[newDeviceType][newSto-1].label;
            const cpuString = ramValues[newDeviceType][newCPU-1].label;
            if (isVirtual){
                newDeviceInfo = {Type:newDeviceType , Cloud:"" , VirtualMachines: virtualMachines , CPU: cpuString , RAM:ramString, STO:stoString}
            } else {
                newDeviceInfo = {Type:newDeviceType , Cloud:"" , function:servType , OS:newOS , CPU: cpuString , RAM:ramString, STO:stoString}
            }
        } else if (newDeviceType =="Cluster"){
            newDeviceInfo = {Type:newDeviceType , Cloud:""}
        }
        const newDevice = {id: newId , x: 50, y:50, name:newName , info: newDeviceInfo}
        setDevices(devices  =>[...devices,newDevice]);
        resetDevice();
        setShowPopup(false);
    }

    const deleteDevice = (index,id) => {
        var updatedDevices = [...devices];
        var updatedConnections = [...connections];
        updatedDevices.splice(index, 1);
        setDevices(devices => updatedDevices);
        updatedConnections = updatedConnections.filter(map => map["start"] !== id);
        updatedConnections = updatedConnections.filter(map => map["end"] !== id);
        setConnections(connections => updatedConnections);
    }

    const resetDevice = () => {
        setNewCPU("")
        setNewRam("")
        setNewDeviceType("")
        setNewStorage("")
        setNewName("")
    }

    const changeType = (newType) => {
        resetDevice();
        setNewDeviceType(newType)
    };

    const closePopup = () => {
        setShowPopup(false);
        resetDevice();
    }

    const newConnection = (connEnd) => {
        var newConn = {start:newStart.toString(), end:connEnd.toString()};
        setConnections(connections => [...connections,newConn])
        setNewStart(null);
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 relative rounded-lg shadow-lg w-2/3 h h-3/4" ref={windowRef}>
                <nav className="flex justify-between bg-gray-800 text-white py-2 px-4 w-full absolute z-10">
                    <Button
                    variant="contained"
                    color='secondary'
                    startIcon={<AddCircleIcon />}
                    onClick={()=>setShowPopup(true)}
                    disabled={newStart}
                    >
                        Add Device
                    </Button>
                    {user &&
                        <div className='flex'>
                            <IconButton onClick={()=>setShowLoad(true)}>
                                <CloudDownloadIcon />
                            </IconButton>
                        </div>
                    }
                </nav>
                <div className="flex flex-wrap space-x-4">
                    {devices.map((device,index) => (
                        <motion.div
                            className='cursor-grab'
                            key={device.id}
                            drag
                            dragElastic={0}
                            dragMomentum={false}
                            dragConstraints={windowRef}
                            onDragEnd={(event,info) => handleDrag(event,info,index)}
                            style={{
                                x: device.x,
                                y: device.y,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setShowDetails(device.id)}
                            onMouseLeave={() => setShowDetails(null)}
                        >
                            <Image
                                src={"/images/devices/computer.png"}
                                width={100}
                                height={100}
                                alt="Picture of the author"
                                id = {device.id}
                            />
                            {showDetails === device.id &&(
                                <div>
                                    <div className="absolute p-3 rounded text-black bg-white shadow-xl truncate">
                                        <div className='overflow-y-auto whitespace'>
                                        <p>Name: {devices[index].id}</p>
                                        <p>Name: {devices[index].name}</p>
                                        { ((devices[index].info.Type === "Server")&&(("VirtualMachines" in devices[index].info)) ? (
                                            <div>
                                                <p>VM List:</p>
                                                {(devices[index].info.VirtualMachines).map((vm) => (
                                                    <div>
                                                        <p>{vm.function} | {vm.software}</p>
                                                        <Divider className='m-1' variant="middle" color='error' />
                                                    </div>
                                                ))}
                                            </div>
                                        ):(
                                            <div>
                                                {Object.entries(devices[index].info).map(([infokey, info]) => (
                                                    <p>{infokey}:{info}</p>
                                                ))}
                                            </div>
                                        )
                                        )}
                                            <div className='flex'>
                                                <Tooltip title="delete">
                                                    <IconButton color='error' onClick={() => deleteDevice(index , device.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={newStart ?'End Connection': 'New Connection'}>
                                                    <IconButton color={newStart ?'success': 'info'} onClick={() => { newStart ? newConnection(device.id) : setNewStart(device.id) }}>
                                                        <LanIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                        ))}
                        {connections.map((connection,index) => (
                            <Xarrow
                                key={index}
                                start={connection.start}
                                end={connection.end}
                                path={"grid"}
                                dashness={true}
                                animateDrawingS
                                color='green'
                            />
                        ))}
                    {newStart && (
                        <div className="absolute top-16 left-4 bg-white shadow-xl rounded p-4">
                            <p>select connection end</p>
                            <Button color='error' onClick={()=>setNewStart(null)}>Cancel</Button>
                        </div>

                    )}
                    {user && (
                        <Fab color="secondary" aria-label="Save Sandbox" className="absolute bottom-4 right-4" onClick={()=>setShowSave(true)}>
                            <SaveIcon />
                        </Fab>
                    )}
                    <Dialog open={showLoad}>
                        <div className='p-5'>
                            <DialogTitle>Select A Saved Sandbox</DialogTitle>
                            <DialogContent>
                                <label className="block text-black mb-2">
                                    <select
                                        defaultValue=""
                                        onChange={(e) => setLoadSand(e.target.value)}
                                        className="block w-full mt-1 p-2 border rounded-md"
                                    >   
                                        <option value="" disabled>Select Sandbox</option>
                                        {savedSands.map ((sand) => (
                                            <option value={sand.name}>{sand.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </DialogContent>
                            <div className='flex justify-end'>
                                <Button variant="outlined" className='m-2' color='error' onClick={()=>setShowLoad(false)}>Cancel</Button>
                                <Button variant="outlined" className='m-2' color='info' onClick={()=>loadSandbox()}>Load</Button>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog open={showSave}>
                        <div className='p-5'>
                            <DialogTitle>Set Sandbox Name</DialogTitle>
                            <DialogContent>
                                <input
                                type="text"
                                id="sandboxName"
                                className={`p-1 focus:text-black rounded text-black m-1 ${ (sandName.length >= 30) ? 'border-4 border-red-600' : ''}`} 
                                placeholder={sandName ? sandName: "no name set"}
                                onChange={(e) => setSandName(e.target.value)}
                                />
                            </DialogContent>
                            <div className='flex justify-end'>
                                <Button variant="outlined" className='m-2' color='error' onClick={()=>setShowSave(false)}>Cancel</Button>
                                <Button variant="outlined" color='info' onClick={()=>saveSandbox()}>Save</Button>
                            </div>
                        </div>
                    </Dialog>
                    {showPopup &&(
                        <div className="absolute bg-gray-800 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-1/3 h-2/3 rounded shadow-xl overflow-x-hidden overflow-y-auto text-white border border-4 border-gray-300">
                            <h2 className="text-lg font-bold mb-2">Add Device</h2>
                            <label className="block mb-2">
                                Device Type:
                                <select
                                    defaultValue=""
                                    onChange={(e) => changeType(e.target.value)}
                                    className="block w-full p-2 border rounded-md text-black"
                                >   
                                    <option value="" disabled>Select Device Type</option>
                                    <option value="PC">Personal Computer</option>
                                    <option value="Server">App Server</option>
                                    <option value="Cluster">Cluster</option>
                                </select>
                            </label>
                            <Divider className='m-2' variant="middle" />
                            {(newDeviceType != "") && (
                                <div>
                                    <label className="block mb-1">
                                    Device Name:
                                    </label>
                                    <input
                                        className=" w-full rounded border bg-gray-200 p-1 text-black"
                                        type="text"
                                        name="name"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    <Divider className='m-2' variant="middle" />
                                {/*SERVER*/}
                                {newDeviceType != "PC" && (
                                    <div className='flex justify-center items-center mb-4'>
                                    <p>On Prem</p>
                                    <Switch color='info' checked={isCloud} onChange={(e)=>setCloud(e.target.checked)} />
                                    <p>Cloud</p>
                                    </div>
                                )}
                                {newDeviceType == "Server" && (
                                    <div>
                                    <Divider className='m-2' variant="middle" />
                                    <div className='flex justify-center'>
                                        <FormControlLabel control={<Switch color='secondary' checked={isVirtual} onChange={(e)=>setVirtual(e.target.checked)}/>} label="Virtualisation" labelPlacement='top' />
                                    </div>
                                    {isVirtual && (
                                        <div className=''>
                                            <h3 className='mx-auto'>Number of Virtual Machines:</h3>
                                            <div className='flex justify-center'>
                                                <Slider
                                                className='w-11/12'
                                                valueLabelDisplay='auto'
                                                color='secondary'
                                                min={1}
                                                max={4}
                                                onChange={(e) => setVmLength(e.target.value)}
                                                />
                                            </div>
                                            <div className={`grid grid-rows-${vmNum}`}>
                                            {Array.from({ length: vmNum }, (vm, index) => (
                                                <div>
                                                    <Divider className='m-2' variant="middle" />
                                                <label>VM {index + 1} Configuration:</label>
                                                <div key={index} className='grid grid-cols-2'>
                                                    <label className="block mb-2 text-xs mx-1">
                                                        Machine Function:
                                                    <select
                                                        defaultValue=""
                                                        onChange={(e) => setVmFunc(index , e.target.value)}
                                                        className="block w-full p-2 border rounded text-xs text-black"
                                                    >   
                                                        <option value="" disabled>Select Machine Function</option>
                                                        <option value="App Machine">App Machine</option>
                                                        <option value="Web Machine">Web Machine</option>
                                                        <option value="File Machine">File Machine</option>
                                                        <option value="Database Machine">Database Machine</option>
                                                    </select>
                                                </label>
                                                <label className="block mb-2 text-xs">
                                                        {virtualMachines[index].function == "Database Machine" ? "DB Type": "Operating System"}
                                                    <select
                                                        defaultValue=""
                                                        onChange={(e) => setVmSoft(index , e.target.value)}
                                                        className="block w-full p-2 border rounded text-xs text-black"
                                                    >   
                                                        <option value="" disabled>Select Machine Software</option>
                                                        {(softwareList["PC"]).map((option, index) => (
                                                            <option key={index} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                                    {/* Add your sub-menu components */}
                                                </div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>

                                    )}
                                    {!isVirtual && (
                                        <div className=''>
                                            <div>
                                                <Divider className='m-2' variant="middle" />
                                            <div className='grid grid-cols-2'>
                                                <label className="block mb-2 text-xs mx-1">
                                                    Machine Function:
                                                <select
                                                    defaultValue=""
                                                    onChange={(e) => setServeType(e.target.value)}
                                                    className="block w-full p-2 border rounded text-xs text-black"
                                                >   
                                                    <option value="" disabled>Select Machine Function</option>
                                                    <option value="App Machine">App Machine</option>
                                                    <option value="Web Machine">Web Machine</option>
                                                    <option value="File Machine">File Machine</option>
                                                    <option value="Database Machine">Database Machine</option>
                                                </select>
                                            </label>
                                            <label className="block mb-2 text-xs">
                                                    {servType == "Database Machine" ? "DB Type": "Operating System"}
                                                <select
                                                    defaultValue=""
                                                    onChange={(e) => setNewOS(e.target.value)}
                                                    className="block w-full p-2 border rounded text-xs text-black"
                                                >   
                                                    <option value="" disabled>Select Machine Software</option>
                                                    {(softwareList["PC"]).map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </label>
                                                {/* Add your sub-menu components */}
                                            </div>
                                            </div>

                                        </div>


                                    )}
                                    <Divider className='m-2' variant="middle" />
                                    </div>
                                )}
                                {/*CLUSTER*/}
                                {newDeviceType != "Server" && (
                                    <label className="block mb-2 mx-1">
                                    {newDeviceType == "Cluster" ? "Select Cluster Type": "Select OS"}
                                    <select
                                        defaultValue=""
                                        onChange={(e) => setServeType(e.target.value)}
                                        className="block w-full p-2 border rounded text-black"
                                    >
                                        <option value="" disabled>---</option>
                                        {(softwareList[newDeviceType]).map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}   
                                    </select>
                                    </label>
                                )}
                                {newDeviceType != "Cluster" && (
                                    <div className='flex-col justify-center'>
                                        <label className="block mb-2 mx-1 p-3">
                                            Set CPU:
                                            <Slider
                                            className='w-11/12'
                                            color='secondary'
                                            step={null}
                                            marks={cpuValues[newDeviceType]}
                                            min={cpuValues[newDeviceType][0].value}
                                            max={(cpuValues[newDeviceType][cpuValues[newDeviceType].length-1]).value}
                                            onChange={(e) => setNewCPU(e.target.value)}
                                            />
                                        </label>
                                        <Divider className='m-2' variant="middle" />
                                        <label className="block mb-2 mx-1 p-3">
                                            Select RAM:
                                            <Slider
                                            className='w-11/12'
                                            color='secondary'
                                            step={null}
                                            marks={ramValues[newDeviceType]}
                                            min={ramValues[newDeviceType][0].value}
                                            max={ramValues[newDeviceType][ramValues[newDeviceType].length-1].value}
                                            onChange={(e) => setNewRam(e.target.value)}
                                            />
                                        </label>
                                        <Divider className='m-2' variant="middle" />
                                        <label className="block mb-2 mx-1 p-3">
                                            Select Storage:
                                            <Slider
                                            className='w-11/12'
                                            color='secondary'
                                            step={null}
                                            marks={stoValues[newDeviceType]}
                                            min={stoValues[newDeviceType][0].value}
                                            max={stoValues[newDeviceType][stoValues[newDeviceType].length-1].value}
                                            onChange={(e) => setNewStorage(e.target.value)}
                                            />
                                        </label>                                        
                                    </div>
                                )}
                            </div>
                            )}
                            <button onClick={addDevice} className={`cursor-pointer text-white py-2 px-4 rounded-md mx-1 ${disableForm ? "bg-gray-500": "bg-blue-500 hover:bg-blue-700"}`} disabled={disableForm}>Add Device</button>
                            <button onClick={() => closePopup()} className="cursor-pointer bg-red-500 text-white py-2 px-4 mx-1 rounded-md hover:bg-red-700">Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sandbox;