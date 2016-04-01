import Datastore from 'nedb';
import path from 'path';

const dbFile = path.resolve(__dirname, '..', 'persist', 'db');

export default function db() {
    const store = new Datastore({ filename: dbFile, autoload: true });
    return {
        get: get(store),
        set: set(store)
    };
}

const get = store => sessionId => {
    return new Promise((resolve, reject) => {
        store.findOne({ _id: sessionId}, (err, session) => {
            if (err) {
                reject(err);
            } else {
                if (session) {
                    resolve(session);
                } else {
                    resolve({
                        posts: []
                    });
                }

            }
        });
    });

}

const set = store => (sessionId, session) => {
    session._id = sessionId;

    return new Promise((resolve, reject) => {
        store.update({ _id: sessionId }, session, { upsert: true}, err => {
            if (err) {
                console.warn(err);
                reject(err);
            } else {
                console.log('save ok')
                resolve(session);
            }
        });
    });

}
