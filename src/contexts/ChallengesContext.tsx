import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'


interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number; 
  currentExperience: number;
  experienceToNextLevel: number;
  challentgesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  CompleteChalenge: () => void;
}

interface ChallengesProviderProps{
  children: ReactNode;
  level: number;
  currentExperience: number;
  challentgesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challentgesCompleted, setChallentgesCompleted] = useState(rest.challentgesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challentgesCompleted', String(challentgesCompleted));
  }, [level, currentExperience, challentgesCompleted])

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function CompleteChalenge() {
    if(!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallentgesCompleted(challentgesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      experienceToNextLevel,
      challentgesCompleted, 
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      CompleteChalenge,
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}