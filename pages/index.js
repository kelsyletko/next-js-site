import Link from 'next/link';
import Head from 'next/head';

export default function Home({ topics }) {
  // Log topics to validate data is received correctly
  console.log('Topics received:', topics);

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
  try {
    // Log the API URL to verify it's correct
    const apiUrl = process.env.API_URL || 'http://localhost:3000/api/topics';
    console.log('API URL being used:', apiUrl);

    // Fetch data from the API
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    // Log the response status to ensure it's successful
    console.log('Fetch response status:', res.status);

    // Parse the response data
    const topics = await res.json();

    // Log the fetched data to verify it’s correct
    console.log('Fetched topics:', topics);

    return {
      props: {
        topics,
      },
    };
  } catch (error) {
    // Log any errors that occur during fetching
    console.error('Failed to fetch topics:', error);
    return {
      props: {
        topics: [],
      },
    };
  }
}
