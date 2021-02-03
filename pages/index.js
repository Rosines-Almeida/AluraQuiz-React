/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {motion } from 'framer-motion'
import db from '../db.json';
import Widget from '../src/components/Widget';

import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

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

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log(name, setName);
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title> AluraQuiz - Imersão</title>
      </Head>
      <title>AluraQuiz - Modelo Base</title>

      <QuizContainer>
        <QuizLogo />
        <Widget
         transition ={{ delay: 0.0,  duration: 0.5}}
          as={motion.section}
          variants={{
            show: { opacity: 1,y:'0' },
            hidden: { opacity: 0, y:'100%' }
          }}
          initial="hidden"
          animate="show"
        >

          <Widget.Header />
          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();

              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input
                placeholder="Diz ai seu nome"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                value={name}
              />
              <Button type="submit" disabled={!name}>
              {`Vamos Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition ={{ delay: 0.5,  duration: 0.5}}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial="hidden"
          animate="show"
        >
          {/* <Widget.Header /> */}
          <Widget.Content> Quizes da galera  </Widget.Content>
          <ul>
            {db.external.map((linkExterno) => {
              const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

              return (
                <li key= {linkExterno}> 
                  <Widget.Topic 
                  as= {Link}
                  href=  {`/quiz/${projectName}___${githubUser}`}>
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic >
                </li>
              )
            })}
          </ul>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
