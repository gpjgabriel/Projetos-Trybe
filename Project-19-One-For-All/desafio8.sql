SELECT
	ar.artista_nome AS artista,
	al.album_nome AS album
FROM SpotifyClone.album AS al
JOIN SpotifyClone.artista AS ar ON al.artista_id = ar.artista_id
WHERE ar.artista_nome = 'Walter Phoenix'
ORDER BY album, artista;