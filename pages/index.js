import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
 
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
 
 
export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;
// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

// const Widget = styled.div`
//   margin-top: 24px;
//   margin-bottom: 24px;
//   border: 1px solid ${({ theme }) => theme.colors.primary};
//   background-color: ${({ theme }) => theme.colors.mainBg};
//   border-radius: 4px;
//   overflow: hidden;
//   h1, h2, h3 {
//     font-size: 16px;
//     font-weight: 700;
//     line-height: 1;
//     margin-bottom: 0;
//   }
//   p {
//     font-size: 14px;
//     font-weight: 400;
//     line-height: 1;
//   }
// `;

// Widget.Content = styled.div`
//   padding: 24px 32px 32px 32px;
//   & > *:first-child {
//     margin-top: 0;
//   }
//   & > *:last-child {
//     margin-bottom: 0;
//   }
//   ul {
//     list-style: none;
//     padding: 0;
//   }
// `;

// Widget.Header = styled.header`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 18px 32px;
//   background-color: ${({ theme }) => theme.colors.primary};
  
//   * {
//     margin: 0;
//   }
// `; 
export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>  
      
        <title>AluraQuiz - Modelo Base</title>
     
      <QuizContainer>
      <QuizLogo />
        <Widget>
        <Widget.Header>
          
          </Widget.Header>
          <Widget.Content> 1  </Widget.Content>
          </Widget>

          <Widget>
        <Widget.Header>
          
          </Widget.Header>
          <Widget.Content> 2 </Widget.Content>
        
          </Widget>
          <Footer/>
          </QuizContainer>
          <GitHubCorner/>
      </QuizBackground>
  )
}
