SELECT
  mu.musica_nome AS cancao,
  COUNT(re.usuario_id) AS reproducoes
FROM SpotifyClone.musica AS mu
JOIN SpotifyClone.reproducoes AS re ON mu.musica_id = re.musica_id
GROUP BY mu.musica_id
ORDER BY reproducoes DESC, cancao
LIMIT 2;