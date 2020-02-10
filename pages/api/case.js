const fetch = require('isomorphic-unfetch');
const faunadb = require('faunadb');
const apicache = require('apicache');

const cache = apicache.middleware;

function csvJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j].replace(/\"/gi, '');
        }
        result.push(obj);
    }
    return result;
}

const token = process.env.GITHUB_TOKEN;
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

const isExistData = async name => {
    try {
        await client.query(q.Get(q.Match(q.Index('dailycase_by_name'), name)));
        return true;
    } catch (e) {
        return false;
    }
};

const updateCase = (req, res) => async () => {
    try {
        const dailyCase = await fetch(
            'https://api.github.com/repos/CSSEGISandData/2019-nCoV/contents/daily_case_updates',
            {
                headers: {
                    Authorization: `token ${token}`,
                },
            }
        );
        const cases = await dailyCase.json();
        const recent = cases.reduce((acc, value) => {
            const { name } = value;
            if (name.indexOf('csv') > -1 && name > (acc.name || '')) {
                acc = value;
            }
            return acc;
        }, {});
        const isExist = await isExistData(recent.name);
        if (!isExist) {
            const recentCase = await fetch(recent.download_url);
            const data = await recentCase.text();
            await client.query(
                q.Create(q.Collection('dailycase'), {
                    data: {
                        name: recent.name,
                        cases: csvJSON(data),
                    },
                })
            );
        }
        res.status(200).json({ message: 'success' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = (req, res) => {
    cache('1 hour')(req, res, updateCase(req, res));
};
