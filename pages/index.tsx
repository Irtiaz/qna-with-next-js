import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import questionMarkImage from './pictures/question-mark.png';
import instagramLogo from './pictures/instagram.jpg';
import youtubeLogo from './pictures/youtube.jpg';
import facebookLogo from './pictures/facebook.jpg';

import { QuestionBox } from '../Components/QuestionBox';
import { QnA } from '../Components/QNAItem';
import { Navbar } from '../Components/Navbar';
import React, { useState } from 'react';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const questions: QnA[] = [
    {
      question: 'What is my name?',
      answer: 'You know well',
    },
    {
      question: 'What is my name?',
      answer: 'You know well',
    },
    {
      question: 'What is my name?',
      answer: 'You know well',
    },
    {
      question: 'What is my name?',
      answer: 'You know well',
    },
    {
      question: 'What is my name?',
      answer: 'You know well',
    },
    {
      question: 'What is my name?',
      answer: 'You know well',
    },
  ];

  const [questionText, setQuestionText] = useState('');

  function handleQuestionSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert('Question submission not yet implemented');
  }

  return (
    <>
      <Head>
        <title>QNA</title>
        <meta name='description' content='QNA for acrylic'></meta>
      </Head>
      <Navbar />
      <div className={styles.contentContainer}>
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
            onChange={(event) => setQuestionText(event.target.value)}
            placeholder='Say, How can we help you?'
            spellCheck={false}
          ></textarea>
          <div style={{ textAlign: 'right' }}>
            <button
              className={styles.submit}
              disabled={questionText.trim().length === 0}
            >
              Submit
            </button>
          </div>
        </form>

        <QuestionBox questions={questions} />

        <footer className={styles.footer}>
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
        </footer>
      </div>
    </>
  );
};

export default Home;
