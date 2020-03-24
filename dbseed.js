const cnx = require('./dbconnection');

const callback = query => (err, results, fields) => {
    if (err) throw Error(err.stack)
    console.log( '===> OK : ' + query );
    console.log(results)
}
const query = sql => cnx.query(sql, callback(sql))

const querys = [

    // data base 
    `DROP DATABASE surfbs;`,
    `CREATE DATABASE IF NOT EXISTS surfbs CHARACTER SET utf8;`,
    `USE surfbs;`,

    // tables (convives, cles, sujets, interventions )

    // convives
    `CREATE TABLE IF NOT EXISTS convives (
        conviveID      SMALLINT NOT NULL AUTO_INCREMENT,
        nom            VARCHAR(30) NOT NULL,
        hash            VARCHAR(100) NOT NULL,
            PRIMARY KEY (conviveID)
    );`,
    // sujets
    `CREATE TABLE IF NOT EXISTS sujets (
        sujetID     INT NOT NULL AUTO_INCREMENT,
        intitule    VARCHAR(100),
            PRIMARY KEY (sujetID)
    );`,
    // interventions
    `CREATE TABLE IF NOT EXISTS interventions (
        interventionID    BIGINT NOT NULL AUTO_INCREMENT,
        contenu TEXT,
        conviveID SMALLINT,
        sujetID INT,
            PRIMARY KEY (interventionID),
            FOREIGN KEY (conviveID) REFERENCES convives (conviveID),
            FOREIGN KEY (sujetID)   REFERENCES sujets   (sujetID)
    );`,
    // cles
    `CREATE TABLE IF NOT EXISTS cles (
        cleID   INT NOT NULL AUTO_INCREMENT,
        cle     VARCHAR(50),
            PRIMARY KEY (cleID)
    );`,

    //
    // INSERTIONS
    //

    // convives
    `INSERT INTO convives (nom, hash)
    VALUES ('Toto', 'abcdefgh'),
        ('Fifi', 'azertyi'),
        ('Gluglu', 'poiuytre')
    ;`,

    // sujets
    `INSERT INTO sujets (intitule)
        VALUES ('Meteo'),
            ('Corona'),
            ('Vive le cyclisme')
    ;`,
    // interventions
    `INSERT INTO interventions (contenu, conviveID, sujetID)
        VALUES ('Blabalbalzdbazdlazbd', 1, 1),
            ('qodivqsvqsbdovqsbdv', 2, 2),
            ('qsdlinqsdvnqsdvjqskdvjqsdvkjqsdbvqksdjbv', 3, 3)
    ;`,
];

// pour l'instant ça marche mais ça devrait être async pour être sur que les opérations passent dans l'ordre

querys.forEach( q => query(q));