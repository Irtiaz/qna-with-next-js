import '../styles/globals.css';
import { Navbar } from '../Components/Navbar';

import type { AppProps } from 'next/app';
import Image from 'next/image';

import questionMarkImage from './pictures/question-mark.png';
import instagramLogo from './pictures/instagram.jpg';
import youtubeLogo from './pictures/youtube.jpg';
import facebookLogo from './pictures/facebook.jpg';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />

      <footer>
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
    </>
  );
}
export default MyApp;
