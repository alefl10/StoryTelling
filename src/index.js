import app from './server/server';

const { db } = require('./config/keys');

const PORT = process.env.PORT || db.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
