import { useState, createContext, ReactNode, useContext, useEffect } from 'react'
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
   minutes: number;
   seconds: number;
   isActive: boolean;
   hasFinished: boolean;
   startCountdown: () => void;
   resetCountdown: () => void;
}

interface ChallengesProvideProps {
   children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvide({ children }: ChallengesProvideProps) {
   const { startNewChallenge } = useContext(ChallengesContext)

   const [time, setTime] = useState(25 * 60)
   const [isActive, setIsActive] = useState(false)
   const [hasFinished, setHasFinished] = useState(false)

   const minutes = Math.floor(time / 60)
   const seconds = time % 60

   useEffect(() => {
      if (isActive && time > 0) {
         countdownTimeout = setTimeout(() => {
            setTime(time - 1)
         }, 1000)
      } else if (isActive && time === 0) {
         setHasFinished(true)
         setIsActive(false)
         startNewChallenge()
      }

   }, [isActive, time])

   function startCountdown() {
      setIsActive(true)
   }

   function resetCountdown() {
      clearTimeout(countdownTimeout)
      setIsActive(false)
      setHasFinished(false)
      setTime(0.1 * 60)
   }

   return (
      <CountdownContext.Provider
         value={{
            minutes,
            seconds,
            isActive,
            hasFinished,
            startCountdown,
            resetCountdown,
         }}
      >
         {children}
      </CountdownContext.Provider>
   )
}
