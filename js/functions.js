window.addEventListener("load", function () {



    //////////////////////////////////////////////
    // PUBLIC VARIABLES
    ////////////////////////////////////////////

    let _activeCategory = null; //public variable to blue menu item selected
    let _currentListNumber = null; //current list number
    let _numberOfLists = null; //number of lists

    //get elements from index.html 
    let _flowerListElement = document.getElementById("flowerList"); //calalog
    let _categoryListElement = document.getElementById("categories"); //categories
    let _previousListElement = document.getElementById("previousList"); //previous List
    let _printListNumberElement = document.getElementById("printListNumber"); //print List Number (1-5)
    let _nextListElement = document.getElementById("nextList"); //next List
    let _catalogElement = document.getElementById("catalog"); //catalog section
    let _cardElement = document.getElementById("card"); //card 
    let _cardButtonElement = document.getElementById("card-button"); //card button
    let _cardIDElement = document.getElementById("card-id"); //flower id inside the card











    //////////////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////////////


    /**
     * category FUNCTION
     * 
     * @param {Json array} jsonData
     * 
     */
    function categoryFUNCTION(jsonData) {

        _categoryListElement.innerHTML = "";

        jsonData.forEach(row => {
            let aTag = document.createElement('a');

            aTag.innerHTML = row.category;
            if (_activeCategory === row.category) {
                aTag.className = 'list-group-item list-group-item-action pointer active';
            } else {
                aTag.className = 'list-group-item list-group-item-action pointer';
            }

            aTag.onclick = function () {
                _activeCategory = aTag.innerHTML;
                requestCatalogDataFUNCTION(aTag.innerHTML, null); //call function
                categoryFUNCTION(jsonData); //call function
            };
            _categoryListElement.appendChild(aTag);

        }); { //add Evrething a tag eelment that is show whole flowers without category
            let aTagEverything = document.createElement('a');
            aTagEverything.innerHTML = "Everything";
            if (_activeCategory === null) {
                aTagEverything.className = 'list-group-item list-group-item-action pointer active';
            } else {
                aTagEverything.className = 'list-group-item list-group-item-action pointer';
            }

            aTagEverything.onclick = function () {
                _activeCategory = null;
                requestCatalogDataFUNCTION(null, null); //call function
                categoryFUNCTION(jsonData); //call function
            }
            _categoryListElement.appendChild(aTagEverything);
        }
        _catalogElement.style.display = "block";
        _cardElement.style.display = "none";
    }



    /**
     * print List Number FUNCTION
     * 
     * 
     */
    function printListNumberFUNCTION() {
        _printListNumberElement.innerHTML = _currentListNumber + " - " + _numberOfLists;
    }



    /**
     * previous List Number FUNCTION
     * 
     * 
     */
    function previousListFUNCTION() {
        if (_currentListNumber > 1) {
            _previousListElement.className = "col-3";
        } else {
            _previousListElement.className = "col-3 arrow-disabled";
        }

        _previousListElement.onclick = function () {
            requestCatalogDataFUNCTION(_activeCategory, _currentListNumber - 1); //call function //previous list
        }
    }



    /**
     * next List Number FUNCTION
     * 
     * 
     */
    function nextListFUNCTION() {
        if (_currentListNumber < _numberOfLists) {
            _nextListElement.className = "col-3";
        } else {
            _nextListElement.className = "col-3 arrow-disabled";
        }

        _nextListElement.onclick = function () {
            requestCatalogDataFUNCTION(_activeCategory, _currentListNumber + 1); //call function //next list
        }
    }



    /**
     * request Catalog Data FUNCTION
     * 
     * @param {int} category
     * @param {int} listNumber
     * 
     * AJAX fetch on flowers.php to get data from database
     */
    function requestCatalogDataFUNCTION(category, listNumber) {

        let fullBody = "";
        if (category !== null) {
            fullBody = 'category=' + category;
        }
        if (listNumber !== null) {
            fullBody += '&listNumber=' + listNumber;
        }
        let requestByList = new Request("ajax/flowers.php", {
            method: 'post',
            type: 'basic',
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: fullBody,
        });

        // flower.php do get data from table: SELECT
        fetch(requestByList)
            .then(response => response.json())
            //.then(dataReturned => CatalogFUNCTION(dataReturned))
            .then(function (flowersDataReturned) {
                _flowerListElement.innerHTML = ""; // clear the table 

                let printListNumberJson = flowersDataReturned.slice(-1) //get last row, saved list number information
                flowersDataReturned = flowersDataReturned.slice(0, flowersDataReturned.length - 1); //remove last row as it does't related to table data, its number of page information

                flowersDataReturned.forEach(row => {
                    let tr = document.createElement('tr');

                    // create td elements and add them to tr
                    let tdID = document.createElement('td');
                    tdID.innerHTML = row.id;
                    tr.appendChild(tdID);
                    let tdName = document.createElement('td');
                    tdName.innerHTML = row.name;
                    tr.appendChild(tdName);
                    let tdPrice = document.createElement('td');
                    tdPrice.innerHTML = row.price;
                    tr.appendChild(tdPrice);
                    let tdQuantity = document.createElement('td');
                    tdQuantity.innerHTML = (row.quantity === 0) ? "Out of Stock" : row.quantity;
                    tr.appendChild(tdQuantity);

                    tr.onclick = function () {
                        productCardFUNCTION(row.id); //call function
                    }
                    tr.className = "pointer";
                    _flowerListElement.appendChild(tr); //add row to the table
                });

                _currentListNumber = printListNumberJson[0].listNumber;
                _numberOfLists = printListNumberJson[0].numberOfLists;
            })
            .then(function () {
                printListNumberFUNCTION(); //call function
                nextListFUNCTION(); //call function
                previousListFUNCTION(); //call function
            })
            .catch(error => console.log(error));
    }



    /**
     * Request Cart Data FUNCTION
     * 
     * get cart data
     * 
     */
    function requestCartDataFUNCTION() {
        fetch("ajax/cart.php", {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(function (cartDataReruned) {
                console.log("cartDataReruned: ", cartDataReruned);

                cartSection = document.getElementById("cartList");
                cartSection.innerHTML = "";

                let price = 0; //calculate total
                cartDataReruned.forEach(element => {
                    price += element.price;
                    let nameItem = document.createElement('div');
                    nameItem.className = "col-7";
                    nameItem.innerHTML = element.name + " ID(" + element.flowerID + ")";
                    let priceItem = document.createElement('div');
                    priceItem.className = "col-3";
                    priceItem.innerHTML = element.price;
                    let removeItem = document.createElement('div');
                    removeItem.className = "col-1 pointer";
                    removeItem.innerHTML = "X";

                    removeItem.onclick = function () {
                        RemoveFromCartFUNCTION(element.cartID); //call function

                        // setTimeout(function () {
                        //     requestCatalogDataFUNCTION(_activeCategory, _currentListNumber); //call function (Catalog)
                        // }, 100);

                        // setTimeout(function () {
                        //     requestCartDataFUNCTION();  //call function (Cart)
                        // }, 100);

                        // if (_cardElement.style.display === "block") {          //just if the card is ON
                        //     setTimeout(function () {
                        //         productCardFUNCTION(_cardIDElement.innerHTML);    //call same function to update Card state (Out of Stock???)
                        //     }, 100);
                        // }
                    }
                    cartSection.appendChild(nameItem);
                    cartSection.appendChild(priceItem);
                    cartSection.appendChild(removeItem);
                });

                document.getElementById("total").innerHTML = price.toFixed(2);
            });
    }



    /**
     * Add to Cart FUNCTION
     * 
     * send order add item to cart
     * @param {int} id in flower table
     * 
     */
    function AddToCartFUNCTION(id) {
        //console.log("AddToCartFUNCTION");
        let request = new Request("ajax/addToCart.php", {
            method: 'post',
            type: 'basic',
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "flowerID=" + id,
        });
        fetch(request)
            .then(function () {
                requestCatalogDataFUNCTION(_activeCategory, _currentListNumber); //call function (Catalog)
                requestCartDataFUNCTION(); //call function (Cart)
                productCardFUNCTION(_cardIDElement.innerHTML); //call same function to update Card state (Out of Stock???) 
            });
    }


    /**
     * Remove from Cart FUNCTION
     * 
     * send order remove item to cart
     * @param {int} id in cart table
     * 
     */
    function RemoveFromCartFUNCTION(id) {
        //console.log("RemoveFromCartFUNCTION");
        let request = new Request("ajax/removeFromCart.php", {
            method: 'post',
            type: 'basic',
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "cartID=" + id,
        });
        fetch(request)
            .then(function () {
                requestCatalogDataFUNCTION(_activeCategory, _currentListNumber); //call function (Catalog)
                requestCartDataFUNCTION(); //call function (Cart)
                if (_cardElement.style.display === "block") { //just if the card is ON
                    productCardFUNCTION(_cardIDElement.innerHTML); //call same function to update Card state (Out of Stock???)
                }
            });
    }


    /**
     * Card
     * 
     * get single flower record and print it in card
     * @param {int} id determin flower record
     * 
     */
    function productCardFUNCTION(flowerID) {

        let request = new Request("ajax/card.php", {
            method: 'post',
            type: 'basic',
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "id=" + flowerID,
        });
        fetch(request)
            .then(response => response.json())
            .then(function (flowerRecordReturned) {
                _catalogElement.style.display = "none";
                _cardElement.style.display = "block";

                document.getElementById("card-image").src = "img/noImage.png";
                document.getElementById("card-image").alt = "noImage";

                document.getElementById("card-name").innerHTML = flowerRecordReturned.name;
                document.getElementById("card-price").innerHTML = flowerRecordReturned.price;
                _cardIDElement.innerHTML = flowerRecordReturned.id;
                document.getElementById("card-description").innerHTML = flowerRecordReturned.description;

                if (flowerRecordReturned.quantity > 0) {
                    //console.log("Add to Cart")
                    _cardButtonElement.value = "Add to Cart";
                    _cardButtonElement.disabled = false;

                    //I have used setTimeout as the synchronously impleminting code!,
                    // I'm doing some delay to wait database be updated then get its data
                    _cardButtonElement.onclick = function () {
                        AddToCartFUNCTION(flowerRecordReturned.id);


                        // setTimeout(function () {
                        //     requestCatalogDataFUNCTION(_activeCategory, _currentListNumber); //call function (Catalog)
                        // }, 100);

                        // setTimeout(function () {
                        //     requestCartDataFUNCTION();  //call function (Cart)
                        // }, 100);

                        // setTimeout(function () {
                        //     productCardFUNCTION(_cardIDElement.innerHTML);    //call same function to update Card state (Out of Stock???) 
                        // }, 100);
                    }
                } else {
                    //console.log("Out of Stock")
                    _cardButtonElement.value = "Out of Stock";
                    _cardButtonElement.disabled = true;
                }



            });
    }









    /////code/////////code/////////code/////////code/////////code/////////code/////////code//////







    requestCatalogDataFUNCTION(null, null); //call function (Catalog)

    // get categories from database throw categories.php
    fetch("ajax/categories.php", {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(categoryFUNCTION); //call function (category)


    // X exit button of card box
    document.getElementById("card-exit").onclick = function () {
        _catalogElement.style.display = "block";
        _cardElement.style.display = "none";
    }


    requestCartDataFUNCTION(); //call function (Cart)
});
