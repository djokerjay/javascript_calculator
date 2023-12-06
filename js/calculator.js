var isOperatorExist = false;
document.addEventListener("DOMContentLoaded", function () {
  GenerateUI();
});

function GenerateUI() {
  const container = document.getElementById("container");
  const table = document.createElement("table");
  let operator = "";
  let num1, num2;
  table.border = "1";
  const trDisplay = document.createElement("tr");
  const tdDisplay = document.createElement("td");
  tdDisplay.colSpan = "3";

  const spOperator = document.createElement("span");
  const txtDisplay = document.createElement("input");
  const tdOp = document.createElement("td");
  txtDisplay.id = "txtDisplay";
  txtDisplay.type = "text";
  txtDisplay.innerText = "0";
  txtDisplay.value = "0";
  //  txtDisplay.disabled = true;
  tdDisplay.appendChild(txtDisplay);
  trDisplay.appendChild(tdDisplay);

  tdOp.appendChild(spOperator);
  trDisplay.appendChild(tdOp);

  table.appendChild(trDisplay);
  const buttons = [
    "C",
    "",
    "",
    "&#247;",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];
  let colCnt = 0;
  let trButton = document.createElement("tr");
  for (let x = 0; x < buttons.length; x++) {
    if (colCnt < 4) {
      colCnt++;
    } else {
      table.appendChild(trButton);
      trButton = document.createElement("tr");
      colCnt = 1;
    }
    const tdButton = document.createElement("td");
    if (buttons[x].trim().length > 0) {
      const button = document.createElement("button");
      button.id = "btn_" + x;
      button.setAttribute("value", buttons[x]);
      button.innerHTML = buttons[x];
      const buttonHandler = function (event) {
        switch (event.target.getAttribute("value")) {
          case "C":
            txtDisplay.value = "0";
            num1 = "";
            num2 = "";
            op = "";
            isOperatorExist = false;
            spOperator.innerHTML = "";

            break;
          case ".":
            if (txtDisplay.value == "0") {
              txtDisplay.value = "0.";
            } else if (txtDisplay.value.indexOf(".") < 0) {
              txtDisplay.value += event.target.getAttribute("value");
            }
            break;
          case "&#247;":
            op = "/";
            spOperator.innerHTML = event.target.getAttribute("value");
            num1 = txtDisplay.value;
            isOperatorExist = true;
            console.log(op);
            break;
          case "x":
            op = "*";
            spOperator.innerHTML = op;

            num1 = txtDisplay.value;
            isOperatorExist = true;
            console.log(op);
            break;
          case "+":
          case "-":
            num1 = txtDisplay.value;
            spOperator.innerHTML = op;

            isOperatorExist = true;
            op = event.target.getAttribute("value");
            console.log(op);
            break;
          case "=":
            if (txtDisplay.value.length > 0) {
              num2 = txtDisplay.value;
              console.log("num1:" + num1);
              console.log("num2:" + num2);
              console.log("op:" + op);
              if (num1.length > 0 && num2.length > 0 && op.length > 0)
                txtDisplay.value = calculate(num1, num2, op);
            }
            break;
          case "+/-":
            if (txtDisplay.value.indexOf(".") > 0) {
              txtDisplay.value = -1 * parseFloat(txtDisplay.value);
            } else {
              txtDisplay.value = -1 * parseInt(txtDisplay.value);
            }
            break;
          default:
            console.log("isOperatorExist:" + isOperatorExist);
            if (txtDisplay.value == "0") {
              txtDisplay.value = event.target.getAttribute("value");
            } else {
              if (isOperatorExist) {
                txtDisplay.value = event.target.getAttribute("value");
              } else {
                txtDisplay.value += event.target.getAttribute("value");
              }
            }
            break;
        }
      }.bind(this);
      button.addEventListener("click", buttonHandler);
      tdButton.appendChild(button);
    }
    trButton.appendChild(tdButton);
  }
  table.appendChild(trButton);

  container.appendChild(table);
}

function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
      break;
    case "*":
      return num1 * num2;
      break;
    case "/":
      return num1 / num2;
      break;
    case "-":
      return num1 - num2;
      break;
  }
}
