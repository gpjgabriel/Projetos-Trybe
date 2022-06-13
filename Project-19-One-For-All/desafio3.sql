SELECT
  us.usuario_nome AS usuario,
  COUNT(re.usuario_id) AS qtde_musicas_ouvidas,
  ROUND(SUM(mu.musica_duracao) / 60, 2) AS total_minutos
FROM SpotifyClone.usuario AS us
JOIN SpotifyClone.reproducoes AS re ON re.usuario_id = us.usuario_id
JOIN SpotifyClone.musica AS mu ON mu.musica_id = re.musica_id
GROUP BY re.usuario_id
ORDER BY usuario;