# Visualização de Cena 3D com Three.js
Projeto Parcial 2 realizado para a disciplina de Processamento Gráfico

## Preview
![image](https://github.com/vinciuscastro/PP2_pg/assets/79222545/d0f8d293-895a-4cce-a815-b4110e0f2056)

## Objetivo

O objetivo deste projeto é criar e visualizar uma cena 3D, mapeando os conceitos estudados. 
A implementação é realizada utilizando JavaScript e a biblioteca WebGL Three.js.

## Objetos

- Dado: Vinicius 
- Esferas: Marcelo
- Demais implementações foram feitas em conjunto

## Especificação de avaliação
- [x] Visualização de pelo menos um objeto 3D por membro do grupo, redimensionando e posicionando cada objeto individualmente no ambiente virtual;
- [x] Utilização de um shader próprio em um dos objetos (RawShaderMaterial);
- [x] Definição de pelo menos duas câmera;
- [x] Movimento simples de pelo menos um objeto;
- [x] Documentar no github (readme principal), contendo: as especificações atendidas do projeto, modo de interação e descrição das principais características implementadas.

## Requisitos

- Navegador Web
- Node.js

## Instruções

- Na pasta raiz do projeto execute o comando "node server.js" para implementar o servidor na porta 3000.
(Caso a porta 3000 ja esteja sendo utilizada por outro processo é necessário alterar o número da porta em server.js)
- Agora é só abrir o link "http://localhost:3000".

## Comandos

- Setas do teclado: movimento do cubo nos eixos x e y
- Tecla 1: diminui a velocidade de rotação do cubo;
- Tecla 2: aumenta a velocidade de rotação do cubo;
- Tecla 3: para a rotação do cubo totalmente;
- Tecla 0: troca para câmera dinâmica;
- Tecla 9: troca para câmera estática;
- Clique esquerdo do mouse: rotaciona a perspectiva;
- Clique direito no mouse: movimenta o objeto livremente nos eixos x e y;
- Scroll do Mouse: Zoom In e Zoom Out;
- Tecla X: acelera a rotação no primeiro eixo;
- Tecla y: acelera a rotação no segundo eixo;
- Tecla z: acelera a rotação no terceiro eixo;
