CREATE DATABASE IF NOT EXISTS goldenPig;
USE goldenPig;
-- drop database goldenpig;
-- =========================
-- 👤 USUÁRIOS
-- =========================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);

CREATE TABLE telefones (
    id_telefone INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    numero VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

CREATE TABLE perfis (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo ENUM('PF', 'PJ') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

CREATE TABLE empreendimentos (
    id_empreendimento INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cnpj char(14),
    data_inicio DATE,
    FOREIGN KEY (id_perfil) REFERENCES perfis(id_perfil)
        ON DELETE CASCADE
);

-- drop table contasBank;

CREATE TABLE contasBank (
    id_conta INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT NOT NULL,
    nome_banco VARCHAR(100),
    tipo_conta ENUM('corrente', 'poupanca', 'carteira'),
    saldo DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (id_perfil) REFERENCES perfis(id_perfil)
        ON DELETE CASCADE
);

CREATE TABLE funcionarios (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    id_empreendimento INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11),
    cargo VARCHAR(50),
    data_admissao DATE,
    FOREIGN KEY (id_empreendimento) REFERENCES empreendimentos(id_empreendimento)
        ON DELETE CASCADE
);

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT NULL,
    nome VARCHAR(100) NOT NULL,
    padrao BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_perfil) REFERENCES perfis(id_perfil)
        ON DELETE CASCADE
);

INSERT INTO categorias (id_perfil, nome, padrao) VALUES
(NULL, 'Alimentação', TRUE),
(NULL, 'Transporte', TRUE),
(NULL, 'Moradia', TRUE),
(NULL, 'Saúde', TRUE),
(NULL, 'Educação', TRUE),
(NULL, 'Lazer', TRUE),
(NULL, 'Compras', TRUE),
(NULL, 'Assinaturas', TRUE),
(NULL, 'Contas', TRUE),
(NULL, 'Impostos', TRUE),
(NULL, 'Investimentos', TRUE),
(NULL, 'Salário', TRUE),
(NULL, 'Freelance', TRUE),
(NULL, 'Outros', TRUE);


CREATE TABLE faturamentos (
    id_faturamento INT AUTO_INCREMENT PRIMARY KEY,
    id_empreendimento INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data DATETIME NOT NULL,
    FOREIGN KEY (id_empreendimento) REFERENCES empreendimentos(id_empreendimento)
        ON DELETE CASCADE
);

-- drop table Transacoes;

CREATE TABLE transacoes (
    id_transacao INT AUTO_INCREMENT PRIMARY KEY,
    id_conta INT NOT NULL,
    id_categoria INT NOT NULL,
    id_faturamento INT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    data DATETIME NOT NULL,
    descricao VARCHAR(255),
    status ENUM('pendente', 'pago') DEFAULT 'pago',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_conta) REFERENCES contasBank(id_conta)
        ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
        ON DELETE CASCADE,
    FOREIGN KEY (id_faturamento) REFERENCES faturamentos(id_faturamento)
        ON DELETE SET NULL
);

CREATE TABLE salarios (
    id_salario INT AUTO_INCREMENT PRIMARY KEY,
    id_funcionario INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_pagamento DATE,
    status ENUM('pendente', 'pago') DEFAULT 'pendente',
    FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario)
        ON DELETE CASCADE
);

CREATE TABLE investimentos (
    id_investimento INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT NOT NULL,
    tipo VARCHAR(50),
    valor_investido DECIMAL(10,2) NOT NULL,
    rendimento DECIMAL(10,2),
    data_investimento DATE,
    descricao VARCHAR(255),
    FOREIGN KEY (id_perfil) REFERENCES perfis(id_perfil)
        ON DELETE CASCADE
);

CREATE INDEX idx_transacoes_conta ON transacoes(id_conta);
CREATE INDEX idx_transacoes_categoria ON transacoes(id_categoria);
CREATE INDEX idx_transacoes_data ON transacoes(data);