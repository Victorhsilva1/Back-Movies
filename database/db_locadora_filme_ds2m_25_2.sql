CREATE DATABASE db_locadora_filme_ds2m_25_2;

USE db_locadora_filme_ds2m_25_2;

CREATE TABLE tbl_filme (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sinopse TEXT,
    data_lancamento DATE,
    duracao TIME NOT NULL,
    orcamento DECIMAL(10, 2) NOT NULL,
    trailer VARCHAR(200),
    capa VARCHAR(200) NOT NULL
);

INSERT INTO tbl_filme (
    nome,
    sinopse,
    data_lancamento,
    duracao,
    orcamento,
    trailer,
    capa
)
VALUES (
	'Rocky II - A Revanche',
    'Após a luta com Apollo Creed, Rocky tenta desfrutar de uma vida de classe média, mas rapidamente percebe que precisa voltar aos ringues. Ele e Apollo Creed se preparam para uma aguardada revanche.',
    '1979-06-15',
    '01:59:00',
    7000000.00,
    'https://www.youtube.com/watch?v=A2P9ATb9Qx8',
    'https://upload.wikimedia.org/wikipedia/pt/8/87/Rocky_2_poster.jpg'
);

SELECT * FROM tbl_filme;
