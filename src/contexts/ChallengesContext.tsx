import { createContext, useState, ReactNode } from 'react';

interface ChallengesContextData {
  level: number; 
  currentExperience: number; 
  challentgesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps{
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challentgesCompleted, setChallentgesCompleted] = useState(0);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    console.log('new challenge')
  }

  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      challentgesCompleted, 
      levelUp,
      startNewChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}