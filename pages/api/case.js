const fetch = require('isomorphic-unfetch');
const faunadb = require('faunadb');
const apicache = require('apicache');

const cache = apicache.middleware;

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
        const apiInfo = await fetch(
            'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1?f=pjson'
        );
        const { editingInfo = {} } = await apiInfo.json();
        const { lastEditDate } = editingInfo;
        const name = String(lastEditDate);
        const isExist = await isExistData(name);
        if (!isExist) {
            const covidInfo = await fetch(
                'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Confirmed%20desc%2CCountry_Region%20asc%2CProvince_State%20asc&resultOffset=0&resultRecordCount=250&cacheHint=true'
            );

            const { features } = await covidInfo.json();
            const result = await client.query(
                q.Create(q.Collection('DailyCase'), {
                    data: {
                        name,
                        lastEditDate,
                    },
                })
            );

            await Promise.all(
                features.map(async ({ attributes: data }) => {
                    data.dailyCase = result.ref;
                    data.Lat = String(data.Lat);
                    data.Long_ = String(data.Long_);
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
        console.error(e);
        res.status(500).json({ error: e.message });
    }
};

module.exports = (req, res) => {
    cache('1 hour')(req, res, updateCase(req, res));
};
