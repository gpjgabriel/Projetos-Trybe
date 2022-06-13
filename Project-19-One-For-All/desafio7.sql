SELECT
	ar.artista_nome AS artista,
	al.album_nome AS album,
	COUNT(fo.artista_id) AS seguidores
FROM SpotifyClone.album AS al
JOIN SpotifyClone.artista AS ar ON al.artista_id = ar.artista_id
JOIN SpotifyClone.follow AS fo ON fo.artista_id = ar.artista_id
GROUP BY album, artista
ORDER BY seguidores DESC, artista, album;