import { useReducer } from 'react';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import { Main } from './Main';
import { useEffect } from 'react';
// import { type } from '@testing-library/user-event/dist/type';
import Start from './Startscreen';
import { Question } from './Quest';

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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

  default:
      throw new Error("Unknown Action")
  }
}

function App() {
const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);
const num = questions.length;

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
        {status === "start" && <Question question={questions[index]} index={index} dispatch={dispatch} answer={answer}/>}
        <Next answer={answer} dispatch={dispatch}/>
      </Main>
    </div>
  );
}

function Next({dispatch, answer}){
  if(answer === null ) return;
  return(
    <button className='btn btn-ui' onClick={()=>dispatch({type: 'next'})}>Next</button>
  )
}

export default App;
