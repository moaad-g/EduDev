'use client'
import Image from 'next/image'
import React, { useState , useEffect , useRef , useContext } from "react";
import { motion, useDragControls } from "framer-motion";
import { AuthContext } from "@/app/layout";
import { db } from "@/app/firebase";
import Xarrow from "react-xarrows";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button , IconButton , Fab , Switch , Slider , FormControlLabel , Dialog , DialogTitle , DialogContent , Divider} from '@mui/material';
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
        id: "1" , x:50 , y:50 , name:"my PC" , type:"PC", cpu:"4", ram:"" , storage:"500 GB"
    }, {
        id: "2" , x:50 , y:100 , name:"my PC" , type:"PC", cpu:"4", ram:"" , storage:"500 GB"
    },{
        id: "3" , x:50 , y:150 , name:"my PC" , type:"PC", cpu:"4", ram:"" , storage:"500 GB"
    }])
    const [connections,setConnections] = useState([{start:"1" , end:"2"}, {start:"1" , end:"3"}]);

    // [id: [{id2: ,  type:}]]

    const ramValues = { "PC":[{value:1 ,label:"8GB"},{value:2 ,label:"16GB"},{value:3 ,label:"32GB"},{value:4 ,label:"64GB"},{value:5 ,label:"128GB"}],
                        "Server":[{value:1 ,label:"32GB"},{value:2 ,label:"64GB"},{value:3 ,label:"128GB"},{value:4 ,label:"256GB"},{value:5 ,label:"512GB"},{value:6 ,label:"1TB"}],
                        };
    
    const stoValues = { "PC":[{value:1 ,label:"8GB"},{value:2 ,label:"16GB"},{value:3 ,label:"32GB"},{value:4 ,label:"64GB"},{value:5 ,label:"128GB"}],
    "Server":[{value:1 ,label:"64GB"},{value:2 ,label:"128GB"},{value:3 ,label:"256GB"},{value:4 ,label:"512GB"},{value:5 ,label:"1TB"}],
    };

    const ramVals = {"PC":["4 GB","8 GB","12 GB","16 GB"], "Server":["16,32,64,128"], "DB":["4,8,12,16"]}
    const stoVals = {"PC":["500 GB","1 TB","2 TB","4 TB"]}
    const cpuVals = {"PC":["4","6","8"]}

    const [newDeviceType, setNewDeviceType] = useState("");
    const [newCPU, setNewCPU] = useState("");
    const [newRam, setNewRam] = useState("");
    const [newName, setNewName] = useState("");
    const [newSto, setNewStorage] = useState("");
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
    const [osNum, setOsNum] = useState(0);
    const [servType, setServeType] = useState("");



    useEffect(() => {
        if (newRam === "" || newSto === "" || newCPU === "" || newDeviceType === "" || newName === ""){
            setDisableForm(true)
        } else {
            setDisableForm(false)
        }
    }, [newDeviceType, newCPU, newRam, newSto]);
    
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
    },[user])

    const saveSandbox = async() => {
        const sandRef = doc(db, "Users", user.email, "Sandboxes", sandName )
        const setSand = await setDoc(sandRef, {devices:devices, connections:connections }, { merge: true })
    }
    const loadSandbox = () => {
        setDevices([])
        setConnections([])
        try{
            const sandboxObj = savedSands.find(map => map.name === loadSand);
            setDevices(sandboxObj.devices);
            setConnections(sandboxObj.connections)
            setNewName(sandboxObj.name);
            setShowLoad(false);
        } catch (error){
            console.error(error)
        }
    }

    const createNextID = () => {
        var tempIdList = [];
        var randId = 1;
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

    const addDevice = () => {
        const newId = createNextID();
        var newDeviceInfo = {};
        const newDevice = {id: newId , x: 50, y:50, name:newName , info: newDeviceInfo}
        setDevices(devices  =>[...devices,newDevice]);
        resetDevice();
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
        setShowPopup(false);
    }

    const newConnection = (connEnd) => {
        var newConn = {start:newStart, end:connEnd};
        setConnections([...connections,newConn])
        setNewStart(null);
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 relative rounded-lg shadow-lg w-2/3 h-3/4" ref={windowRef}>
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
                            onMouseEnter={() => setShowDetails(index)}
                            onMouseLeave={() => setShowDetails(null)}
                        >
                            <Image
                                src={"/images/devices/computer.png"}
                                width={100}
                                height={100}
                                alt="Picture of the author"
                                id = {device.id}
                                className="cursor-pointer"
                            />
                            {showDetails === index &&(
                                <div>
                                    <div className="absolute p-3 rounded text-black text-xs bg-white">
                                        <p>Name: {devices[index].name}</p>
                                        <p>CPU Cores: {devices[index].cpu}</p>
                                        <p>RAM: {devices[index].ram}</p>
                                        <p>Storage: {devices[index].storage}</p>
                                        <div className='flex'>
                                            <IconButton color='error' onClick={() => deleteDevice(index , device.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton color={newStart ?'success': 'info'} onClick={() => { newStart ? newConnection(device.id) : setNewStart(device.id) }}>
                                                <LanIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                        ))}
                        {connections.map((connection,index) => (
                            <Xarrow
                                start={connection.start}
                                end={connection.end}
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
                        <div className="absolute bg-gray-800 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-1/3 rounded-lg shadow-lg overflow-x-hidden text-white">
                            <h2 className="text-lg font-bold mb-2">Add Device</h2>
                            <label className="block mb-1">
                                Device Name:
                            </label>
                            <input
                                className="rounded border bg-gray-200 p-1 text-black"
                                type="text"
                                name="name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <Divider className='m-2' variant="middle" />
                            <label className="block mb-2">
                                Device Type:
                                <select
                                    defaultValue=""
                                    onChange={(e) => setNewDeviceType(e.target.value)}
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
                                    <div className='flex justify-center items-center mb-4'>
                                        <p>On Prem</p>
                                        <Switch color='info' onChange={(e)=>setCloud(e.target.checked)} />
                                        <p>Cloud</p>
                                    </div>
                                    <Divider className='m-2' variant="middle" />
                                {newDeviceType == "Server" && (
                                    <div>
                                    <div className='flex justify-center'>
                                        <FormControlLabel control={<Switch color='secondary' onChange={(e)=>setVirtual(e.target.checked)}/>} label="Virtualisation" labelPlacement='top' />
                                    </div>
                                    {isVirtual && (
                                        <div>
                                            <h2 className="text-lg font-bold mb-2">Choose Number</h2>
                                            <Slider
                                            color='secondary'
                                            aria-label="Temperature"
                                            defaultValue={2}
                                            valueLabelDisplay="auto"
                                            shiftStep={1}
                                            step={1}
                                            marks
                                            min={1}
                                            max={4}
                                            />
                                            
                                        </div>

                                    )}
                                    </div>
                                )}
                                {newDeviceType == "Cluster" && (
                                    <div>
                                    <div className='flex justify-center'>
                                        <FormControlLabel control={<Switch color='secondary' onChange={(e)=>setVirtual(e.target.checked)}/>} label="Virtualisation" labelPlacement='top' />
                                    </div>
                                    {isVirtual && (
                                        <div>
                                            <h2 className="text-lg font-bold mb-2">Choose Number</h2>
                                            <Slider
                                            color='secondary'
                                            aria-label="Temperature"
                                            defaultValue={2}
                                            valueLabelDisplay="auto"
                                            shiftStep={1}
                                            step={1}
                                            marks
                                            min={1}
                                            max={4}
                                            />
                                            
                                        </div>

                                    )}
                                    </div>
                                )}
                                <div className='flex justify-center'>
                                <Slider
                                className='w-11/12'
                                color='secondary'
                                step={null}
                                marks={ramValues[newDeviceType]}
                                min={ramValues[newDeviceType][0].value}
                                max={ramValues[newDeviceType][ramValues["PC"].length - 1].value}
                                />

                                </div>
                                
                                <div>
                                   
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