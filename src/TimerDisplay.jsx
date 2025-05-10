export default function TimerDisplay({minutes,seconds}){
    return (
        <h1 style={{
            fontSize: "2rem"
        }}>{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</h1>
    )
}