import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext()

function QuizProvider({children}){
    const initialState = {
        questions: [],
        status: "loading",
        index: 0,
        answer: null,
        points: 0,
        highScore: 0,
        timer: null
      }
      
      function reducer(state, action){
        switch (action.type){
          case 'dataFetched':
            return {...state, questions: action.payload,
            status: 'ready'}
          
          case "dataFailed":
            return {...state, status: 'error'}
      
          case 'start':
            return {...state, status: 'start', timer: state.questions.length * 15}
      
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
      
          case 'timer':
            return{
              ...state, timer: state.timer - 1,
              status: state.timer === 0 ? 'finished' : state.status,
            }
      
        default:
            throw new Error("Unknown Action")
        }
      }
    const [{questions, status, index, answer, points, timer}, dispatch] = useReducer(reducer, initialState);

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

    return <QuizContext.Provider
    value={{questions, status, index, answer, points, timer, num, maxPoint,  dispatch}}
    >{children}</QuizContext.Provider>
}

function useQuiz(){
    const context = useContext(QuizContext);
       if(context == undefined) throw new Error("Quiz context was used outside Quiz Provider")
       return context;
}

export {QuizProvider, useQuiz};