<?php
// api/projetos.php - projetos PUBLICADOS do Portfolio em JSON

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/../conexao.php';

try {

    if (isset($_GET['id'])) {

        $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
                FROM projetos
                WHERE id = ? AND status = 'publicado'";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_GET['id']]);

        $projeto = $stmt->fetch();

        if (!$projeto) {
            http_response_code(404);
            echo json_encode([
                'erro' => 'Projeto não encontrado'
            ]);
            exit;
        }

        echo json_encode($projeto);

    } else {

        $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
                FROM projetos
                WHERE status = 'publicado'
                ORDER BY ano DESC, id";

        $projetos = $pdo->query($sql)->fetchAll();

        echo json_encode($projetos);
    }

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'erro' => 'Erro interno do servidor'
    ]);
}