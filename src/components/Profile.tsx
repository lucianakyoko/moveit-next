import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://en.gravatar.com/userimage/8015061/73cbdebe342255d9d2acdc41c4f1ce44.jpg" alt="Luciana Kyoko"/>
      <div>
        <strong>Luciana Kyoko</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  );
}