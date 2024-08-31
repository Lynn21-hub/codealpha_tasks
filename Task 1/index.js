const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app=express();
app.use(bodyParser.json());

function generateShortID(length){
    return crypto.randomBytes(length).toString('hex').substring(0, length);
}
app.post('/shorten',(req,res)=> {
    const originalUrl=req.body.url;
    const shortId=generateShortID(6);
    db.run('INSERT INTO url_map (short_id, original_url) VALUES (?, ?)', [shortId, originalUrl], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ short_url: req.headers.host + '/' + shortId });
    });
});

app.get('/:short_id', (req, res) => {
    const shortId = req.params.short_id;

    db.get('SELECT original_url FROM url_map WHERE short_id = ?', [shortId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.redirect(row.original_url);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    });
});
app.get('/:short_id', (req, res) => {
    const shortId = req.params.short_id;

    db.get('SELECT original_url FROM url_map WHERE short_id = ?', [shortId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.redirect(row.original_url);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    });
});

