import {dbank} from "../../declarations/dbank";

window.addEventListener("load", async function() {
  // console.log("finishing loading...");
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  console.log("submit has been clicked!");

  const button = event.target.querySelector("#submit-btn"); // get the submit btn

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true); // disable submit btn once clicked

  // the if statement will check if the user type something inside the box input and just if so will trigger the topUp and the withdrawl functions. without the if statement we will face an error and we will see a NaN instead. We will also mess up put icp backend(main.mo)
  if (document.getElementById("input-amount").value.length !=0){
    await dbank.topUp(inputAmount);
  };

  if (document.getElementById("withdrawal-amount").value.length !=0){
    await dbank.withdrawl(outputAmount);
  };

  await dbank.compound();
  
  update();
  
  // clear the input box once we submit the form
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled"); //Enable again the button once the balance is updated
});

async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById('value').innerHTML = Math.round((currentAmount + Number.EPSILON)*100) / 100;
  // rounded to 2 dec places
};