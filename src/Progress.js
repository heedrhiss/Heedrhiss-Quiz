import { useQuiz } from "./QuizContext"

export default function Progress(){
    const {index, num, answer, points, max} = useQuiz()
    return(
        <header className="progress">
           <progress max={num} value={index + Number(answer !== null)}/>
           <p>Question <strong>{index +1}</strong> / {num}</p>
           <p>{points} / {max} Points</p>
        </header>
    )
}