import { createContext, useState, ReactNode } from 'react';
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
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challentgesCompleted, setChallentgesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)
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