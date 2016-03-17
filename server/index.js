import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8081;
const htmlFile = path.resolve(__dirname, '..', 'static', 'index.html');
const staticFolder = path.resolve(__dirname, '..', 'static');

console.log('Static folder: ', staticFolder);

app.use('/assets', express.static(staticFolder));
app.get('/*', (req, res) => res.sendFile(htmlFile));

app.listen(port);
console.log('Server started on port ' + port);
