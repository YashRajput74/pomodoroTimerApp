import "./Controls.css"

export default function Controls({isRunning,onStart,onPause,onReset}){
    return (
        <div className="controls-container">
            {
                isRunning ? (
                    <button onClick={onPause}>Pause</button>
                ) : (
                    <button onClick={onStart}>Start</button>
                )
            }
            <button onClick={onReset}>Reset</button>
        </div>
    )
}