import { products } from './produtos.js'

function displayItems() {
    const gamesProdutos = document.getElementById('produtos')
    const gamesItems = products.filter((item) => item.category == 'game');

    gamesItems.map(item => {

        var itemCard = document.createElement('div');

        itemCard.setAttribute('id', 'item-card')

        var img = document.createElement('img');
        img.src = item.image;

        var cardTop = document.createElement('div');
        cardTop.setAttribute('id', 'card-top');

        var heart = document.createElement('button');
        heart.setAttribute('class', 'add-to-cart');
        heart.setAttribute('id', item.id)
        heart.innerText = 'Adicionar'

        cardTop.appendChild(heart);

        var itemName = document.createElement('p');
        itemName.setAttribute('id', 'item-name');
        itemName.innerText = item.nome;

        var itemPrice = document.createElement('p');
        itemPrice.setAttribute('id', 'item-price');
        itemPrice.innerText = item.price + ',00 R$';
        

        itemCard.appendChild(cardTop);
        itemCard.appendChild(img);
        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);
        

        gamesProdutos.appendChild(itemCard);

    })
    
}

displayItems()

document.querySelectorAll('.add-to-cart').forEach(item => {
    item.addEventListener('click', addToCart)
})

var cartData = [];

function addToCart() {

    var itemToAdd = this.parentNode.nextSibling.nextSibling.innerText;
    var itemObj = products.find(element => element.nome == itemToAdd);

    var index = cartData.indexOf(itemObj);
    if (index === -1) {
        document.getElementById(itemObj.id).classList.add('ativo');
        document.getElementById(itemObj.id).innerText = 'Adicionado';
        cartData = [...cartData, itemObj];
    }
    else if (index > -1) {
        alert("Já está adicionado ao carrinho!");
    }

    var sum = 0;
    cartData.map(item => {
        sum += item.price;
    })
    document.getElementById('total-item').innerText = 'Total Item: ' + cartData.length;

    document.getElementById('cart-plus').innerText = ' ' + cartData.length;
    document.getElementById('total-price').innerText = 'Preço Total: ' + sum + ',00 R$';

    cartItems();
}

function cartItems() {
    const carrin = document.querySelector('.comprados')
    var tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    cartData.map(item => {
        var tableRow = document.createElement('div');
        tableRow.setAttribute('class', 'lista')

        var rowData1 = document.createElement('div');
        var img = document.createElement('img');
        img.src = item.image;
        rowData1.appendChild(img);

        var rowData2 = document.createElement('div');
        rowData2.setAttribute('class', 'listaNome')
        rowData2.innerText = item.nome;

        var rowData3 = document.createElement('div');
        rowData3.setAttribute('class', 'btns')
        var btn1 = document.createElement('button');
        btn1.setAttribute('class', 'decrease-item');
        btn1.innerText = '-';
        var span = document.createElement('span');
        span.innerText = item.quantity;
        var btn2 = document.createElement('button');
        btn2.setAttribute('class', 'increase-item');
        btn2.innerText = '+';

        rowData3.appendChild(btn1);
        rowData3.appendChild(span);
        rowData3.appendChild(btn2);

        var rowData4 = document.createElement('div');
        rowData4.setAttribute('class', 'precoItem')
        rowData4.innerText = item.price + ',00 R$';

        tableRow.appendChild(rowData1);
        tableRow.appendChild(rowData2);
        tableRow.appendChild(rowData3);
        tableRow.appendChild(rowData4);

        tableBody.appendChild(tableRow);
    })
    document.querySelectorAll('.increase-item').forEach(item => {
        item.addEventListener('click', incrementItem)
    })

    document.querySelectorAll('.decrease-item').forEach(item => {
        item.addEventListener('click', decrementItem)
    })

    if (cartData.length == 0) {
        carrin.classList.remove('ativo')
    }
}

function incrementItem() {
    let itemToInc = this.parentNode.previousSibling.innerText;
    var incObj = cartData.find(element => element.nome == itemToInc);
    incObj.quantity += 1;

    currPrice = (incObj.price * incObj.quantity - incObj.price * (incObj.quantity - 1)) / (incObj.quantity - 1);
    incObj.price = currPrice * incObj.quantity;
    totalAmount()
    cartItems();
}

var currPrice = 0;
function decrementItem() {
    let itemToInc = this.parentNode.previousSibling.innerText;
    let decObj = cartData.find(element => element.nome == itemToInc);
    let ind = cartData.indexOf(decObj);
    if (decObj.quantity > 1) {
        currPrice = (decObj.price * decObj.quantity - decObj.price * (decObj.quantity - 1)) / (decObj.quantity);
        decObj.quantity -= 1;
        decObj.price = currPrice * decObj.quantity;
    }
    else {
        document.getElementById(decObj.id).classList.remove('ativo')
        document.getElementById(decObj.id).innerText = 'Adicionar'
        cartData.splice(ind, 1);
        document.getElementById('cart-plus').innerText = ' ' + cartData.length;
    }
    totalAmount()
    cartItems()
}

function totalAmount() {
    var sum = 0;
    var quantidade = 0

    cartData.map(item => {
        sum += item.price;
        quantidade += item.quantity

    })

    document.getElementById('total-item').innerText = 'Total Item: ' + quantidade;
    document.getElementById('total-price').innerText = 'Preço Total: ' + sum + ',00 R$';

}
