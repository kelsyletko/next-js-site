// pages/topic/[id].js
import { useRouter } from 'next/router';
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
  const res = await fetch(`http://localhost:3000/api/topics`);
  const topics = await res.json();
  const topic = topics.find((topic) => topic.id === parseInt(id));

  return {
    props: {
      topic: topic || null,
    },
  };
}