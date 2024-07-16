export function Question({question, index, dispatch, answer}){
    console.log(question)
    return(
        <>
        <h3>{question.question}</h3>
        <div className="options">
            {question.options.map((option, index)=> <Option option={option} index={index} key={option} answer={answer} dispatch={dispatch} question={question}/>)}
        </div>
        </>
    )
}

function Option({question, option, answer, index, dispatch}){
    const newAns = answer !== null;
    
    return(
        <button className={`btn btn-option ${answer===index ? "answer" : ""} ${newAns ? index=== question.correctOption ? "correct" : "wrong" : ""}`} disabled={answer} onClick={()=>dispatch({type: 'answer', payload: index})}>{option}</button>
    )
}