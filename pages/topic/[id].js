import Head from 'next/head';

export default function TopicPage({ topic }) {
  if (!topic) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>{topic.title}</title>
        <meta name="description" content={topic.content} />
      </Head>
      <h1>{topic.title}</h1>
      <p>{topic.content}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const apiUrl = process.env.API_URL || 'http://localhost:3000/api/topics'; // Update API_URL for production
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const topics = await res.json();
    const topic = topics.find((topic) => topic.id === parseInt(id));

    return {
      props: {
        topic: topic || null,
      },
    };
  } catch (error) {
    console.error('Failed to fetch topic:', error.message);
    return {
      props: {
        topic: null,
      },
    };
  }
}
