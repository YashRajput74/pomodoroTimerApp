import './TimerDisplay.css';

export default function TimerDisplay({minutes,seconds}){
    return (
        <h1 className="timer-display">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </h1>
    )
}