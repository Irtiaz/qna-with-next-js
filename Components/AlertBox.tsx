import styles from '../styles/AlertBox.module.css';

interface Props {
  message: string;
  handleOk: () => void;
}

export const AlertBox: React.FC<Props> = ({ message, handleOk }) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <button onClick={handleOk}>Ok</button>
    </div>
  );
};
