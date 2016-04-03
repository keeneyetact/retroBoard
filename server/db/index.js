import nedb from './nedb';
import mongo from './mongo';
import config from '../../config';
import chalk from 'chalk';
import emoji from 'node-emoji'; // https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json

export default () => {
    if (config.DB_Use_Mongo) {
        console.log(chalk.yellow(emoji.get('computer')+'   Using '+chalk.red('MongoDB')+' database'));
        return mongo();
    } else {
        console.log(chalk.yellow(emoji.get('computer')+'   Using '+chalk.red('NeDB')+' database'));
        return nedb();
    }
}
