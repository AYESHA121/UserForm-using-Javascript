let DataTable = document.getElementById("datatable");
let updatebtn = document.getElementById("update");
let addbtn = document.getElementById("add");
let headers = ["First Name", "Last Name", "Phone Number", "Email", "Age"];

//editbtn1.onclick = "EditData(n)";

details = [];

let table = document.createElement("table");
let headerRow = document.createElement("tr");
headers.forEach((headerElement) => {
  let header = document.createElement("th");
  let headerText = document.createTextNode(headerElement);
  header.appendChild(headerText);
  headerRow.appendChild(header);
});
table.appendChild(headerRow);
DataTable.appendChild(table);

var fname = null;
var lname = null;
var number = null;
var email = null;
var age = null;
var editbtn1;
n = 1;
var selected = null;
var bool = false;
var firstvalid = false;

function validations() {
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  number = document.getElementById("PhoneNumber").value;
  email = document.getElementById("email").value;
  age = document.getElementById("age").value;

  if (fname == "" || lname == "" || number == "" || email == "" || age == "") {
    if (fname == "") {
      document.getElementById("firstspan").innerHTML = "First name is missing!";
    }

    if (lname == "") {
      document.getElementById("lastspan").innerHTML = "Last name is missing!";
    }

    if (number == "") {
      document.getElementById("numspan").innerHTML = "Contact is missing!";
    }

    if (email == "") {
      document.getElementById("emailspan").innerHTML = "Email is missing!";
    }
    if (age == "") {
      document.getElementById("agespan").innerHTML = "Age is missing!";
    }

    return false;
  } else {
    document.getElementById("firstspan").innerHTML = null;
    document.getElementById("lastspan").innerHTML = null;
    document.getElementById("numspan").innerHTML = null;
    document.getElementById("emailspan").innerHTML = null;
    document.getElementById("agespan").innerHTML = null;
    return true;
  }
}

function EntryValid() {
  validations();
  check1 = false;
  check2 = false;
  check3 = false;
  check4 = false;
  check5 = false;
  check6 = false;
  if (validations()) {
    if (fname.length > 30) {
      document.getElementById("firstspan").innerHTML =
        "fisrt name should be less than 20 characters";
      return false;
    } else {
      check1 = true;
    }
    if (lname.length > 20) {
      document.getElementById("lastspan").innerHTML =
        "Last name should be less than 20 characters !";
      return false;
    } else {
      check2 = true;
    }

    if (isNaN(number)) {
      document.getElementById("numspan").innerHTML = "Only numeric numbers!";
      return false;
    } else {
      check3 = true;
    }
    if (number.length > 20) {
      document.getElementById("numspan").innerHTML =
        "Contact should be less than 20 digits !";
      return false;
    } else {
      check4 = true;
    }

    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) == false) {
      document.getElementById("emailspan").innerHTML = "Invalid email address!";
      return false;
    } else {
      check5 = true;
    }
    if (age == "") {
      document.getElementById("agespan").innerHTML = "Age is missing!";
    } else {
      check6 = true;
    }
  }
  if (
    check1 == true &&
    check2 == true &&
    check3 == true &&
    check4 == true &&
    check5 == true &&
    check6 == true
  ) {
    bool = true;
    check1 = false;
    check2 = false;
    check3 = false;
    check4 = false;
    check5 = false;
    check6 = false;
  }
  return bool;
}

function CollectData() {
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  number = document.getElementById("PhoneNumber").value;
  email = document.getElementById("email").value;
  age = document.getElementById("age").value;
  EntryValid();

  if (bool == true) {
    detailobject = {
      fnamekey: fname,
      lnamekey: lname,
      numberkey: number,
      emailKey: email,
      ageKey: age,
    };
    details.push(detailobject);

    let row = document.createElement("tr");

    editbtn1 = document.createElement("button");
    editbtn1.innerText = "Edit";
    editbtn1.id = "editBtn";

    Object.values(detailobject).forEach((text) => {
      let cell = document.createElement("td");

      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);

      row.appendChild(cell);
      row.appendChild(editbtn1);
    });
    table.appendChild(row);
    editbtn1.addEventListener("click", () => {
      editbtn1Func(row);
    });

    document.getElementById("dataform").reset();
    bool = false;
  }

  // editbtn1.addEventListener('click', () => {
  //     n = row.rowIndex;
  //     selected = row.rowIndex;
  //     selectedObject = details[n - 1];

  //     document.getElementById("fname").value = selectedObject.fnamekey;
  //     document.getElementById("lname").value = selectedObject.lnamekey;
  //     document.getElementById("PhoneNumber").value = selectedObject.numberkey;
  //     document.getElementById("email").value = selectedObject.emailKey;
  //     document.getElementById("age").value = selectedObject.ageKey;
  //     updatebtn.style.display = "inline";
  //     addbtn.style.display = "none";

  // });
}

function editbtn1Func(selectedrow) {
  selected = selectedrow;
  bool = false;
  document.getElementById("fname").value = selected.cells[0].innerHTML;
  document.getElementById("lname").value = selected.cells[1].innerHTML;
  document.getElementById("PhoneNumber").value = selected.cells[2].innerHTML;
  document.getElementById("email").value = selected.cells[3].innerHTML;
  document.getElementById("age").value = selected.cells[4].innerHTML;

  updatebtn.style.display = "inline";

  updatebtn.addEventListener("click", () => {
    updatebtnfunc(selectedrow);
  });
  addbtn.style.display = "none";
}

function updatebtnfunc(selectedrow) {
  selected = selectedrow;

  EntryValid();
  if (bool == true) {
    selected.cells[0].innerHTML = document.getElementById("fname").value;
    selected.cells[1].innerHTML = document.getElementById("lname").value;
    selected.cells[2].innerHTML = document.getElementById("PhoneNumber").value;
    selected.cells[3].innerHTML = document.getElementById("email").value;
    selected.cells[4].innerHTML = document.getElementById("age").value;

    updatebtn.style.display = "none";

    addbtn.style.display = "inline";
    document.getElementById("dataform").reset();
    bool = false;
  }
}
