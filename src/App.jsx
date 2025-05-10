import TimerDisplay from "./TimerDisplay"
import Controls from "./Controls"
import { useState } from "react"

let timerId=null;

export default function App(){
    const workDuration=25*60;
    const shortBreak=5*60;
    const longBreak=15*60;

    const [timeLeft,setTimeLeft]=useState(workDuration);
    const [isRunning,setIsRunning]=useState(false);
    const [sessionType,setSessionType]=useState('work');
    const [sessionCount,setSessionCount]=useState(0);
    const [isBeeping,setIsBeeping] = useState(false);

    const startTimer=()=>{
        if(isRunning) return;
        setIsRunning(true);
        timerId=setInterval(()=>{
            setTimeLeft(prev=>{
                if(prev<=1){
                    clearInterval(timerId);
                    setIsRunning(false);
                    triggerBeep();
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
        stopBeep();
        setIsRunning(false);
        setTimeLeft(workDuration);
        setSessionType('work');
        setSessionCount(0);
    }

    const triggerBeep=()=>{
        const alarm=document.getElementById("alarm");
        setIsBeeping(true);

        alarm.currentTime=0;
        alarm.play();

        setTimeout(()=>{
            if(isBeeping) continueToNextSession();
        },30000);
    };

    const stopBeep=()=>{
        const alarm=document.getElementById("alarm");
        alarm.pause();
        alarm.currentTime=0;
        setIsBeeping(false);
    }

    const continueToNextSession=()=>{
        stopBeep();
        if(sessionType=='work'){
            const newCount=sessionCount+1;
            setSessionCount(newCount);
            if(newCount%4==0){
                setSessionType('longBreak');
                setTimeLeft(longBreak);
            }
            else{
                setSessionType('shortBreak');
                setTimeLeft(shortBreak);
            }
        }
        else{
            setSessionType('work');
            setTimeLeft(workDuration);
        }
        startTimer();
    }

    const minutes=Math.floor(timeLeft/60);
    const seconds=timeLeft%60;

    return (
        <div style={{
            textAlign: 'center',marginTop:'20px'
        }}>

            <h2>Session: {sessionType=='work'?'Work':sessionType=='shortBreak'?'Short Break':'Long Break'}</h2>
            <TimerDisplay minutes={minutes} seconds={seconds} />
              {!isBeeping && (
                <Controls
                isRunning={isRunning}
                onStart={startTimer}
                onPause={pauseTimer}
                onReset={resetTimer}
                />
            )}

            {isBeeping && (
                <div>
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                    Alarm! Click to continue to the next session.
                </p>
                <button onClick={continueToNextSession} aria-label="Continue to next session">Stop Alarm and Continue</button>
                </div>
            )}

            <p>Completed Sessions: {sessionCount}</p>

            <audio id="alarm" src="/alarm.mp3" preload="auto"></audio>
            </div>
    )
}