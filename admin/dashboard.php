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
          <ion-icon name="create-outline" data-bs-toggle="modal" data-bs-target="#abrirModalEditar"></ion-icon>
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




      <!-- Modal editar dados -->
      <div class="modal fade" id="abrirModalEditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content"
            style="background-color: var(--cor-preta);
          color:var(--cor-laranja);
          font-family: var(--fonte-secundaria);">
            <div class="modal-header">
              <h1 class="modal-title fs-6" id="exampleModalLabel"> Atualizar Dados </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="text-center">
                <form id="atualizarDados" method="post">

                  <input type="text" id="atualizar" name="nome" class="nome-input atualizarInput mb-2"
                    placeholder="Atualizar nome" autocomplete="off" autofocus>

                  <input type="text" id="atualizar" name="endereco" class="endereco-input atualizarInput mb-2"
                    placeholder="Atualizar endereço" autocomplete="on" autofocus>

                    <input type="text" id="atualizar" name="map" class="maps-input atualizarInput" placeholder="Link Google Maps" autocomplete="off">

                  <input type="text" id="atualizarTelefone" name="telefone" class="telefone-input atualizarInput" placeholder="Atualizar telefone" autocomplete="off">


                  <button type="submit" class="btn-atualizar">Atualizar dados</button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
      <!--Fim Modal editar -->







      <div class="mt-4 mb-2">
        <input type="text" autofocus id="buscarPrato" class="input-busca" placeholder=" Buscar prato pelo nome...">
      </div>

      <button id="btnNovoPrato" class="btn-novo-prato" data-bs-toggle="modal" data-bs-target="#abrirModalCadastro" onclick="document.getElementById('formCardapio').reset(); document.getElementById('preview').innerHTML = ''; document.querySelector('input[name=id]').value = '';">

        <span>+ Cadastrar novo prato</span>
      </button>

      <!-- Modal QR_CODE -->
      <!-- Botão -->
      <button class="btn-abrirModalQR" onclick="abrirModalQR()">Gerar QR-Code</button>

      <!-- MODAL -->
      <!-- MODAL QR PERSONALIZADO -->
      <div class="modal fade" id="modalQR" tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content glass-effect">

            <div class="modal-header">
              <h5 class="modal-title">Gerar QR-Code Personalizado</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

              <div class="row">

                <!-- 🟦 LADO ESQUERDO — Configurações -->
                <div class="col-md-12">
                  <h5>Personalização</h5>

                  <div class="d-flex justify-content-start align-items-center flex-wrap gap-3 mt-3">
                    <div>
                      <div class="d-flex align-items-center gap-2">
                        <label class="form-label mt-2">Cor dos Pontos</label>
                        <input type="color" id="dotsColor" class="form-control form-control-sm" value="#000000">
                      </div>
                      <div class="d-flex align-items-center gap-2 ">
                        <label class="form-label mt-2">Tipo dos Pontos</label>
                        <select id="dotsType" class="form-select form-select-sm">
                          <option value="square">Quadrado</option>
                          <option value="dots">Redondo</option>
                          <option value="classy">Elegante</option>
                          <option value="classy-rounded">Elegante Arredondado</option>
                          <option value="rounded">Arredondado</option>
                          <option value="extra-rounded">Extra Arredondado</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div class="d-flex align-items-center gap-2 ">
                        <label class="form-label mt-2">Cor dos Cantos</label>
                        <input type="color" id="cornersColor" class="form-control form-control-sm" value="#000000">
                      </div>
                      <div class="d-flex align-items-center gap-2 ">
                        <label class="form-label mt-2">Tipo dos Cantos</label>
                        <select id="cornersType" class="form-select form-select-sm">
                          <option value="square">Quadrado</option>
                          <option value="dot">Redondo</option>
                          <option value="extra-rounded">Extra Arredondado</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div class="d-flex align-items-center gap-2 ">
                        <label class="form-label mt-2">Tamanho</label>
                        <select id="qrSize" class="form-select form-select-sm">
                          <option value="250">250 px</option>
                          <option value="300" selected>300 px</option>
                          <option value="350">350 px</option>
                          <option value="400">400 px</option>
                        </select>
                      </div>
                      <div class="d-flex align-items-center gap-2 ">
                        <label class="form-label mt-2">Logo</label>
                        <input type="file" id="logoInput" accept="image/*" class="input-file">
                        <label class="btn-file-custom" for="logoInput">
                          <ion-icon name="image-outline"></ion-icon> Selecionar logo
                        </label>
                      </div>
                    </div>

                  </div>
                  <img id="previewLogo" style="max-width: 90px; margin-top: 10px; display:none;">

                  <button class="btn  mt-3 w-100" onclick="gerarQRCode()">
                    Criar QR-Code
                  </button>
                </div>
              </div>

              <!-- 🟧 LADO DIREITO — Preview -->
              <div class="row">
                <div class="col-md-12 d-flex flex-column align-items-center">
                  <div id="qrPreview" class="p-4"></div>
                  <a id="downloadQR" download="qrcode.png" class="btn  mt-3 d-none">
                    Baixar QR-Code
                  </a>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
      <!-- FIM MODAL QR PERSONALIZADO -->





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
                  <label>Imagem do prato (jpeg, png, jpg)</label>
                  <input type="file" name="imagem" accept="image/*" id="imgInput" required>
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


  <!-- LIB PARA GERAR QR-CODE COM LOGO -->
  <script src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0/lib/qr-code-styling.js"></script>

  <script src="../assets/js/admin/admin.js"></script>


</body>

</html>