-- Criar banco de dados
DROP DATABASE cardapio_1;
CREATE DATABASE cardapio_1;
USE cardapio_1;

CREATE TABLE pratos (
    id INTEGER PRIMARY KEY auto_increment,
    id_usuario int,
    nome TEXT NOT NULL,
    descricao TEXT,
    destaque ENUM('Prato da casa','Mais vendido','Novo no menu'),
    preco DECIMAL(10,2) NOT NULL,
    categoria ENUM('Entrada','Prato principal','Sobremesa','Bebida'),
    imagem TEXT,
    foreign key(id_usuario) references usuario(id)
);
CREATE TABLE usuario (
	id int PRIMARY KEY auto_increment,
    senha varchar(100),
    nome varchar(100),
    telefone text,
    endereco varchar(255),
    google_maps longtext
);

select * from pratos where id_usuario = 2;
select * from usuario;

/*CADASTRAR PRATOS*/

-- ============================
-- CATEGORIA 1 — ENTRADAS
-- ============================
INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Bruschetta Clássica", "Pão crocante com tomate temperado, azeite e manjericão.", 2500, "Entrada", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Camarões ao Alho", "Camarões salteados na manteiga com alho e ervas.", 4200, "Entrada", "Prato da casa", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Coxinhas Gourmet", "Coxinhas recheadas com frango cremoso e crosta especial.", 3000, "Entrada", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Tábua de Frios Mini", "Mix de queijos, presunto, azeitonas e pães.", 5500, "Entrada", "Novo no menu", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Pastéis de Carne", "Pastéis sequinhos com recheio de carne moída temperada.", 2800, "Entrada", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Asinhas Picantes", "Asas de frango defumadas com molho hot especial.", 3700, "Entrada", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Salada Verde Fresca", "Mix de folhas com tomate-cereja e molho da casa.", 2200, "Entrada", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Mini Pizzas Artesanais", "Mini pizzas de pepperoni com massa fina.", 3400, "Entrada", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Bolinho de Bacalhau", "Bolinhos tradicionais com bacalhau e salsa.", 3800, "Entrada", "Prato da casa", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Creme de Legumes", "Creme leve e nutritivo de legumes selecionados.", 2000, "Entrada", NULL, NULL, 1);

-- ============================
-- CATEGORIA 2 — PRATOS PRINCIPAIS
-- ============================
INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Frango Grelhado com Limão", "Frango marinado no limão com acompanhamentos.", 6800, "Prato principal", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Picanha na Brasa", "Picanha suculenta com farofa e vinagrete.", 11500, "Prato principal", "Prato da casa", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Bife à Portuguesa", "Bife grelhado com ovo, batata frita e arroz.", 8700, "Prato principal", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Peixe Grelhado com Ervas", "Filete de peixe grelhado com manteiga de ervas.", 9000, "Prato principal", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Calulu de Peixe", "Prato angolano tradicional com peixe seco e folhas.", 7800, "Prato principal", "Prato da casa", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Espaguete à Bolonhesa", "Massa italiana com molho bolonhesa artesanal.", 6200, "Prato principal", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Moamba de Galinha", "Galinha ensopada com dendê e funge fresco.", 8200, "Prato principal", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Lasanha de Carne", "Camadas de massa, queijo e molho especial.", 7500, "Prato principal", "Novo no menu", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Arroz de Marisco", "Arroz cremoso com camarão, lula e mexilhão.", 10500, "Prato principal", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Hambúrguer Premium", "Hambúrguer artesanal com queijo cheddar e bacon.", 5500, "Prato principal", "Mais vendido", NULL, 1);

-- ============================
-- CATEGORIA 3 — SOBREMESAS
-- ============================
INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Mousse de Chocolate", "Mousse cremoso com chocolate meio-amargo.", 2000, "Sobremesa", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Pudim de Leite", "Pudim tradicional com calda caramelizada.", 1800, "Sobremesa", "Prato da casa", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Gelado Triplo", "3 bolas de gelado à escolha.", 2500, "Sobremesa", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Cheesecake de Morango", "Cheesecake cremoso com cobertura de morango.", 3200, "Sobremesa", "Novo no menu", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Torta de Maçã", "Fatia de torta quente com canela.", 2200, "Sobremesa", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Brownie com Gelado", "Brownie quente com bola de baunilha.", 2700, "Sobremesa", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Salada de Frutas Frescas", "Mix de frutas da estação.", 1600, "Sobremesa", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Crème Brûlée", "Creme francês com crosta caramelizada.", 3800, "Sobremesa", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Panacota de Baunilha", "Panacota suave com calda de frutos vermelhos.", 3500, "Sobremesa", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Tiramisu Clássico", "Sobremesa italiana com café e mascarpone.", 3900, "Sobremesa", "Prato da casa", NULL, 1);

-- ============================
-- CATEGORIA 4 — BEBIDAS
-- ============================
INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Sumo Natural de Manga", "Manga fresca batida na hora.", 1800, "Bebida", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Água Mineral 1L", "Garrafa de água mineral natural.", 800, "Bebida", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Refrigerante Lata", "Coca-Cola / Fanta / Sprite.", 1200, "Bebida", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Café Expresso", "Expresso forte e aromático.", 900, "Bebida", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Chá Gelado da Casa", "Chá gelado com limão e hortelã.", 1600, "Bebida", "Novo no menu", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Sumo de Abacaxi", "Abacaxi natural batido.", 1800, "Bebida", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Mojito Sem Álcool", "Hortelã, limão, açúcar e soda.", 2300, "Bebida", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Cerveja Nacional 330ml", "Cerveja gelada da marca local.", 1500, "Bebida", "Mais vendido", NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Café com Leite", "Expresso com leite vaporizado.", 1100, "Bebida", NULL, NULL, 1);

INSERT INTO pratos (nome, descricao, preco, categoria, destaque, imagem, id_usuario)
VALUES ("Smoothie de Frutos Vermelhos", "Mistura gelada de morango, amora e mirtilo.", 2700, "Bebida", "Prato da casa", NULL, 1);



