import { useState } from 'react';
import styles from '../styles/QNAItem.module.css';

export interface QnA {
  question: string;
  answer: string;
}

interface Props {
  qna: QnA;
}

export const QNAItem: React.FC<Props> = ({ qna }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <div className={styles.questionsBoxQnaItem}>
        <div className={styles.qnaQuestionItemAndCollapse}>
          <div>{qna.question}</div>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '-' : '+'}
          </button>
        </div>
        {collapsed && <div className={styles.qnaAnswerItem}>{qna.answer}</div>}
      </div>
    </div>
  );
};
