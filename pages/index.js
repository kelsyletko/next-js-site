// pages/index.js
import Link from 'next/link';
import Head from 'next/head';

export default function Home({ topics }) {
  return (
    <div>
      <Head>
        <title>Kelsy Letko</title>
        <meta name="description" content="A site to learn about Kelsy Letko." />
      </Head>
      <h1>Welcome to My Site About Me</h1>
      <h2>Topics</h2>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>
            <Link href={`/topic/${topic.id}`} passHref>
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/topics');
  const topics = await res.json();

  return {
    props: {
      topics,
    },
  };
}
