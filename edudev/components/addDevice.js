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