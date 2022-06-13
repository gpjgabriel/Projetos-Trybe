DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

CREATE TABLE SpotifyClone.plano(
    plano_id INT PRIMARY KEY AUTO_INCREMENT,
    plano_nome VARCHAR(20) NOT NULL,
    plano_valor DECIMAL(3,2) NOT NULL
) engine = InnoDB;

INSERT INTO SpotifyClone.plano (plano_id, plano_nome, plano_valor)
VALUES
  (1, 'gratuito', 0.00),
  (2, 'universitário', 5.99),
  (3, 'pessoal', 6.99),
  (4, 'familiar', 7.99);

CREATE TABLE SpotifyClone.usuario(
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_nome VARCHAR(45) NOT NULL,
    usuario_idade INT NOT NULL,
    plano_id INT NOT NULL,
    FOREIGN KEY (plano_id) REFERENCES plano (plano_id),
    plano_data VARCHAR(25) NOT NULL
) engine = InnoDB;

INSERT INTO SpotifyClone.usuario(
  usuario_id,
  usuario_nome,
  usuario_idade,
  plano_id,
  plano_data
)
VALUES
  (1, 'Thati', 23, 1, '2019-10-20'),
  (2, 'Cintia', 35, 4, '2017-12-30'),
  (3, 'Bill', 20, 2, '2019-06-05'),
  (4, 'Roger', 45, 3, '2020-05-13'),
  (5, 'Norman', 58, 3, '2017-02-17'),
  (6, 'Patrick', 33, 4, '2017-01-06'),
  (7, 'Vivian', 26, 2, '2018-01-05'),
  (8, 'Carol', 19, 2, '2018-02-14'),
  (9, 'Angelina', 42, 4, '2018-04-29'),
  (10, 'Paul', 46, 4, '2017-01-17');

CREATE TABLE SpotifyClone.artista(
    artista_id INT PRIMARY KEY AUTO_INCREMENT,
    artista_nome VARCHAR(30) NOT NULL
) engine = InnoDB;

INSERT INTO SpotifyClone.artista (artista_id, artista_nome)
VALUES
  (1, 'Walter Phoenix'),
  (2, 'Peter Strong'),
  (3, 'Lance Day'),
  (4, 'Freedie Shannon'),
  (5, 'Tyler Isle'),
  (6, 'Fog');

CREATE TABLE SpotifyClone.album(
    album_id INT PRIMARY KEY AUTO_INCREMENT,
    album_nome VARCHAR(30) NOT NULL,
    artista_id INT NOT NULL,
    album_ano_lancamento INT NOT NULL,
    FOREIGN KEY (artista_id) REFERENCES artista (artista_id)
) engine = InnoDB;

INSERT INTO SpotifyClone.album (album_id, album_nome, artista_id, album_ano_lancamento)
VALUES
  (1, 'Envious', 1, 1990),
  (2, 'Exuberant', 1, 1993),
  (3, 'Hallowed Steam', 2, 1995),
  (4, 'Incandescent', 3, 1998),
  (5, 'Temporary Culture', 4, 2001),
  (6, 'Library of liberty', 4, 2003),
  (7, 'Chained Down', 5, 2007),
  (8, 'Cabinet of fools', 5, 2012),
  (9, 'No guarantees', 5, 2015),
  (10, 'Apparatus', 6, 2015);

CREATE TABLE SpotifyClone.musica(
    musica_id INT PRIMARY KEY AUTO_INCREMENT,
    musica_nome VARCHAR(45) NOT NULL,
    musica_duracao INT NOT NULL,
    album_id INT NOT NULL,
    artista_id INT NOT NULL,
    FOREIGN KEY (artista_id) REFERENCES artista (artista_id),
    FOREIGN KEY (album_id) REFERENCES album (album_id)
) engine = InnoDB;

INSERT INTO SpotifyClone.musica (musica_id, musica_nome, musica_duracao, album_id, artista_id)
VALUES
  (1, 'Soul For Us', 200, 1, 1),
  (2, 'Reflections Of Magic', 163, 1, 1),
  (3, 'Dance With Her Own', 116, 1, 1),
  (4, 'Troubles Of My Inner Fire', 203, 2, 1),
  (5, 'Time Fireworks', 152, 2, 1),
  (6, 'Magic Circus', 105, 3, 2),
  (7, 'Honey, So Do I', 207, 3, 2),
  (8, "Sweetie, Let's Go Wild", 139, 3, 2),
  (9, 'She Knows', 244, 3, 2),
  (10, 'Fantasy For Me', 100, 4, 3),
  (11, 'Celebration Of More', 146, 4, 3),
  (12, 'Rock His Everything', 223, 4, 3),
  (13, 'Home Forever', 231, 4, 3),
  (14, 'Diamond Power', 241, 4, 3),
  (15, "Let's Be Silly", 132, 4, 3),
  (16, 'Thang Of Thunder', 240, 5, 4),
  (17, 'Words Of Her Life', 185, 5, 4),
  (18, 'Without My Streets', 176, 5, 4),
  (19, 'Need Of The Evening', 190, 6, 4),
  (20, 'History Of My Roses', 222, 6, 4),
  (21, 'Without My Love', 111, 6, 4),
  (22, 'Walking And Game', 123, 6, 4),
  (23, 'Young And Father', 197, 6, 4),
  (24, 'Finding My Traditions', 179, 7, 5),
  (25, 'Walking And Man', 229, 7, 5),
  (26, 'Hard And Time', 135, 7, 5),
  (27, "Honey, I'm A Lone Wolf", 150, 7, 5),
  (28, "She Thinks I Won't Stay Tonight", 166, 8, 5),
  (29, "He Heard You're Bad For Me", 154, 8, 5),
  (30, "He Hopes We Can't Stay", 210, 8, 5),
  (31, 'I Know I Know', 117, 8, 5),
  (32, "He's Walking Away", 159, 9, 5),
  (33, "He's Trouble", 138, 9, 5),
  (34, 'I Heard I Want To Bo Alone', 120, 9, 5),
  (35, 'I Ride Alone', 151, 9, 5),
  (36, 'Honey', 79, 10, 6),
  (37, 'You Cheated On Me', 95, 10, 6),
  (38, "Wouldn't It Be Nice", 213, 10, 6),
  (39, 'Baby', 136, 10, 6),
  (40, 'You Make Me Feel So..', 83, 10, 6);

CREATE TABLE SpotifyClone.reproducoes(
    reproducoes_id INT AUTO_INCREMENT,
    usuario_id INT,
    musica_id INT,
    reproducoes_data VARCHAR(25) NOT NULL,
    CONSTRAINT PRIMARY KEY (reproducoes_id, usuario_id, musica_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id),
    FOREIGN KEY (musica_id) REFERENCES musica (musica_id)
) engine = InnoDB;

INSERT INTO SpotifyClone.reproducoes (reproducoes_id, usuario_id, musica_id, reproducoes_data)
VALUES
  (1, 1, 36, '2020-02-28 10:45:55'),
  (2, 1, 25, '2020-05-02 05:30:35'),
  (3, 1, 23, '2020-03-06 11:22:33'),
  (4, 1, 14, '2020-08-05 08:05:17'),
  (5, 1, 15, '2020-09-14 16:32:22'),
  (6, 2, 34, '2020-01-02 07:40:33'),
  (7, 2, 24, '2020-05-16 06:16:22'),
  (8, 2, 21, '2020-10-09 12:27:48'),
  (9, 2, 39, '2020-09-21 13:14:46'),
  (10, 3, 6, '2020-11-13 16:55:13'),
  (11, 3, 3, '2020-12-05 18:38:30'),
  (12, 3, 26, '2020-07-30 10:00:00'),
  (13, 4, 2, '2021-08-15 17:10:10'),
  (14, 4, 35, '2021-07-10 15:20:30'),
  (15, 4, 27, '2021-01-09 01:44:33'),
  (16, 5, 7, '2020-07-03 19:33:28'),
  (17, 5, 12, '2017-02-24 21:14:22'),
  (18, 5, 14, '2020-08-06 15:23:43'),
  (19, 5, 1, '2020-11-10 13:52:27'),
  (20, 6, 38, '2019-02-07 20:33:48'),
  (21, 6, 29, '2017-01-24 00:31:17'),
  (22, 6, 30, '2017-10-12 12:35:20'),
  (23, 6, 22, '2018-05-29 14:56:41'),
  (24, 7, 5, '2018-05-09 22:30:49'),
  (25, 7, 4, '2020-07-27 12:52:58'),
  (26, 7, 11, '2018-01-16 18:40:43'),
  (27, 8, 39, '2018-03-21 16:56:40'),
  (28, 8, 40, '2020-10-18 13:38:05'),
  (29, 8, 32, '2019-05-25 08:14:03'),
  (30, 8, 33, '2021-08-15 21:37:09'),
  (31, 9, 16, '2021-05-24 17:23:45'),
  (32, 9, 17, '2018-12-07 22:48:52'),
  (33, 9, 8, '2021-03-14 06:14:26'),
  (34, 9, 9, '2020-04-01 03:36:00'),
  (35, 10, 20, '2017-02-06 08:21:34'),
  (36, 10, 21, '2017-12-04 05:33:43'),
  (37, 10, 12, '2017-07-27 05:24:49'),
  (38, 10, 13, '2017-12-25 01:03:57');

CREATE TABLE SpotifyClone.follow(
    follow_id INT AUTO_INCREMENT,
    usuario_id INT,
    artista_id INT,
    CONSTRAINT PRIMARY KEY (follow_id, usuario_id, artista_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id),
    FOREIGN KEY (artista_id) REFERENCES artista (artista_id)
) engine = InnoDB;

INSERT INTO SpotifyClone.follow (follow_id, usuario_id, artista_id)
VALUES
  (1, 1, 1),
  (2, 1, 3),
  (3, 1, 4),
  (4, 2, 1),
  (5, 2, 3),
  (6, 3, 2),
  (7, 3, 1),
  (8, 4, 4),
  (9, 5, 5),
  (10, 5, 6),
  (11, 6, 6),
  (12, 6, 3),
  (13, 6, 1),
  (14, 7, 2),
  (15, 7, 5),
  (16, 8, 1),
  (17, 8, 5),
  (18, 9, 6),
  (19, 9, 4),
  (20, 9, 3),
  (21, 10, 2),
  (22, 10, 6);