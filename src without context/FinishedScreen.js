function FinishedScreen({points, max, dispatch}) {
    const percent = Math.ceil((points/max) * 100);
    let emoji;
    if(percent===100) emoji = '🥇'
    if(percent > 60 && percent < 100) emoji = '🎉'
    if(percent > 40 && percent <= 60) emoji = '👍'
    if(percent > 0 && percent <= 40) emoji = '😢'
    if(percent===0) emoji = '👎'

    return (
        <>
        <p className="result">
           {emoji} You scored {points} out of {max} ({percent}%)
        </p>
        <button className="btn btn-ui" onClick={()=>dispatch({type: 'restart'})}>Restart Quiz</button>
        </>
    )
}

export default FinishedScreen
