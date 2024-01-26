var inicioGod = document.getElementById('container')
var produtos = document.getElementById('produtos')

var kratos = document.getElementById('kratos')
var spider = document.getElementById('spider')

var btnInicio = document.getElementById('btnInicio')
var btnProduto = document.getElementById('btnProduto')

var card = document.querySelector('.carShop')
var car = document.querySelector('.comprados')

btnInicio.addEventListener('click', ()=>{
    inicioGod.classList.add('ativo')
    produtos.classList.remove('ativo')
    kratos.classList.add('ativo')
    spider.classList.remove('ativo')
})

btnProduto.addEventListener('click', () => {
    inicioGod.classList.remove('ativo')
    produtos.classList.add('ativo')
    spider.classList.add('ativo')
    kratos.classList.remove('ativo')
})

card.addEventListener('click', ()=>{
    car.classList.toggle('ativo')
})