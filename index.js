function Onclick() {
    let fname = document.getElementById('firstname').value;
    let lname = document.getElementById('lastname').value;
    let email = document.getElementById('emailid').value;
    let designation = document.getElementById('Designation').value;
    let age = document.getElementById('age').value;
    let isActive = true;
    let employeeId = new Date;
    let createdAt = new Date;
    let updatedAt = new Date;
    let gender = "";
    let mobilenumber = document.getElementById('mob_number').value;

    if (document.getElementById("M").checked) {
        gender = document.getElementById("M").value;
    }
    if (document.getElementById("F").checked) {
        gender = document.getElementById("F").value;
    }
    if (document.getElementById("O").checked) {
        gender = document.getElementById("O").value;
    }
    let newEmployee = { firstname: fname, lastname: lname, emailid: email, Gender: gender, Designation: designation, Age: age, Active: isActive, employeeId: employeeId, createdAt: createdAt, updatedAt: updatedAt, mob_number: mobilenumber }
    console.log(newEmployee);
    let v = validate();
    if (v === true) {
        resetForm();
        if (localStorage.getItem("Employees") == null) {
            employeedetails = []
            employeedetails.unshift(newEmployee)
            localStorage.setItem("Employees", JSON.stringify(employeedetails))
            displayData();
        } else {
            existingemployee = JSON.parse(localStorage.getItem("Employees"))
            existingemployee.unshift(newEmployee)
            console.log(existingemployee);
            localStorage.setItem("Employees", JSON.stringify(existingemployee))
            displayData();
        }
    }
}

function displayData() {
    // console.log("DATA");
    if (localStorage.getItem("Employees") == null) {
        employeedetails = []
        localStorage.setItem("Employees", JSON.stringify(employeedetails))
    } else {

        employeeData = JSON.parse(localStorage.getItem("Employees"))
        str = "";
        tableData = document.getElementById('tableData')

        for (let index = 0; index < employeeData.length; index++) {
            if (employeeData[index].Active == true) {
                str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td class="text-capitalize">${employeeData[index].firstname} ${employeeData[index].lastname}</td>
                <td>${employeeData[index].emailid}</td>
                <td class="text-capitalize">${employeeData[index].Gender}</td>
                <td class="text-capitalize">${employeeData[index].Designation}</td>
                <td>${employeeData[index].Age}</td>
                <td>${employeeData[index].mob_number}</td>
                <td>
                <button onclick="deleteEmp(${index})" class="btn btn-sm btn-danger">Inactive</button>
                <button onclick="patchData(${index})" class="btn btn-sm btn-success">Update</button>
                </td>
            </tr>
            `
            } else {
                str += `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td class="text-capitalize"><del>${employeeData[index].firstname} ${employeeData[index].lastname}</del></td>
                    <td><del>${employeeData[index].emailid}</del></td>
                    <td class="text-capitalize"><del>${employeeData[index].Gender}</del></td>
                    <td class="text-capitalize"><del>${employeeData[index].Designation}</del></td>
                    <td><del>${employeeData[index].Age}</del></td>
                    <td><del>${employeeData[index].mob_number}</del></td>
                    <td>
                    <button onclick="deleteEmp(${index})" class="btn btn-sm btn-danger">Active</button>
                    
                    </td>
                </tr>
                `
            }

        }
        tableData.innerHTML = str;

    }
}

displayData();

function deleteEmp(index) {
    let existing = JSON.parse(localStorage.getItem("Employees"))
    console.log(existing[index]);
    existing[index].Active = !existing[index].Active
    console.log(existing[index].Active);
    localStorage.setItem("Employees", JSON.stringify(existing))
    displayData();
}

function patchData(index) {
    let existing = JSON.parse(localStorage.getItem("Employees"))
    firstname = existing[index].firstname
    lastname = existing[index].lastname
    emailid = existing[index].emailid
    Gender = existing[index].Gender
    Designation = existing[index].Designation
    Age = existing[index].Age
    mob_number = existing[index].mob_number
    Active = existing[index].Active

    document.getElementById('firstname').value = firstname
    document.getElementById('lastname').value = lastname
    document.getElementById('emailid').value = emailid
    document.getElementById('Designation').value = Designation
    document.getElementById('age').value = Age
    document.getElementById('mob_number').value = mob_number

    if (Gender == 'Male') {
        document.getElementById("M").checked = true
    }
    if (Gender == 'Female') {
        document.getElementById("F").checked = true
    }
    if (Gender == 'Other') {
        document.getElementById("O").checked = true
    }

    document.getElementById("buttons").innerHTML = `
    <button type="submit" class="btn btn-sm btn-warning"onclick="updatedata(${index})">Update</button>
    <button type="reset" onclick="location.reload()" class="btn btn-sm btn-danger">Cancel</button>
    `
}
function updatedata(index) {
    let v = validateonupdate();
    if (v == true) {
        let existing = JSON.parse(localStorage.getItem("Employees"))
        // let existingdetails = existing[index]
        let fname = document.getElementById('firstname').value
        let lname = document.getElementById('lastname').value
        let email = document.getElementById('emailid').value
        let designation = document.getElementById('Designation').value
        let age = document.getElementById('age').value
        let mobilenumber = document.getElementById('mob_number').value
        let isActive = existing[index].Active;
        let employeeId = existing[index].employeeId
        let createdAt = existing[index].createdAt
        let updatedAt = new Date;

        if (document.getElementById("M").checked) {
            gender = document.getElementById("M").value
        }
        if (document.getElementById("F").checked) {
            gender = document.getElementById("F").value
        }
        if (document.getElementById("O").checked) {
            gender = document.getElementById("O").value
        }

        let updateddetails = { firstname: fname, lastname: lname, emailid: email, Gender: gender, Designation: designation, Age: age, Active: isActive, employeeId: employeeId, createdAt: createdAt, updatedAt: updatedAt, mob_number: mobilenumber }
        if (isActive == true) {
            existing[index] = updateddetails;
            localStorage.setItem("Employees", JSON.stringify(existing))
            resetForm();
            document.getElementById("buttons").innerHTML = `
    <button type="button" class="btn btn-sm btn-success " onclick="Onclick()">Submit</button>
    <button type="reset" onclick="resetForm()" class="btn btn-sm btn-danger">Reset</button>

        `
        }
        else {
            alert("Cannot Update!! Employee Is Inactive.")
        }
        
    }
    

    
    displayData();

}
function search() {
    let filter = document.getElementById('searchbar').value.toUpperCase();
    let table = document.getElementById('table')
    let tr = table.getElementsByTagName('tr')

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0]

        if (td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "None"
            }
        }
    }

}
function validate() {
    let existing = JSON.parse(localStorage.getItem("Employees"))

    let fName = document.getElementById('firstname').value
    let lName = document.getElementById('lastname').value
    let age = document.getElementById('age').value
    let email = document.getElementById('emailid').value
    let designation = document.getElementById('Designation').value
    let mobilenumber = document.getElementById('mob_number').value
    let regName = /^[a-zA-Z ]{2,20}$/;
    let regAge = /^[0-9]*$/
    let regMobileNumber = /^([+]\d{2})?\d{10}$/
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regName.test(fName)) {
        alert('Invalid First Name');
        return false;
    }
    if (!regName.test(lName)) {
        alert('Invalid Last Name');
        return false;
    }
    if (!regAge.test(age)) {
        alert('Invalid Age');
        return false;
    }
    if (age.length <= 0) {
        alert('Age is Required')
        age.focus
        console.log('false');
        return false;
    }
    if (age < 20 || age > 80) {
        alert('Age invalid')
        age.focus
        console.log('false');
        return false;
    }
    if (!regEmail.test(email)) {
        alert('Invalid Email Address')
        email.focus
        console.log('false');
        return false
    }
    for (let i = 0; i < existing.length; i++) {
        if (email == existing[i].emailid) {
            alert('Email already exist')
            email.focus
            console.log('false');
            return false
        }
    }
    if (!regMobileNumber.test(mobilenumber)) {
        alert('Invalid mobile number');
        return false;
    }
    if (designation.length <= 0) {
        alert('Designation is Required')
        designation.focus
        console.log('false');
        return false
    }
    if (document.getElementById("O").checked == false && document.getElementById("M").checked == false && document.getElementById("F").checked == false) {
        alert('Please select gender')
    }
    else {
        return true
    }
}
function AddDepartment() {
    reg = /^([a-zA-Z ]){2,15}$/
    let newdepartment = prompt("Enter new department name");
    if (!reg.test(newdepartment)) {
        alert("Invalid Designation");

    }
    else {
        let html = `
        <option disabled hidden selected value="">Select Designation</option>
        <option value="Trainee">Trainee</option>
        <option value="Software Developer">Software Developer</option>
        <option value="Quality Analyst">QA</option>
        <option value="DevOps">DevOps</option>
        <option value="Scrum Master">Scrum Master</option>
        <option value="Data Processor">Data Processor</option>
        <option selected value ="${newdepartment}"">${newdepartment}</option>
        `
        document.getElementById("Designation").innerHTML = html;
    }
}


function resetForm() {
    document.getElementById("Designation").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("emailid").value = "";
    document.getElementById("M").checked = false;
    document.getElementById("F").checked = false;
    document.getElementById("O").checked = false;
    document.getElementById("Designation").value = "";
    document.getElementById("mob_number").value = "";


}

function validateonupdate() {
    let existing = JSON.parse(localStorage.getItem("Employees"))

    let fName = document.getElementById('firstname').value
    let lName = document.getElementById('lastname').value
    let age = document.getElementById('age').value
    let email = document.getElementById('emailid').value
    let designation = document.getElementById('Designation').value
    let mobilenumber = document.getElementById('mob_number').value
    let regName = /^[a-zA-Z ]{2,20}$/;
    let regAge = /^[0-9]*$/
    let regMobileNumber = /^([+]\d{2})?\d{10}$/
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regName.test(fName)) {
        alert('Invalid First Name');
        return false;
    }
    if (!regName.test(lName)) {
        alert('Invalid Last Name');
        return false;
    }
    if (!regAge.test(age)) {
        alert('Invalid Age');
        return false;
    }
    if (age.length <= 0) {
        alert('Age is Required')
        age.focus
        console.log('false');
        return false;
    }
    if (age < 20 || age > 80) {
        alert('Age invalid')
        age.focus
        console.log('false');
        return false;
    }
    if (!regEmail.test(email)) {
        alert('Invalid Email Address')
        email.focus
        console.log('false');
        return false
    }
    if (!regMobileNumber.test(mobilenumber)) {
        alert('Invalid mobile number');
        return false;
    }
    if (designation.length <= 0) {
        alert('Designation is Required')
        designation.focus
        console.log('false');
        return false
    }
    if (document.getElementById("O").checked == false && document.getElementById("M").checked == false && document.getElementById("F").checked == false) {
        alert('Please select gender')
    }
    else {
        return true
    }
}

function clearLocal() {
    if (confirm("Do you really want to clear?")) {
        localStorage.clear();
        displayData();
        location.reload();
    }
}