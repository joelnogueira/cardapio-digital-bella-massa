<?php

include_once "config.php";
session_start();
if (!isset($_SESSION['logado']) || $_SESSION['logado'] != true) {
  header("location: ../index.html");
  exit;
}

?>

<!DOCTYPE html>
<html lang="pt-PT">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cardápio-1</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

  <link rel="stylesheet" href="../assets/css/admin/admin.css">

</head>

<body id="body-tema">
  <main>

    <header>
      <nav>
        <div class="admin" onclick="menu_inicial()">
          <ion-icon name="home-outline"></ion-icon>
        </div>

        <div class="logo" onclick="menu_inicial()">
          <img src="../assets/img/logo-bella-massa.png" alt="">
        </div>

      </nav>
      <div class="config">
        <div>
          <ion-icon name="exit-outline" onclick="window.location.href='sair.php'"></ion-icon>
          <ion-icon name="key-outline" data-bs-toggle="modal" data-bs-target="#abrirModalRedifinirPin"></ion-icon>
        </div>
      </div>
    </header>

    <section>


      <!-- Modal -->
      <div class="modal fade" id="abrirModalRedifinirPin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content"
            style="background-color: var(--cor-preta);
          color:var(--cor-laranja);
          font-family: var(--fonte-secundaria);">
            <div class="modal-header">
              <h1 class="modal-title fs-6" id="exampleModalLabel"> Redifinir PIN </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="text-center">
                <form id="FormRedifinirPin" method="post">

                  <input type="password" id="redifinirPin" name="senha" maxlength="4" class="pin-input mb-2"
                    placeholder="Digite o PIN Antigo" autocomplete="off" autofocus>

                  <input type="password" id="redifinirPin2" name="senha2" maxlength="4" class="pin-input" mb-2
                    placeholder="Digite o PIN Novo" autocomplete="off">

                  <input type="text" id="redifinirTelefone" name="telefone" class="telefone-input" placeholder="Digite o Whatsapp" autocomplete="off">

                  <button type="submit" class="btn-pin">Enviar</button>
                </form>

                <small class="text-muted d-block mt-2"
                  style="color: var(--cor-laranja) !important; font-size:11px;">*PIN de 4 dígitos</small>
              </div>



            </div>

          </div>
        </div>
      </div>
      <!--Fim Modal -->



      <div class="mt-4 mb-2">
        <input type="text" autofocus id="buscarPrato" class="input-busca" placeholder=" Buscar prato pelo nome...">
      </div>

      <button id="btnNovoPrato" class="btn-novo-prato" data-bs-toggle="modal" data-bs-target="#abrirModalCadastro" onclick="document.getElementById('formCardapio').reset(); document.getElementById('preview').innerHTML = ''; document.querySelector('input[name=id]').value = '';">

        <span>+ Cadastrar novo prato</span>
      </button>

      <h3 class="text-light mt-4" style="font-family: var(--fonte-secundaria); font-size: 14px;">Pratos cadastrados</h3>
      <div id="listaPratos" class="lista-pratos"></div>


      <!-- Modal -->
      <!-- Modal Cadastro-->
      <div class="modal fade" id="abrirModalCadastro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-6" id="exampleModalLabel"> Cadastrar Prato </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="alert"></p>

              <form id="formCardapio" method="post" enctype="multipart/form-data" class="card-form">

                <div class="form-group">
                  <label>Nome do prato</label>
                  <input type="text" id="nomePrato" name="nome" placeholder="Ex: Frango grelhado com legumes" autofocus required>
                </div>

                <div class="form-group">
                  <label>Breve descrição</label>
                  <textarea name="descricao" id="descricao" placeholder="Ex: Preparado com temperos naturais e acompanhado de arroz..." rows="3" required></textarea>
                </div>

                <div class="form-group">
                  <label>Destaque</label>
                  <select name="destaque">
                    <option value="" selected>Nenhum</option>
                    <option value="Prato da casa">Prato da Casa</option>
                    <option value="Mais vendido">Mais Vendido</option>
                    <option value="Novo no menu">Novo no Menu</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Preço (Kz)</label>
                  <input type="number" id="preco" name="preco" step="0.01" min="0" placeholder="Ex: 3200" required>
                </div>

                <div class="form-group">
                  <label>Categoria</label>
                  <select name="categoria" required>
                    <option value="" selected>Selecione</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Prato principal">Prato Principal</option>
                    <option value="Sobremesa">Sobremesa</option>
                    <option value="Bebida">Bebida</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Imagem do prato</label>
                  <input type="file" name="imagem" accept="image/*" id="imgInput">
                  <div class="img-preview" id="preview"></div>
                </div>

                <input type="hidden" name="id">

                <button type="submit" class="btn-submit">Cadastrar</button>

              </form>



            </div>

          </div>
        </div>
      </div>
      <!--Fim Modal Confirmar_Excluir-->

      <div class="modal fade" id="modalConfirmar" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style="background:#141414; color:#fff; border:1px solid #333; font-size:12px;">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size:15px; color:var(--cor-laranja); ">Confirmar exclusão</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              Tem certeza que deseja remover este prato do menu?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                style="font-size:13px; padding:2px; ">Cancelar</button>
              <button type="button" class="btn btn-danger" id="btnConfirmarExcluir"
                style="font-size:13px; padding:2px; ">Excluir</button>
            </div>
          </div>
        </div>
      </div>




    </section>


  </main>



  <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

  <script src="../assets/js/admin/admin.js"></script>

  <script>


  </script>



</body>

</html>