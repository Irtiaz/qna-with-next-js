import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import questionMarkImage from './pictures/question-mark.png';

import { QuestionBox } from '../Components/QuestionBox';
import { QnA } from '../Components/QNAItem';
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

import styles from '../styles/Home.module.css';
import axios from 'axios';
import { AlertBox } from '../Components/AlertBox';

interface Props {
  questions: QnA[];
}

const Home: NextPage<Props> = ({ questions }) => {
  const [questionText, setQuestionText] = useState('');
  const [alertBoxMessage, setAlertBoxMessage] = useState('');
  const [loadingSubmission, setLoadingSubmission] = useState(false);

  function handleQuestionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      question: questionText,
    };

    console.log(data);

    setLoadingSubmission(true);

    function showFailure() {
      setAlertBoxMessage(
        'Something went wrong while submitting your question!! Please check your internet connection'
      );
      setLoadingSubmission(false);
    }

    const secretKey: string | undefined = process.env.NEXT_PUBLIC_SECRET;
    if (secretKey) {
      jwt.sign(
        data,
        secretKey,
        { algorithm: 'HS256', expiresIn: '7d' },
        async (err, token) => {
          if (err) {
            console.log('error found while creating jwt token');
            console.error(err);
            showFailure();
          } else if (token) {
            try {
              interface ResponseData {
                success: boolean;
              }

              const response = await axios.post<ResponseData>(
                'https://qnatest-backend.herokuapp.com/submit_question',
                { token }
              );

              const { data } = response;

              if (data.success) {
                setAlertBoxMessage('Question submitted successfully');
                setLoadingSubmission(false);
              } else {
                showFailure();
              }
            } catch (error) {
              console.error(error);
              showFailure();
            }
          }
        }
      );
    } else {
      console.error('secret key not found!');
      showFailure();
    }

    setQuestionText('');
  }

  return (
    <>
      <Head>
        <title>QNA</title>
        <meta name='description' content='QNA for acrylic'></meta>
      </Head>

      {alertBoxMessage.length > 0 && (
        <AlertBox
          message={alertBoxMessage}
          handleOk={() => setAlertBoxMessage('')}
        />
      )}

      <div
        className={styles.contentContainer}
        style={{
          opacity: alertBoxMessage ? 0.4 : 1,
        }}
      >
        <div className={styles.questionMarkImageWrapperDiv}>
          <Image src={questionMarkImage} alt='QnA' />
        </div>
        <hr />
        <div className={styles.qnaHeader}>QNA</div>

        <form
          className={styles.questionForm}
          onSubmit={(event) => handleQuestionSubmit(event)}
        >
          <textarea
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            placeholder='Say, How can we help you?'
            spellCheck={false}
          ></textarea>

          {loadingSubmission && (
            <div className={styles.submittingStatusDiv}>
              Submitting question...
            </div>
          )}

          <div style={{ textAlign: 'right' }}>
            <button
              className={styles.submit}
              disabled={questionText.trim().length === 0}
            >
              Submit
            </button>
          </div>
        </form>

        {!questions && (
          <div className={styles.errorLoadingQuestion}>
            Questions could not be retrieved from the server. Please try again
            later
          </div>
        )}

        {questions && questions.length > 0 && (
          <QuestionBox questions={questions} />
        )}

        {/* <footer className={styles.footer}>
          <div>
            <a href='#'>
              <Image src={instagramLogo} alt='instagram' />
            </a>
          </div>
          <a href='#'>
            <div>
              <Image src={youtubeLogo} alt='youtube' />
            </div>
          </a>
          <a href='#'>
            <div>
              <Image src={facebookLogo} alt='facebook' />
            </div>
          </a>
        </footer> */}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  interface GetQuestionResponse {
    questions: QnA[];
    success: boolean;
  }

  try {
    const response = await axios.get<GetQuestionResponse>(
      'https://qnatest-backend.herokuapp.com/get_question'
    );
    const data = response.data;

    if (data.success) {
      const questionsArray = data.questions;
      return {
        props: {
          questions: questionsArray,
        },
      };
    } else {
      console.error('get questions failed');
      return {
        props: {
          questions: null,
        },
      };
    }
  } catch (error) {
    console.log('An error happened while fetching the questions');
    console.error(error);

    return {
      props: {
        questions: null,
      },
    };
  }
};

export default Home;
