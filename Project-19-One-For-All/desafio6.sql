SELECT
	MIN(pl.plano_valor) AS faturamento_minimo,
	MAX(pl.plano_valor) AS faturamento_maximo,
  ROUND(AVG(pl.plano_valor), 2) AS faturamento_medio,
  ROUND(SUM(pl.plano_valor), 2) AS faturamento_total
FROM SpotifyClone.plano AS pl
JOIN SpotifyClone.usuario AS us ON us.plano_id = pl.plano_id;