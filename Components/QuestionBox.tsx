import styles from '../styles/QuestionBox.module.css';

import { QNAItem, QnA } from './QNAItem';

interface Props {
  questions: QnA[];
}

export const QuestionBox: React.FC<Props> = ({ questions }) => {
  return (
    <div className={styles.questionsBoxWrapper}>
      <div className={styles.questionsBoxWrapperTitle}>Top Questions</div>

      <div>
        {questions.map((question, i) => (
          <QNAItem qna={question} key={i} />
        ))}
      </div>
    </div>
  );
};
