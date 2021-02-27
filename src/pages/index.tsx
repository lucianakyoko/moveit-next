import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChalenges } from "../components/CompletedChalenges";
import { Countdown } from "../components/Contdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number
  currentExperience: number
  challentgesCompleted: number
}

export default function Home(props: HomeProps) {
  console.log(props)

  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challentgesCompleted={props.challentgesCompleted} >
      <div className={styles.container}>   
        <Head>
          <title>Início | move.it</title>
        </Head>  
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChalenges />
              <Countdown />
            </div>
            
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challentgesCompleted }= ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challentgesCompleted: Number(challentgesCompleted),
    }
  }
}