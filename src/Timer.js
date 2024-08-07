import { useEffect } from "react"
import { useQuiz } from "./QuizContext";

function Timer() {
    const {dispatch, timer} = useQuiz()
    const min = Math.floor(timer / 60);
    const sec = timer%60;

    useEffect(function(){
        const id = setInterval(()=>{
            dispatch({type: 'timer'})
        }, 1000)
        return ()=> clearInterval(id)
    }, [dispatch])
    return (
        <div className="timer">
           {min} : {sec < 10 ? "0":""}{sec}
        </div>
    )
}

export default Timer
