import Datastore from 'nedb';
import path from 'path';

const dbFile = path.resolve(__dirname, '..', 'persist', 'db');

export default function db() {
    const store = new Datastore({ filename: dbFile, autoload: true });
    return Promise.resolve({
        get: get(store),
        set: set(store)
    });
}

const get = store => sessionId => {
    return new Promise((resolve, reject) => {
        store.findOne({ id: sessionId}, (err, session) => {
            if (err) {
                reject(err);
            } else {
                if (session) {
                    resolve(session);
                } else {
                    resolve({
                        id: sessionId,
                        posts: []
                    });
                }

            }
        });
    });

}

const set = store => session => {
    return new Promise((resolve, reject) => {
        store.update({ id: session._id }, session, { upsert: true}, err => {
            if (err) {
                reject(err);
            } else {
                resolve(session);
            }
        });
    });

}
