// pages/topic/index.js
import Link from 'next/link';
import Head from 'next/head';

export default function TopicList({ topics }) {
  return (
    <div>
      <Head>
        <title>Topics</title>
        <meta name="description" content="A list of topics related to Kelsy Letko" />
      </Head>
      <h1>Topics</h1>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>
            <Link href={`/topic/${topic.id}`}>
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL || 'http://localhost:3000/api/topics';
  const res = await fetch(apiUrl);
  const topics = await res.json();

  return {
    props: {
      topics,
    },
  };
}

