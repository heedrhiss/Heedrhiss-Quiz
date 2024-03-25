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
  index: 0
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

  default:
      throw new Error("Unknown Action")
  }
}

function App() {
const [{questions, status, index}, dispatch] = useReducer(reducer, initialState);
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
        {status === "start" && <Question question={questions[index]} index={index} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
