export default function Controls({isRunning,onStart,onPause,onReset}){
    return (
        <div style={{
            marginTop: "10px"
        }}>
            {
                isRunning?(
                    <button onClick={onPause}>Pause</button>
                ):
                (
                    <button onClick={onStart}>Start</button>
                )
            }
            <button onClick={onReset}>Reset</button>
        </div>
    )
}