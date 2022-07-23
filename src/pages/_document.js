import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="title" content="Hobnob - Yet Another Social Network" />

        <meta name="description" content="Engage. Post. Enjoy." />

        <meta name="copyright" content="Ankush Kumar" />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://hob-nob.vercel.app" />

        <meta property="og:title" content="Hobnob - Yet Another Social Network" />

        <meta property="og:description" content="Engage. Post. Enjoy." />

        <meta property="og:image" content="https://res.cloudinary.com/tjwnzr4u7xadg/image/upload/v1653991444/Hobnob_koq1bm.png" />

        <meta property="twitter:card" content="summary_large_image" />

        <meta property="twitter:url" content="https://hob-nob.vercel.app" />

        <meta property="twitter:title" content="Hobnob - Yet Another Social Network" />

        <meta property="twitter:description" content="Engage. Post. Enjoy." />

        <meta property="twitter:image" content="https://res.cloudinary.com/tjwnzr4u7xadg/image/upload/v1653991444/Hobnob_koq1bm.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}