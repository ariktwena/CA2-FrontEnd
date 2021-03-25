import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"
import $ from 'jquery';
//import "bootstrap/dist/css/bootstrap.css" //Lars siger den skal være her
import personFacade from "./personFacade";

//Hide error field med jQuery
$("#error").hide();
//document.getElementById("error").style.display = "none";

const getAllPersons = () => {
    //console.log("Her")
    personFacade.getAllPersons()
        .then(persons => {
            console.log(persons);

            const personRow = persons.map(person => `
            <tr>
            <td>${person.id}</td>
            <td>${person.email}</td>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.address.street}</td>
            <td>${person.address.cityInfo.zipCode}</td>
            <td>${person.address.cityInfo.city}</td>
            <td>${person.phones.map(phone => `<span>${phone.number}</span><br>`).join()}</td>
            <td>${person.hobbies.map(hobby => `<span>${hobby.name}</span><br>`).join()}</td>
            <td><button class="btn-primary small" title="edit" id="${person.id}" data-toggle="modal" data-target="#editMyModal">Edit</button></td>
            <td><button class="btn-danger small" title="delete"  id="${person.id}">Delete</button></td>
            </tr>
            `).join("");

            //console.log("test");
            //console.log(persons);
            //console.log(persons.all);
            //console.log(personRow);
            document.getElementById("tbody").innerHTML = personRow;
            //Reset error message
            document.getElementById("error").innerHTML = "";

        }).catch(err => {
        if (err.status) {
            err.fullError.then(e => {
                console.log(e.detail);
                console.log(e);
                //Print error message on website
                document.getElementById("error").innerHTML = "ERROR!!! Status code: " + e.status + ", message: " + e.msg;
                document.getElementById("error").style.display = "block";
            })
        } else {
            console.log("Network error");
            document.getElementById("error").innerHTML = "Network error";
            document.getElementById("error").style.display = "block";
        }
    });
};

//Get all persons when page is loaded
(function () {
    getAllPersons();
})();

//Reload Button
document.getElementById("reload").addEventListener('click', function () {
    getAllPersons();
});

document.getElementById("savebtn").addEventListener('click', function () {
    const email = document.getElementById("personEmail").value;
    const firstName = document.getElementById("personFirstName").value;
    const lastName = document.getElementById("personLastName").value;
    const street = document.getElementById("addressStreet").value;
    const zipCode = document.getElementById("addressZip").value;
    const city = document.getElementById("addressCity").value;
    const number = document.getElementById("personPhone").value;
    const name = document.getElementById("personHobby").value;

    const hobby = {
        "name": name,
        "description": ""
    }

    const hobbies = [
        hobby
    ]

    const phone = {
        "number": number
    }

    const phones = [
        phone
    ]

    const cityInfo = {
        "zipCode": zipCode,
        "city": city
    }

    const address = {
        "street": street,
        "additionalInfo": "",
        "cityInfo": cityInfo
    }

    const person = {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "phones": phones,
        "hobbies": hobbies
    }

    console.log(person);
    console.log(JSON.stringify(person));

    personFacade.addPerson(person)
        .then(persons => {
            // console.log("test");
            // console.log(persons);
            // console.log(persons.all);

            //Reload persons array
            getAllPersons();

        }).catch(err => {
        if (err.status) {
            err.fullError.then(e => {
                console.log(e.detail);
                console.log(e);
                //Print error message on website
                document.getElementById("error").innerHTML = "ERROR!!! Status code: " + e.status + ", message: " + e.msg;
                document.getElementById("error").style.display = "block";
            })
        } else {
            console.log("Network error");
            document.getElementById("error").innerHTML = "Network error";
            document.getElementById("error").style.display = "block";
        }
    });
});

// document.getElementById("tbody").addEventListener('click', function (event) {
//     console.log(event);
//     console.log(event.target);
//     console.log(event.target.id);
//     console.log(event.target.title);
//     const id = event.target.id;
//     const action = event.target.title;
//     if (action === "delete") {
//         personFacade.deletePerson(id)
//             .then(res => {
//                 //console.log("test");
//                 // console.log(res);
//
//                 //Reload person array
//                 getAllPersons();
//
//             }).catch(err => {
//             if (err.status) {
//                 err.fullError.then(e => {
//                     console.log(e.detail);
//                     console.log(e);
//                     //Print error message on website
//                     document.getElementById("error").innerHTML = "ERROR!!! Status code: " + e.status + ", message: " + e.msg;
//                     document.getElementById("error").style.display = "block";
//                 })
//             } else {
//                 console.log("Network error");
//                 document.getElementById("error").innerHTML = "Network error";
//                 document.getElementById("error").style.display = "block";
//             }
//         });
//     } else {
//         personFacade.getPersonById(id)
//             .then(person => {
//                 // console.log("test");
//                 //console.log(person);
//                 // console.log(persons.all);
//
//                 //Insert person data in to Modal
//                 document.getElementById("personID").value = person.id;
//                 document.getElementById("editPersonName").value = person.name;
//                 document.getElementById("editAddressStreet").value = person.street;
//                 document.getElementById("editAddressZip").value = person.zip;
//                 document.getElementById("editAddressCity").value = person.city;
//
//             }).catch(err => {
//             if (err.status) {
//                 err.fullError.then(e => {
//                     console.log(e.detail);
//                     console.log(e);
//                     //Print error message on website
//                     document.getElementById("error").innerHTML = "ERROR!!! Status code: " + e.status + ", message: " + e.msg;
//                     document.getElementById("error").style.display = "block";
//                 })
//             } else {
//                 console.log("Network error");
//                 document.getElementById("error").innerHTML = "Network error";
//                 document.getElementById("error").style.display = "block";
//             }
//         });
//     }
// });
//
// document.getElementById("editbtn").addEventListener('click', function () {
//     const id = document.getElementById("personID").value;
//     const name = document.getElementById("editPersonName").value;
//     const street = document.getElementById("editAddressStreet").value;
//     const zip = document.getElementById("editAddressZip").value;
//     const city = document.getElementById("editAddressCity").value;
//     const person = {
//         id,
//         name,
//         street,
//         zip,
//         city
//     }
//     personFacade.editPerson(person)
//         .then(res => {
//             // console.log("test");
//             //console.log(res);
//             // console.log(persons.all);
//
//             //Reload person array
//             getAllPersons();
//
//         }).catch(err => {
//         if (err.status) {
//             err.fullError.then(e => {
//                 console.log(e.detail);
//                 console.log(e);
//                 //Print error message on website
//                 document.getElementById("error").innerHTML = "ERROR!!! Status code: " + e.status + ", message: " + e.msg;
//                 document.getElementById("error").style.display = "block";
//             })
//         } else {
//             console.log("Network error");
//             document.getElementById("error").innerHTML = "Network error";
//             document.getElementById("error").style.display = "block";
//         }
//     });
//
// });











