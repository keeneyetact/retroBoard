import nedb from './nedb';
import mongo from './mongo';
import config from '../../config';

export default () => {
    if (config.DB_Use_Mongo) {
        return mongo();
    } else {
        return nedb();
    }
}
