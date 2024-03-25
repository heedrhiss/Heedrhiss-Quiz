export function Question({question, index, dispatch}){
    console.log(question)
    return(
        <>
        <h3>{question.question}</h3>
        <div className="options">
            {question.options.map(option=> <Option option={option} key={option}/>)}
        </div>
        </>
    )
}

function Option({option}){
    return(
        <button className="btn btn-option">{option}</button>
    )
}