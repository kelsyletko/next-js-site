import Link from 'next/link';
import Head from 'next/head';

export default function Home({ topics, error }) {
  // Log topics to validate data is received correctly
  console.log('Topics received:', topics);

  if (error) {
    return <div>Error fetching topics: {error}</div>;
  }

  return (
    <div>
      <Head>
        <title>Kelsy Letko</title>
        <meta name="description" content="A site to learn about Kelsy Letko." />
      </Head>
      <h1>Welcome to My Site About Me</h1>
      <h2>Topics</h2>
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
  let topics = [];
  let error = null;

  try {
    const apiUrl = "https://next-js-site-4rdq8q3wd-kelsy-lekos-projects.vercel.app/api/topics";
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    topics = await res.json();
  } catch (err) {
    console.error('Error fetching topics:', err);
    error = err.message;
  }

  return {
    props: {
      topics,
      error,
    },
  };
}

