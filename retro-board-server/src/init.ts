import buildConfig from './build-config';

async function go() {
  console.log('Creating ormconfig.json before migrations');
  buildConfig();
}

go();
