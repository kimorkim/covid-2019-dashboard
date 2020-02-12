const faunadb = require("faunadb");

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  try {
    const dbs = await client.query(
      q.Map(q.Paginate(q.Match(q.Index("all_test"))), ref => {
        return q.Get(ref);
      })
    );
    res.status(200).json(dbs.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
