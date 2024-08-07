import { useQuiz } from "./QuizContext"

export default function Start(){
    const {num, dispatch} = useQuiz()
    return <div className="start">
        <h2>Welcome To My React Quiz</h2>
        <h3>{num} Questions to test your React Mastery</h3>
        <button className="btn btn-ui" onClick={()=>dispatch({type: 'start'})}>Let's Start</button>
    </div>
}