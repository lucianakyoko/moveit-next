import { CompletedChalenges } from "../components/CompletedChalenges";
import { Countdown } from "../components/Contdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>   
      <head>
        <title>Início | move.it</title>
      </head>  
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChalenges />
          <Countdown />
        </div>

        <div></div>
      </section>
    </div>
  )
}
