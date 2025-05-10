import TimerDisplay from "./TimerDisplay"
import Controls from "./Controls"
import { useState } from "react"

let timerId=null;

export default function App(){
    const [timeLeft,setTimeLeft]=useState(25*60);
    const [isRunning,setIsRunning]=useState(false);
    
    const startTimer=()=>{
        if(isRunning) return;
        setIsRunning(true);
        timerId=setInterval(()=>{
            setTimeLeft(prev=>{
                if(prev<=1){
                    clearInterval(timerId);
                    setIsRunning(false);
                    return 0;
                }
                return prev-1;
            })
        },1000);
    }

    const pauseTimer=()=>{
        clearInterval(timerId);
        setIsRunning(false);
    }

    const resetTimer=()=>{
        clearInterval(timerId);
        setTimeLeft(25*60);
        setIsRunning(false);
    }

    const minutes=Math.floor(timeLeft/60);
    const seconds=timeLeft%60;

    return (
        <div style={{
            textAlign: 'center',marginTop:'20px'
        }}>
            <TimerDisplay minutes={minutes} seconds={seconds} />
            <Controls 
                isRunning={isRunning}
                onStart={startTimer}
                onPause={pauseTimer}
                onReset={resetTimer}
            />
        </div>
    )
}