(function() {
    window.statusVanzare = true;
    var tmwait = null;
    var tminput = null;
    PremiumExchange.receiveData = function(e) {
        PremiumExchange.data = e,
            PremiumExchange.updateUI(),
            reciveDataStock(e);
    }
    reciveDataStock = function(e) {
        var difWood = e.capacity.wood - e.stock.wood - 10000;
        var difStone = e.capacity.stone - e.stock.stone - 10000;
        var difIron = e.capacity.iron - e.stock.iron - 10000;
        if (PremiumExchange.data.merchants < 1) {
            return false;
        }
        if (difWood > PremiumExchange.calculateRateForOnePoint("wood") && statusVanzare && game_data.village.wood > PremiumExchange.calculateRateForOnePoint("wood") + 1000) {
            if (game_data.village.wood > difWood) {
                vindeLemn(difWood);
            } else {
                vindeLemn(Math.floor(game_data.village.wood / 1000) * 1000);
            }
            if (parseInt($("input[name='sell_wood']").val()) > 0) {
                $("input[type='submit']").eq(0).click();
            }
            if (statusVanzare) {
                tmwait = setTimeout(vindeResursa, 50);
            }
            statusVanzare = false;
            console.log("Diferenta lemn = " + difWood);
        }
        if (difStone > PremiumExchange.calculateRateForOnePoint("stone") && statusVanzare && game_data.village.stone > PremiumExchange.calculateRateForOnePoint("stone") + 1000) {
            if (game_data.village.stone > difStone) {
                vindeArgila(difStone);
            } else {
                vindeArgila(Math.floor(game_data.village.stone / 1000) * 1000);
            }
            if (parseInt($("input[name='sell_stone']").val()) > 0) {
                $("input[type='submit']").eq(0).click();
            }
            if (statusVanzare) {
                tmwait = setTimeout(vindeResursa, 30);
            }
            statusVanzare = false;
            console.log("Diferenta argila = " + difStone);
        }
        if (difIron > PremiumExchange.calculateRateForOnePoint("iron") && statusVanzare && game_data.village.iron > PremiumExchange.calculateRateForOnePoint("iron") + 1000) {
            if (game_data.village.iron > difIron) {
                vindeFier(difIron);
            } else {
                vindeFier(Math.floor(game_data.village.iron / 1000) * 1000);
            }
            if (parseInt($("input[name='sell_iron']").val()) > 0) {
                $("input[type='submit']").eq(0).click();
            }
            if (statusVanzare) {
                tmwait = setTimeout(vindeResursa, 50);
            }
            statusVanzare = false;
            console.log("Diferenta fier = " + difIron);
        }
    }
    vindeResursa = function() {
        statusVanzare = true;
        //emptyTextBox();
        try {
            if ($("div#fader").css("display") == "block") {
                $("button.btn.evt-confirm-btn.btn-confirm-yes")[0].click();
            }
        } catch (ex) {
            console.log("Eroare =" + ex.toString());
        }
        PremiumExchange['updateUI']();
        reciveDataStock(PremiumExchange.data);
    }
    vindeLemn = function(val) {
        var lemncalculat = calculeazaValoareMaxima(val);
        if (lemncalculat > 0) {
            $("input[name='sell_wood']").val(lemncalculat);
        }
    }
    vindeArgila = function(val) {
        var argilacalculat = calculeazaValoareMaxima(val);
        if (argilacalculat > 0) {
            $("input[name='sell_stone']").val(argilacalculat);
        }
    }
    vindeFier = function(val) {
        var fiercaluclat = calculeazaValoareMaxima(val);
        if (fiercaluclat > 0) {
            $("input[name='sell_iron']").val(fiercaluclat);
        }
    }

    function emptyTextBox() {
        $("input[name='sell_wood']").val("");
        $("input[name='sell_stone']").val("");
        $("input[name='sell_iron']").val("");
    }
    calculeazaValoareMaxima = function(val) {
        var numarNegustori = parseInt($("span#market_merchant_available_count").text().trim());
        var maxRes = (numarNegustori - 1) * 1000;
        var valoareMax = 0;
        if (val < maxRes) {
            return Math.floor((val - 1000) / 1000) * 1000;
        } else {
            return Math.floor((maxRes - 1000) / 1000) * 1000;
        }
    }
    window.reciveDataStock(PremiumExchange.data);
    $("div#market_status_bar").after("<h2 style=\"color:red;\">SCRIPTUL RULEAZA IN BACKGROUND !!!</h2>");
})();
