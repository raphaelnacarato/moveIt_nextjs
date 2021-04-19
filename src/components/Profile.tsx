import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css'

export function Profile() {
   const { level } = useContext(ChallengesContext);

   return (
      <div className={styles.profileContainer}>
         <img src='https://github.com/raphaelnacarato.png' alt='Raphael Nacarato' />
         <div>
            <strong>Raphael Nacarato</strong>
            <p>
               <img src='icons/level.svg' alt='Level' />
               Level {level}
            </p>
         </div>
      </div>
   )
}
