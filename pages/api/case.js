const fetch = require('isomorphic-unfetch');
const faunadb = require('faunadb');
const apicache = require('apicache');
const csvjson = require('csvjson');

const cache = apicache.middleware;

const keyMap = {
    'Province/State': 'state',
    'Country/Region': 'region',
    'Last Update': 'lastUpdate',
    Confirmed: 'confirmed',
    Deaths: 'deaths',
    Recovered: 'recovered',
};

const numberKey = ['confirmed', 'deaths', 'recovered'];

function changeFormat(items) {
    return items.map(item => {
        const result = {};
        Object.keys(item).forEach(key => {
            const nextKey = keyMap[key];
            if (numberKey.includes(nextKey)) {
                result[nextKey] = Number(item[key]);
            } else {
                result[nextKey] = item[key];
            }
        });
        return result;
    });
}

const token = process.env.GITHUB_TOKEN;
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

const isExistData = async name => {
    try {
        await client.query(q.Get(q.Match(q.Index('DailyCase_by_name'), name)));
        return true;
    } catch (e) {
        return false;
    }
};

const updateCase = (req, res) => async () => {
    try {
        const dailyCase = await fetch(
            'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports',
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
        console.log(isExist, recent.name);
        if (!isExist) {
            const recentCase = await fetch(recent.download_url);
            const data = await recentCase.text();
            const jsonArr = changeFormat(
                csvjson.toObject(data, {
                    delimiter: ',',
                    quote: '"',
                })
            );

            const result = await client.query(
                q.Create(q.Collection('DailyCase'), {
                    data: {
                        name: recent.name,
                    },
                })
            );

            await Promise.all(
                jsonArr.map(async data => {
                    data.dailyCase = result.ref;
                    await client.query(
                        q.Create(q.Collection('Case'), {
                            data,
                        })
                    );
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
