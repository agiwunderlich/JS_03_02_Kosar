// elemek összegyűjtése

let inputItemName = document.getElementById('itemName');
let inputItemCount = document.getElementById('itemCount');
let inputItemBasePrice = document.getElementById('itemBasePrice');

let buttonAdd = document.getElementById('AddButton');

let listItemList = document.getElementById('itemList');

let spanSum = document.getElementById('sum');

// változók

let itemNames = ['rizstej', 'málna', 'műzli'];
let itemCounts = [2, 10, 3];
let itemBasePrices = [500, 50, 1200];

// feliratkozás

inputItemName.addEventListener('keyup', OnInputKeyup);
inputItemCount.addEventListener('keyup', OnInputKeyup);
inputItemBasePrice.addEventListener('keyup', OnInputKeyup);

buttonAdd.addEventListener('click', OnButtonAddClick);

// init

RenderList();

// renderelés

function RenderList() {

    ResetList();

    // array.map(function(currentValue, index){});

    let mappedList = itemNames.map(function (itemName, index) {

        let itemString = [
            // terméknév
            itemName,
            // darabszám * egységár
            itemCounts[index] + ' db x ' + itemBasePrices[index] + ' Ft',
            // teljes ár
            itemCounts[index] * itemBasePrices[index] + ' Ft'

        ].join(' - ');
        return itemString;

    });


    mappedList.forEach(function (itemText) {
        RenderListItem(itemText);
    });

    spanSum.innerText = GetSum();

}

function ResetList() {

    listItemList.innerText = '';
}

function RenderListItem(text) {
    let newItem = document.createElement('li');
    newItem.innerText = text;
    listItemList.appendChild(newItem);
};

function OnInputKeyup() {
    if (event.key == 'Enter') {
        AddNewItem();
    }
}

function OnButtonAddClick() {
    //hozzáadás
    AddNewItem();
}

function AddNewItem() {

    // validálás
    if (!(inputItemName.value && inputItemCount.value && inputItemBasePrice.value)) {
        return;
    }


    // hozzáadás

    itemNames.push(inputItemName.value);
    itemCounts.push(+inputItemCount.value);
    itemBasePrices.push(+inputItemBasePrice.value);

    // takarítás

    inputItemName.value = '';
    inputItemCount.value = '';
    inputItemBasePrice.value = '';

    RenderList();
}

// szummázás

function GetSum() {

    return itemCounts.reduce(function (acc, itemCount, index) {

        if(index == 1){
            acc = acc * itemBasePrices[0];
        }

        return acc + itemCount * itemBasePrices[index];
    });
}