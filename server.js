const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('./dbconnection');
db.query('USE surfbs', (err) => { if (err) throw Error('db cant use surfbs'); });

const app = express();

app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser());

// mocks
const checkAuth = (name, hash) => name == hash
const createKey = () => 'sesame'
const asyncMock = val => () => new Promise((resolve, reject) => setTimeout( () => resolve(val), 1000))

// 
// authentication middleware
//
const isAuthorized = async (req, res, next) => {
    // récupérer le cookie
    const { fbsid } = req.cookies;
    req.isAuthorized = await isValidKey(fbsid)
    next();
}

// DB 
const isValidKey = asyncMock(true)

/**
 * 
 *       API
 * 
 */

app.post('/auth', (req, res) => {

    const { name, hash } = req.body;
    // compare le hash avec celui du user, stocké dans la db
    userIsAuthorized = checkAuth(name, hash);

    if (userIsAuthorized) {
        // générer une clef valable
        const key = createKey()
        // la stocker dans la db
        // ...
        // l'envoyer dans un cookie
        res.cookie('fbsid', key)
    } else {
        res.redirect('')
    }
})

// /convives GET -> récupère liste des convives
app.get('/convives', (req, res) => {
    db.query(`SELECT nom FROM convives`,
        (err, results) => {
            if (err) return res.status(500).send('error querying convives :' + err.stack);
            res.send(results.map( o => o.nom))
        }
    )
})

// /sujets GET -> récupère liste des sujets
app.get('/sujets', (req, res) => {
    db.query(`SELECT intitule FROM sujets`, 
        (err, results, fields) => {
            if (err) return res.status(500).send('error querying sujets :' + err.stack);
            res.send(results.map( o => o['intitule']));
        }
    )
})

// /interventions GET  -> récupérer des interventions (sujet)
app.get('/interventions', (req, res) => {
    const { sujet } = req.query;
    db.query(`
        SELECT i.contenu, c.nom AS nom_convive
        FROM interventions AS i
        INNER JOIN convives AS c
        ON i.conviveID = c.conviveID
        INNER JOIN sujets AS s
        ON i.sujetID = s.sujetID 
        WHERE s.intitule = "${sujet}"
        ;
    `, (err, results) => {
        if (err) return res.status(500).send('error querying sujetID :' + err.stack);
        res.send(results);
    });
});

// /interventions POST  -> poster une intervention (contenu, convive, sujet)
app.post('/interventions', (req, res) => {

    const { contenu, convive, sujet } = req.body;
    if ( ! (contenu && convive && sujet) ) {
        return res.status(400).send('la requete doit contenir contenu, convive et sujet');
    }

    db.query(`INSERT INTO interventions (contenu, conviveID, sujetID)
            VALUES (
                "${contenu}", 
                (   SELECT conviveID 
                    FROM convives
                    WHERE nom = "${convive}"
                ), 
                (   SELECT sujetID
                    FROM sujets
                    WHERE intitule = "${sujet}"
                )
            );
        `, (err, results, fields) => {
            if (err) return res.status(500).send('db error :\n' + err);
            res.status(200).send('intervention enregistrée');
        }
    );
});

/**
 * 
 *     LISTEN
 * 
 */

app.listen(8000, err => {
    if (err) throw err;
    console.log('Listening on port 8000')
});

// pour faire du https ? 
// http.createServer(app).listen(8000)
// https.createServer(options, app).listen(8443)