/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';
import AlternativesForm from '../src/components/AlternativesForm'
function LoadingScreen(){
    return (
        <Widget>
            <Widget.Header>
                Carregando ... 
    
            </Widget.Header>

            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    )
}

function Result({ results }){
  return (
      <Widget>
          <Widget.Header>
             Resultado 
  
          </Widget.Header>

          <Widget.Content>
     <p>Acertados  {' '} {results.reduce((somatoriaAtual, resultAtual)=>{
       const isAcerto = resultAtual === true;
       if(isAcerto){
         return somatoriaAtual + 1;
       }
       return somatoriaAtual

     },0)} {' '} perguntas</p>
     <ul>
       {results.map((result, index)=>
          <li>
          {index + 1 } {' '}Resultado : {result === true ? 'Acertou': 'Errou'}
        </li>
       )}
    
     </ul>
          </Widget.Content>
      </Widget>
  )
}

function QuestionWidget({ question , totalQuestions , questionIndex, onSubmit, addResult }){
  const [selectedAlternative, setSelectedAlternative] = 
 
  React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] =  React.useState(false);
  console.log(isQuestionSubmited)
  const questionId = `question_${questionIndex}`; 
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelect = selectedAlternative !== undefined
  console.log(isCorrect)
 
    return( 
        <Widget>
        <Widget.Header > 
          <h3> {`
             Pergunta  ${questionIndex + 1} de ${totalQuestions}`}
          </h3> 
        </Widget.Header >
        <Widget.Content>
          <img
            alt="descrição"
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover'
            }}
            src={question.image}
          ></img>
     
        </Widget.Content>
        <Widget.Content>
          <h2> {question.title} </h2>
          <p> {question.description}</p>
          <AlternativesForm
       
            onSubmit={(infosDoEvento) => {
              debugger
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(() => { 
                addResult(isCorrect)
                onSubmit();
                setIsQuestionSubmited(false); 
                setSelectedAlternative(undefined)
              }, 3 * 1000);
            }} 
            > 
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `Alternativa _${alternativeIndex}`
              return (
                <Widget.Topic
                  as="label"
                  key = {alternativeId}
                  htmlFor={alternativeIndex}
                  data-selected={true}
                  data-status={'SUCCESS'}
                >
                  <input
                  
                    type="radio"
                    id={alternativeId}
                    name={questionId}
                    onChange={() =>setSelectedAlternative(alternativeIndex)}
                  ></input>
                  {alternative}

                </Widget.Topic>

              )
            })} 
            <Button  type="submit"  disabled={!hasAlternativeSelect} >Continuar  </Button> 
            { isQuestionSubmited }
            {isQuestionSubmited && isCorrect && <p> Você acertou! </p>}
            {!isCorrect && <p>Você errou</p>}
          </AlternativesForm>
        </Widget.Content>
      </Widget> 
    )
}
const screenState ={
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}
export default function QuizPage() {
    const [screenPage,setScreenState ] = React.useState(screenState.RESULT)
     const [results, setResults] = React.useState([]) 
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
     const questionIndex = currentQuestion;
    const totalQuestions = db.questions.length;
    //const questionIndex = 0
    const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }


  React.useEffect (() => {
  setTimeout(() => {
    setScreenState(screenState.QUIZ);
  }, 1* 1000);
  },[])

    function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } 
    else {
            setScreenState(screenState.RESULT);
          }
  }
  return (
    <QuizBackground backgroundImage={db.bg}> 
    <QuizContainer>
      <QuizLogo />
  {screenPage === screenState.QUIZ && (
     <QuestionWidget 
     question={question}
     totalQuestions ={totalQuestions}
     questionIndex= {questionIndex}
     onSubmit={handleSubmit}
     addResult= {addResult}
     />
  )}
   { screenPage === screenState.LOADING && <LoadingScreen />}
   { screenPage === screenState.RESULT && <Result results={results} />}
    </QuizContainer>
    <GitHubCorner />
  </QuizBackground>
);
}

// function LoadingWidget() {
//   return (
//     <Widget>
//       <Widget.Header>
//         Carregando...
//       </Widget.Header>

//       <Widget.Content>
//         [Desafio do Loading]
//       </Widget.Content>
//     </Widget>
    
//   );
// }

// function QuestionWidget({
//   question,
//   questionIndex,
//   totalQuestions,
//   onSubmit,
//   addResult,
// }) {
//   const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
//   const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
//   const questionId = `question__${questionIndex}`;
//   const isCorrect = selectedAlternative === question.answer;
//   const hasAlternativeSelected = selectedAlternative !== undefined;

//   return (
//     <Widget>
//       <Widget.Header>
//         {/* <BackLinkArrow href="/" /> */}
//         <h3>
//           {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
//         </h3>
//       </Widget.Header>

//       <img
//         alt="Descrição"
//         style={{
//           width: '100%',
//           height: '150px',
//           objectFit: 'cover',
//         }}
//         src={question.image}
//       />
//       <Widget.Content>
//         <h2>
//           {question.title}
//         </h2>
//         <p>
//           {question.description}
//         </p>

//         <AlternativesForm
//           onSubmit={(infosDoEvento) => {
//             infosDoEvento.preventDefault();
//             setIsQuestionSubmited(true);
//             setTimeout(() => {
//               addResult(isCorrect);
//               onSubmit();
//               setIsQuestionSubmited(false);
//               setSelectedAlternative(undefined);
//             }, 3 * 1000);
//           }}
//         >
//           {question.alternatives.map((alternative, alternativeIndex) => {
//             const alternativeId = `alternative__${alternativeIndex}`;
//             const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
//             const isSelected = selectedAlternative === alternativeIndex;
//             return (
//               <Widget.Topic
//                 as="label"
//                 key={alternativeId}
//                 htmlFor={alternativeId}
//                 data-selected={isSelected}
//                 data-status={isQuestionSubmited && alternativeStatus}
//               >
//                 <input
//                   style={{ display: 'none' }}
//                   id={alternativeId}
//                   name={questionId}
//                   onChange={() => setSelectedAlternative(alternativeIndex)}
//                   type="radio"
//                 />
//                 {alternative}
//               </Widget.Topic>
//             );
//           })}

//           {/* <pre>
//             {JSON.stringify(question, null, 4)}
//           </pre> */}
//           <Button type="submit" disabled={!hasAlternativeSelected}>
//             Confirmar
//           </Button>
//           {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
//           {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
//         </AlternativesForm>
//       </Widget.Content>
//     </Widget>
//   );
// }

// const screenStates = {
//   QUIZ: 'QUIZ',
//   LOADING: 'LOADING',
//   RESULT: 'RESULT',
// };
// export default function QuizPage() {
//   const [screenState, setScreenState] = React.useState(screenStates.LOADING);
//   const [results, setResults] = React.useState([]);
//   const totalQuestions = db.questions.length;
//   const [currentQuestion, setCurrentQuestion] = React.useState(0);
//   const questionIndex = currentQuestion;
//   const question = db.questions[questionIndex];

//   function addResult(result) {
//     // results.push(result);
//     setResults([
//       ...results,
//       result,
//     ]);
//   }

//   // [React chama de: Efeitos || Effects]
//   // React.useEffect
//   // atualizado === willUpdate
//   // morre === willUnmount
//   React.useEffect(() => {
//     // fetch() ...
//     setTimeout(() => {
//       setScreenState(screenStates.QUIZ);
//     }, 1 * 1000);
//   // nasce === didMount
//   }, []);

//   function handleSubmitQuiz() {
//     const nextQuestion = questionIndex + 1;
//     if (nextQuestion < totalQuestions) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setScreenState(screenStates.RESULT);
//     }
//   }

//   return (
//     <QuizBackground backgroundImage={db.bg}>
//       <QuizContainer>
//         <QuizLogo />
//         {screenState === screenStates.QUIZ && (
//           <QuestionWidget
//             question={question}
//             questionIndex={questionIndex}
//             totalQuestions={totalQuestions}
//             onSubmit={handleSubmitQuiz}
//             addResult={addResult}
//           />
//         )}

//         {screenState === screenStates.LOADING && <LoadingWidget />}

//         {screenState === screenStates.RESULT && <ResultWidget results={results} />}
//       </QuizContainer>
//     </QuizBackground>
//   );
// }