import { useReducer } from 'react';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import { Main } from './Main';
import { useEffect } from 'react';
// import { type } from '@testing-library/user-event/dist/type';
import Start from './StartScreen';
import { Question } from './Quest';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0
}

function reducer(state, action){
  switch (action.type){
    case 'dataFetched':
      return {...state, questions: action.payload,
      status: 'ready'}
    
    case "dataFailed":
      return {...state, status: 'error'}

    case 'start':
      return {...state, status: 'start'}

    case 'answer':
      const curQuestion = state.questions[state.index];
      return{...state, answer: action.payload,
      points: curQuestion.correctOption === action.payload ? state.points + curQuestion.points : state.points}

    case 'next':
      return{...state, index: state.index + 1, answer: null}
    
    case 'finish':
      return{...state, status: 'finished', answer: null}

    case 'restart':
      return{...initialState, questions: state.questions, status:'ready'}

  default:
      throw new Error("Unknown Action")
  }
}

function App() {
const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState);
const num = questions.length;
const maxPoint= questions.reduce((prev,cur)=> prev+cur.points, 0)

useEffect(function(){
async function fetchQuest(){
  try{
    const res = await fetch(`http://localhost:6969/questions`);
  const data = await res.json();
  dispatch({type: 'dataFetched', payload: data} )
 }
  catch(err){
    dispatch({type: 'dataFailed'})
  }
} fetchQuest()
}, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && <Start num={num} dispatch={dispatch}/>}
        {status === "error" && <Error />}
        {status === "start" && 
        <>
        <Progress index={index} num={num} answer={answer} points={points} max={maxPoint}/>
        <Question question={questions[index]} index={index} dispatch={dispatch} answer={answer}/>
        </>}
        {status==="finished" && <FinishedScreen max={maxPoint} points={points} dispatch={dispatch}/>}
        <Next answer={answer} dispatch={dispatch} index={index} num={num}/>
        
      </Main>
    </div>
  );
}

function Next({dispatch, answer, num, index}){
  if(answer === null ) return;
  if(index < num - 1) return(
    <button className='btn btn-ui' onClick={()=>dispatch({type: 'next'})}>Next</button>
  )
  if(index === num - 1) return(
    <button className='btn btn-ui' onClick={()=>dispatch({type: 'finish'})}>Finish</button>
  )
}

export default App;
