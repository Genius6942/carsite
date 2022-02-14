import { getCollection } from '/lib/mongodb.js';

export default async function search(req, res) {
  const data = await getCollection('cars-all', { $text: { $search: req.body.query } });
  res.status(200).json(data);
}