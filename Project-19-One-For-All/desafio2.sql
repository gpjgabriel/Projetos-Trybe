SELECT
  COUNT(DISTINCT mu.musica_nome) AS cancoes,
  COUNT(DISTINCT ar.artista_nome) AS artistas,
  COUNT(DISTINCT al.album_nome) AS albuns
FROM SpotifyClone.musica AS mu,
  SpotifyClone.artista AS ar,
  SpotifyClone.album AS al;