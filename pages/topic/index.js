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
        {topics.length > 0 ? (
          topics.map(topic => (
            <li key={topic.id}>
              <Link href={`/topic/${topic.id}`}>
                {topic.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No topics available.</li>
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Ensure this URL is correct for production
    const apiUrl = process.env.API_URL || 'http://localhost:3000/api/topics';
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const topics = await res.json();

    return {
      props: {
        topics,
      },
    };
  } catch (error) {
    console.error('Failed to fetch topics:', error);
    return {
      props: {
        topics: [],
      },
    };
  }
}
