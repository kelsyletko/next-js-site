// pages/api/topics.js
export default function handler(req, res) {
  const topics = [
    { id: 1, title: "Who Am I?", content: "My name is Kelsy Letko and I live in Tampa, FL with my fiance and two cats." },
    { id: 2, title: "Things I Love", content: "I love traveling, good food, live music, the beach, snowboarding, and movies." },
    { id: 3, title: "My Bucket List", content: "I'd love to: snowboard in the Alps, go scuba diving, stay in a hotel bungalow on the water, become fluent in another language, buy a house, and go in a hot air balloon." },
  ];

  const { id } = req.query;

  if (id) {
    const topic = topics.find(t => t.id === parseInt(id));
    if (topic) {
      res.status(200).json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } else {
    res.status(200).json(topics);
  }
}
