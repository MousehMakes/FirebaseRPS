var name1Div = $("<div>");
var name2Div = $("<div>");
var chatMessages = $("<div>");
var indivMessage = $("<div>");


var resultStatement = "";

//db state
var state;



var config = {
  apiKey: "AIzaSyDrEDTdZKAaDeiv4Xtdna9mSJR9ZjLBE5o",
  authDomain: "rock-paper-scissors-onli-679e9.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-onli-679e9.firebaseio.com",
  projectId: "rock-paper-scissors-onli-679e9",
  storageBucket: "rock-paper-scissors-onli-679e9.appspot.com",
  messagingSenderId: "345831867479"
};

firebase.initializeApp(config);

var db = firebase.database();


//Use this to repopulate the db
db.ref("player1").set({
  name: "",
  taken: false,
  wins: 0,
  losses: 0,
  guess: "",
  turn: true,
  ties: 0,
  numGames: 0,
  connectMessage: "",
  resultStatement: ""
});
db.ref("player2").set({
  name: "",
  taken: false,
  wins: 0,
  losses: 0,
  guess: "",
  turn: true,
  ties: 0,
  numGames: 0,
  connectMessage: "",
  resultStatement: ""
});





function beginGame() {
  db.ref().set({
    player1: {
      name: "",
      taken: false,
      wins: 0,
      losses: 0,
      guess: "",
      turn: true,
      ties: 0,
      numGames: 0,
      connectMessage: "",
      resultStatement: ""
    },
    player2: {
      name: "",
      taken: false,
      wins: 0,
      losses: 0,
      guess: "",
      turn: false,
      ties: 0,
      numGames: 0,
      connectMessage: "",
      resultStatement: ""

    }
  });
}





function updateDB(player, username) {
  if (player === "player1") {
    db.ref().update({
      player1: {
        name: username,
        taken: true,
        wins: state.player1.wins,
        losses: state.player1.losses,
        guess: state.player1.guess,
        turn: state.player1.turn,
        ties: state.player1.ties,
        numGames: state.player1.numGames,
        connectMessage: state.player1.connectMessage,
        resultStatement: state.player1.resultStatement
      }
    });
  }

  if (player === "player2") {
    db.ref().update({
      player2: {
        name: username,
        taken: true,
        wins: state.player2.wins,
        losses: state.player2.losses,
        guess: state.player2.guess,
        turn: state.player2.turn,
        ties: state.player2.ties,
        numGames: state.player2.numGames,
        connectMessage: state.player2.connectMessage,
        resultStatement: state.player2.resultStatement
      }
    });
  }

  //db.ref("player").remove();
}



function setUpScreens(play1wins, play2wins, tieGames) {
  //Sets up player1 screen
  $(".play1").html("");
  $(".play1").append("<div class='play'>" + "Rock" + "</div>")
    .append("<div class='play'>" + "Paper" + "</div>")
    .append("<div class='play'>" + "Scissors" + "</div>")
    .append("<div class='play'>" + "Lizard" + "</div>")
    .append("<div class='play'>" + "Spock" + "</div>");

  //Sets up player2 screen
  $(".play2").html("");
  $(".play2").append("<div class='play'>" + "Rock" + "</div>")
    .append("<div class='play'>" + "Paper" + "</div>")
    .append("<div class='play'>" + "Scissors" + "</div>")
    .append("<div class='play'>" + "Lizard" + "</div>")
    .append("<div class='play'>" + "Spock" + "</div>");

  $("#scoresID").html("");
  $("#scoresID").html("Player 1 has won " + state.player1.wins + " games, Player 2 has won " + state.player2.wins + " games, and there have been " + state.player1.ties + " tie game(s).");
}

function reset() {
  db.ref().set({
    player1: {
      name: "",
      taken: false,
      wins: 0,
      losses: 0,
      guess: "",
      turn: true,
      ties: 0,
      numGames: 0,
      connectMessage: "",
      resultStatement: ""
    },
    player2: {
      name: "",
      taken: false,
      wins: 0,
      losses: 0,
      guess: "",
      turn: false,
      ties: 0,
      numGames: 0,
      connectMessage: "",
      resultStatement: ""
    }
  });

  name1Div.html("");
  name2Div.html("");
  $(".play1Chosen").css("display", "block");
  $(".resetScreen").css("display", "none");
  setUpScreens(state.player1.wins, state.player2.wins, state.player1.ties);
}




function assignPlayers(username) {
  console.log("In AssignPlayers");
  player = $('#added').val();

  if (state.player1.name === "" && username !== "") {

    console.log("Player 1 Name Not Yet Assigned");
    updateDB("player1", username);
    //this controls the connectmsg
    $(".connectMsg").css("display", "block");
  } else if (state.player1.name !== "" && state.player2.name === "" && username !== "") {
    console.log("Player 2 Name Not Yet Assigned");
    //Update info stored in the Database
    updateDB("player2", username);
    $(".connectMsg").css("display", "none");
  }
  $('#added').val("");
}




db.ref().on('value', function (snapshot) {
  if (!state) {
    state = snapshot.val();
    rivets.bind($("#rivetsContainer"), state);

    setUpScreens(state.player1.wins, state.player2.wins, state.player1.ties);

  } else {
    Object.assign(state, snapshot.val());

    setUpScreens(state.player1.wins, state.player2.wins, state.player1.ties);

  }
  console.log(state)
});

$("#submit").click(function (event) {
  event.preventDefault();
  let text = $("#added").val().trim();
  if (text.length > 0) {
    assignPlayers(text);
  }
});


$(".play1").on("click", ".play", function () {
  if (state.player1.numGames < 3) {
    if (state.player1.taken && state.player2.taken && state.player1.turn) {
      db.ref().update({
        player1: {
          name: state.player1.name,
          taken: state.player1.taken,
          wins: state.player1.wins,
          losses: state.player1.losses,
          guess: $(this).text(),
          turn: false,
          ties: state.player1.ties,
          numGames: state.player1.numGames,
          connectMessage: state.player1.connectMessage,
          resultStatement: "Player 1 has made their move."
        },
        player2: {
          name: state.player2.name,
          taken: state.player2.taken,
          wins: state.player2.wins,
          losses: state.player2.losses,
          guess: state.player2.guess,
          turn: true,
          ties: state.player2.ties,
          numGames: state.player2.numGames,
          connectMessage: state.player2.connectMessage,
          resultStatement: state.player2.resultStatement
        }
      });
      console.log("Player 1 Guess: " + state.player1.guess);
    }
    else if (!(state.player1.taken && state.player2.taken)) {
      alert("2 Players have not registered yet. Please enter your name");
    } else if (state.player2.turn) {
      alert("Player 2 has not made a guess yet. Please wait for their guess.");
    }
  }
});



$(".play2").on("click", ".play", function () {
  console.log("Player 1 Name: " + state.player1.name);
  if (state.player2.numGames < 3) {
    if (state.player1.taken && state.player2.taken && state.player2.turn) {
      db.ref().update({
        player1: {
          name: state.player1.name,
          taken: state.player1.taken,
          wins: state.player1.wins,
          losses: state.player1.losses,
          guess: state.player1.guess,
          turn: state.player1.turn,
          ties: state.player1.ties,
          numGames: state.player1.numGames,
          connectMessage: state.player1.connectMessage,
          resultStatement: state.player1.resultStatement
        },
        player2: {
          name: state.player2.name,
          taken: state.player2.taken,
          wins: state.player2.wins,
          losses: state.player2.losses,
          guess: $(this).text(),
          turn: state.player2.turn,
          ties: state.player2.ties,
          numGames: state.player2.numGames,
          connectMessage: state.player2.connectMessage,
          resultStatement: state.player2.resultStatement
        }
      });
      console.log("Player 2 Guess: " + state.player2.guess);
      playGame(state.player1.guess, state.player2.guess);
    }
    else if (!(state.player1.taken && state.player2.taken)) {
      alert("2 Players have not registered yet. Please enter your name");
    } else if (state.player1.turn) {
      alert("Player 1 has not made a guess yet. Please wait for their guess.");
    }
  }
});

$('.reset-button').click(function (event) {
  reset();
});

function playGame(move1, move2) {
  if (move1 === "Rock") {

    if (move2 === "Rock") {
      tieGame("Tie Game!");
    }

    if (move2 === "Paper") {
      p2Win("Paper covers rock, Player 2 wins.");
    }

    if (move2 === "Scissors") {
      p1Win("Rock crushes scissors, Player 1 wins.");
    }

    if (move2 === "Lizard") {
      p1Win("Rock crushes lizard, Player 1 wins.");
    }

    if (move2 === "Spock") {
      p2Win("Spock vaporizes rock, Player 2 wins.");
    }

  }

  if (move1 === "Paper") {
    if (move2 === "Rock") {
      p1Win("Paper covers rock, Player 1 wins.");
    }

    if (move2 === "Paper") {
      tieGame("Tie Game!");
    }

    if (move2 === "Scissors") {
      p2Win("Scissors cut paper, Player 2 wins.");
    }

    if (move2 === "Lizard") {
      p2Win("Lizard eats paper, Player 2 wins.");
    }

    if (move2 === "Spock") {
      p1Win("Paper disproves Spock, Player 1 wins.");
    }
  }

  if (move1 === "Scissors") {
    if (move2 === "Rock") {
      p2Win("Rock crushes scissors, Player 2 wins.");
    }

    if (move2 === "Paper") {
      p1Win("Scissors cuts paper, Player 1 wins.");
    }

    if (move2 === "Scissors") {
      tieGame("Tie Game!");
    }

    if (move2 === "Lizard") {
      p1Win("Scissors decapitates lizard, Player 1 wins.");
    }

    if (move2 === "Spock") {
      p2Win("Spock smashes scissors, Player 2 wins.");
    }
  }

  if (move1 === "Lizard") {
    if (move2 === "Rock") {
      p2Win("Rock crushes lizard, Player 2 wins.");
    }

    if (move2 === "Paper") {
      p1Win("Lizard eats paper, Player 1 wins.");
    }

    if (move2 === "Scissors") {
      p2Win("Scissors decapitates lizard, Player 2 wins.");
    }

    if (move2 === "Lizard") {
      tieGame("Tie Game!");
    }

    if (move2 === "Spock") {
      p1Win("Lizard poisons Spock, Player 1 wins.");
    }
  }

  if (move1 === "Spock") {
    if (move2 === "Rock") {
      p1Win("Spock vaporizes rock, Player 1 wins.");
    }

    if (move2 === "Paper") {
      p2Win("Paper disproves Spock, Player 2 wins.");
    }

    if (move2 === "Scissors") {
      p1Win("Spock smashes scissors, Player 1 wins.");
    }

    if (move2 === "Lizard") {
      p2Win("Lizard poisons Spock, Player 2 wins.");
    }

    if (move2 === "Spock") {
      tieGame("Tie Game!");
    }
  }

  if (state.player1.turn) {
    db.ref().set({
      player1: {
        name: state.player1.name,
        taken: state.player1.taken,
        wins: state.player1.wins,
        losses: state.player1.losses,
        guess: state.player1.guess,
        turn: false,
        ties: state.player1.ties,
        numGames: state.player1.numGames,
        connectMessage: state.player1.connectMessage,
        resultStatement: state.player1.resultStatement
      },
      player2: {
        name: state.player2.name,
        taken: state.player2.taken,
        wins: state.player2.wins,
        losses: state.player2.losses,
        guess: state.player2.guess,
        turn: true,
        ties: state.player2.ties,
        numGames: state.player2.numGames,
        connectMessage: "",
        resultStatement: ""
      }
    });
  }
  else if (state.player2.turn) {
    db.ref().set({
      player1: {
        name: state.player1.name,
        taken: state.player1.taken,
        wins: state.player1.wins,
        losses: state.player1.losses,
        guess: state.player1.guess,
        turn: true,
        ties: state.player1.ties,
        numGames: state.player1.numGames,
        connectMessage: state.player1.connectMessage,
        resultStatement: state.player1.resultStatement
      },
      player2: {
        name: state.player2.name,
        taken: state.player2.taken,
        wins: state.player2.wins,
        losses: state.player2.losses,
        guess: state.player2.guess,
        turn: false,
        ties: state.player2.ties,
        numGames: state.player2.numGames,
        connectMessage: "",
        resultStatement: ""
      }
    });
  }


  $(".resultScreen").html(resultStatement);
  $(".resultScreen").css("display", "block");
  setTimeout(function () {
    $(".resultScreen").css("display", "none");
    if (state.player1.numGames > 2) {
      $(".resetScreen").css("display", "block");
    }
  }, 5000);

}


function tieGame(resStatement) {
  db.ref().set({
    player1: {
      name: state.player1.name,
      taken: state.player1.taken,
      wins: state.player1.wins,
      losses: state.player1.losses,
      guess: state.player1.guess,
      turn: state.player1.turn,
      ties: state.player1.ties++,
      numGames: state.player1.numGames++,
      connectMessage: state.player1.connectMessage,
      resultStatement: resStatement
    },
    player2: {
      name: state.player2.name,
      taken: state.player2.taken,
      wins: state.player2.wins,
      losses: state.player2.losses,
      guess: state.player2.guess,
      turn: state.player2.turn,
      ties: state.player2.ties++,
      numGames: state.player2.numGames++,
      connectMessage: "",
      resultStatement: resStatement
    }
  });
}

function p1Win(resStatement) {
  db.ref().set({
    player1: {
      name: state.player1.name,
      taken: state.player1.taken,
      wins: state.player1.wins++,
      losses: state.player1.losses,
      guess: state.player1.guess,
      turn: state.player1.turn,
      ties: state.player1.ties,
      numGames: state.player1.numGames++,
      connectMessage: state.player1.connectMessage,
      resultStatement: resStatement
    },
    player2: {
      name: state.player2.name,
      taken: state.player2.taken,
      wins: state.player2.wins,
      losses: state.player2.losses++,
      guess: state.player2.guess,
      turn: state.player2.turn,
      ties: state.player2.ties,
      numGames: state.player2.numGames++,
      connectMessage: "",
      resultStatement: ""
    }
  });
}

function p2Win(resStatement) {
  db.ref().set({
    player1: {
      name: state.player1.name,
      taken: state.player1.taken,
      wins: state.player1.wins,
      losses: state.player1.losses++,
      guess: state.player1.guess,
      turn: state.player1.turn,
      ties: state.player1.ties,
      numGames: state.player1.numGames++,
      connectMessage: state.player1.connectMessage,
      resultStatement: resStatement
    },
    player2: {
      name: state.player2.name,
      taken: state.player2.taken,
      wins: state.player2.wins++,
      losses: state.player2.losses,
      guess: state.player2.guess,
      turn: state.player2.turn,
      ties: state.player2.ties,
      numGames: state.player2.numGames++,
      connectMessage: "",
      resultStatement: ""
    }
  });
}


//CHAT STUFF DON'T TACKLE YET!
$("#submitmsg").click(function (event) {
  event.preventDefault();
  //push to database
  let text = $("#usermsg").val();
  console.log("Text: " + text)
  if (text.length > 0) {
    db.ref().child("chat").push({
      name: event.name,
      message: text,
      color: '#0099ff'
    });

  }
});

db.ref("chat").on("value", function (data) {
  $("#chatBox").empty();
  data.forEach(function (el, index) {
    let entry = el.val();
    //console.log("Entry: " + entry.name)
    $('#chatBox').append(entry.name + ": " + entry.message)
  });
});

function addMessage(player, message) {
  if (player1.turn === true) {
    indivMessage.html(message);
    indivMessage.css("color", "ff0000");
    $("#chatbox").append(indivMessage);
  } else if (player2.turn === true) {
    indivMessage.html(message);
    indivMessage.css("color", "3700ff");
    $("#chatbox").append(indivMessage);
  }
} 