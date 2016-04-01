import fs from 'fs';
import path from 'path';


export default store => {
    console.log('migrating');
    const file = path.resolve(__dirname, '..', 'persist', 'sessions');
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Cannot read file: ', err);
            return;
        }

        const sessions = JSON.parse(data);
        const ids = Object.keys(sessions);

        const promises = ids.map(id => {
            const session = sessions[id];
            session._id = id;
            return store.set(session);
        });

        Promise.all(promises).then(() => {
            console.log('Migration done');
        }).catch(err => {
            console.error(err);
        });

    });
}
