SELECT
	us.usuario_nome AS usuario,
	CASE
    WHEN MAX(re.reproducoes_data) LIKE '2021%'
    THEN 'Usuário ativo'
    ELSE 'Usuário inativo' END AS condicao_usuario
FROM SpotifyClone.usuario AS us
JOIN SpotifyClone.reproducoes AS re ON re.usuario_id = us.usuario_id
GROUP BY re.usuario_id
ORDER BY usuario;