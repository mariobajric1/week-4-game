$(document).ready(function() {
  var numb = 0;
  var randNum = randNumGen();
  var wins = 0;
  var losses = 0;
  var coins;

  function randNumCoins() {
    return {
      bitcoin: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/bitcoin.jpg"
      },
      ethereum: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/ethereum.jpg"
      },
      litecoin: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/litecoin.jpg"
      },
      ripple: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/ripple.jpg"
      }
    };
  }

  function randNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  function start() {
    numb = 0;
    coins = randNumCoins();
    randNum = randNumGen();
    $("#section").text(randNum);
  }

  function update(win) {
    $("#win").empty();

    if (win === true) {
      $("#win").append($("<h1>").text("You won! Crypto Billionaire"));
      start();
      renderMatchingNumber();
    } else if (win === false) {
      $("#win").append($("<h1>").text("You lost! Cryptos are a hoax!!"));
      start();
      renderMatchingNumber();
    }

    var winTag = $("<h1>").text(wins);
    var loseTag = $("<h1>").text(losses);

    var numbOfWins = $("<h4>").text("Wins: ");
    var numbOfLosses = $("<h4>").text("Losses: ");

    numbOfWins.append(winTag);
    numbOfLosses.append(loseTag);

    $("#win").append(numbOfWins);
    $("#win").append(numbOfLosses);
  }

  function makeCoins() {
    for (var key in coins) {
      var coinTag = $("<button class='coins-button' data-name='" + key + "'>");
      var coinImg = $("<img alt='image' class='coinpic'>").attr(
        "src",
        coins[key].imageUrl
      );
      coinTag.append(coinImg);
      $("#coins").append(coinTag);
    }
  }

  function updateNumb(cryptoVal) {
    numb += coins[cryptoVal.attr("data-name")].points;
  }

  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score'>").text(numb);
    $("#scorediv").html();
    $("#scorediv").html(scoreNumDiv);
  }

  start();
  update();
  makeCoins();
  renderMatchingNumber();

  $(".coins-button").on("click", function(event) {
    updateNumb($(this));
    renderMatchingNumber();

    if (numb === randNum) {
      wins++;
      start();
      update(true);
    } else if (numb > randNum) {
      losses++;
      start();
      update(false);
    }
  });
});
