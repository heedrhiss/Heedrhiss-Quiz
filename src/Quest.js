import { useQuiz } from "./QuizContext";

export function Question(){
    const {questions, index} = useQuiz()
    const question = questions[index]
    // console.log(question)
    return(
        <>
        <h3>{question.question}</h3>
        <Option question={question}/>
        </>
    )
}


function Option({question}){
    const {dispatch, answer} = useQuiz()
    const newAns = answer !== null;
    
    return(
        <div className="options">
            {question.options.map((option, index)=> <button className={`btn btn-option ${answer===index ? "answer" : ""} ${newAns ? index=== question.correctOption ? "correct" : "wrong" : ""}`} disabled={answer} onClick={()=>dispatch({type: 'answer', payload: index})} key={option}>{option}</button>)}
        
        </div>
    )
}
