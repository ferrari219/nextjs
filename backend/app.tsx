const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080; // 포트번호

app.use(cors());
app.get('/api/posts', (req, res) => {
	res.json('');
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
