import mongoose from 'mongoose';
import config from '../../config';

const sessionShema = mongoose.Schema({
    name: String,
    id: { type: String, index: { unique: true }},
    posts: [{
        id: { type: String, index: { unique: true }},
        postType: String,
        content: String,
        user: String,
        likes: [String],
        dislikes: [String]
    }]
});

const Session = mongoose.model('Session', sessionShema);

export default function db() {
    mongoose.connect(config.DB_Mongo_URL);
    const store = mongoose.connection;
    return new Promise((resolve, reject) => {
        store.once('open', () => {
            resolve({
                get: get(store),
                set: set(store)
            })
        });
    });

}

const get = store => sessionId => {
    return new Promise((resolve, reject) => {
        Session.findOne({ id: sessionId}).lean().exec((err, session) => {
            if (err) {
                console.error(err)
                reject(err);
            } else {
                if (session) {
                    resolve(session);
                } else {
                    resolve({
                        id: sessionId,
                        name: null,
                        posts: []
                    });
                }

            }
        });
    });

}

const set = store => session => {
    const sessionObj = new Session(session);
    return new Promise((resolve, reject) => {
        Session.findOneAndUpdate({ id: session.id }, session, { upsert: true}, err => {
            if (err) {
                console.error(err)
                reject(err);
            } else {
                resolve(session);
            }
        });
    });

}
