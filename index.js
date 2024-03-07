//Current line
var CurrentId = undefined;

var inputValues = [];
const inputPrompts = [
  "What is your name?: ",
  "What is your bid?: $",
  `Are there any other bidders? Type 'yes or 'no'.
  `,
];

const logo = `
                         ___________
                         \         /
                          )_______(
                          |"""""""|_.-._,.---------.,_.-._
                          |       | | |               | | ''-.
                          |       |_| |_             _| |_..-'
                          |_______| '-'''---------'' '-'
                          )"""""""(
                         /_________\\
                       .-------------.
                      /_______________\\
`;
let bids = [];
let biddingShouldContinue = true;

//Click Run
$(document).ready(function () {
  $("#run-button").click(function () {
    $("#Content").empty();
    restart();
  });
});

function restart() {
  inputValues = [];
  NewLine(logo, false);
  NewLine("What is your name?: ", true);
}

let person = "";
//Enter button
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  if (x === 13 || x == 13) {
    var consoleLine = $("#" + CurrentId + " input").val();
    inputValues.push({ id: CurrentId, val: consoleLine.toLowerCase() });

    if ((inputValues.length + 2) % 3 == 0) {
      person = consoleLine;
      $(".console-carrot").remove();
      NewLine(inputPrompts[1], true);
    }

    if ((inputValues.length + 1) % 3 == 0) {
      let bid = { name: person, amount: Number(consoleLine) };
      bids.push(bid);
      $(".console-carrot").remove();
      NewLine(inputPrompts[2], true);
    }

    if (inputValues.length % 3 == 0) {
      if (consoleLine == "no") {
        biddingShouldContinue = false;
        NewLine(find_highest_bidder(bids), false);
        return;
      } else {
        $("#Content").empty();
        $(".console-carrot").remove();
        NewLine(inputPrompts[0], true);
      }
    }

    // $(".console-carrot").remove();
    // if (biddingShouldContinue) {
    //   NewLine(inputPrompts[inputValues.length - 1], true);
    // }
  }
});
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  var line = $("#" + CurrentId + " input");
  var length = line.val().length;
  if (x != 8) {
    line.attr("size", 1 + length);
  } else {
    line.attr("size", length * 0.95);
  }
  if (length === 0) {
    $("#" + CurrentId + " input").attr("size", "1");
  }
});
$(document).on("click", function (e) {
  $("#" + CurrentId + " input").focus();
});

//New line
function NewLine(text, isPrompt) {
  $(".console-carrot").remove();
  if (CurrentId !== undefined) {
    $("#" + CurrentId + " input").prop("disabled", true);
  }
  CurrentId = "consoleInput-" + GenerateId();

  if (isPrompt) {
    $("#Content").append(
      //One Line
      '<div id="' +
        CurrentId +
        '">' +
        text +
        '<input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>'
    );
    $("#" + CurrentId + " input").focus();
    $("#" + CurrentId + " input").attr("size", "1");
  } else {
    $("#Content").append('<div id="' + CurrentId + '">' + text + "</div>");
  }
  document.getElementById(CurrentId).scrollIntoView();
}

function find_highest_bidder(bidding_record) {
  let highest_bid = 0;
  let winner = "";
  for (bidder in bidding_record) {
    let bid_amount = bidding_record[bidder].amount;
    if (bid_amount > highest_bid) {
      highest_bid = bid_amount;
      winner = bidding_record[bidder].name;
    }
  }
  return `The winner is ${winner} with a bid of \$${highest_bid}`;
}

function GenerateId() {
  return Math.random().toString(16).slice(2);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
