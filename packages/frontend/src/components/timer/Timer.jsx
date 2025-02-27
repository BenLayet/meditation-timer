import "./Timer.css";

function Timer({displayedTime}) {
    return <div className="timer">
        <div className='timer-display'>{displayedTime}</div>
    </div>
}

export default Timer;