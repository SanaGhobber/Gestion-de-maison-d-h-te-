// -------fct optimiser --------

//fct récuperatition des données
function getValue(id) {
  return document.getElementById(id).value;
}

//save in to Local storage
// fct getItem récpérer le tab d'obj ou bien crééer un tab vide
//var usersTab=JSON.parse(localStorage.getItem("usres") || "[]")
function getFormLs(Key) {
  return JSON.parse(localStorage.getItem(Key) || "[]");
}
//fct pour enregistrer le tab dans la clé user par exemple
//localStorage.setItem ("usres",JSON.stringify(usersTab));
function setToLs(key, T) {
  return localStorage.setItem(key, JSON.stringify(T));
}
function checkLength(ch, nb) {
  // if (ch.length>=nb){
  //     return true

  // }
  // else{return false}
  return ch.length >= nb;
}

function checkDescription(ch) {
  // Vérifier si la chaîne est vide
  if (ch === "") {
    return false;
  } else {
    return true;
  }
}
function validationPwd(ch) {
  // verifie que pwd contient au moins 8 caracter
  if (ch.length < 8) {
    return false;
  }
  // verifier que pwd contient au moins une caracter majuscule
  if (!/[A-Z]/.test(ch)) {
    return false;
  }
  //verifier que pwd contient au moins une caracter minuscule
  if (!/[a-z]/.test(ch)) {
    //.test:Vérifie si une chaîne correspond à l'expression régulière.

    return false;
  }
  //vérifier que pwd contient un number
  if (!/[0-9]/.test(ch)) {
    return false;
  }

  //vérifie que pwd contient un point .

  if (!/[$!%*?&]/.test(ch)) {
    return false;
  }
  return true;
}
//validation email

function checkCondtion(isValid, id, msg, color) {
  if (isValid == false) {
    document.getElementById(id).innerHTML = msg;
    document.getElementById(id).style.color = color;
  } else {
    document.getElementById(id).innerHTML = "";
  }
}
function checkPwd(ch1, ch2) {
  return ch1 == ch2;
}
function checkTel(ch, nb) {
  return ch.length == nb;
}
function checkNumber(nb1, nb2) {
  return Number(nb1) > nb2;
}

function generateId(T) {
  var max;
  if (T.length == 0) {
    max = 0;
  } else {
    max = T[0].id;
    for (let i = 1; i < T.length; i++) {
      if (T[i].id > max) {
        max = T[i].id;
      }
    }
  }
  return max;
}
function searchObjByIdAndKey(id, key) {
  var T = JSON.parse(localStorage.getItem(key) || "[]");
  var foundObj = {};
  for (let i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      foundObj = T[i];
      break;
    }
  }
  return foundObj;
}
//---------------------------

function signup() {
  //récupération des données
  var firstName = getValue("firstName");
  //validation firstName
  var isFirstNamevalid = checkLength(firstName, 3);
  checkCondtion(
    isFirstNamevalid,
    "firstnameError",
    "userFirstName should have at least 3 characters",
    "red"
  );

  var lastName = getValue("lastName");
  //validation lastName
  var islastnameValid = checkLength(lastName, 4);
  checkCondtion(
    islastnameValid,
    "lastnameError",
    "userLastName should have at least 4 characters",
    "red"
  );
  var email = getValue("email");

  //validation email
  var isEmailValid = true;
  var usersTab = getFormLs("users");

  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].email == email) {
      document.getElementById("emailError").innerHTML =
        "this email already exist ";
      document.getElementById("emailError").style.color = "red";

      isEmailValid = false;
      break;
    } else {
      document.getElementById("emailError").innerHTML = "";
    }
  }
  var pwd = getValue("pwd");
  //validation Pwd
  var isPwdValid = validationPwd(pwd);
  checkCondtion(
    isPwdValid,
    "pwdError",
    "Password must be at least 8 characters long with an uppercase character, a lowercase character and a number.",
    "red"
  );

  var confirmPwd = getValue("Confirm Password");
  var isConfirmPwdVaid = checkPwd(pwd, confirmPwd);
  checkCondtion(
    isConfirmPwdVaid,
    "confirmPwdError",
    "please chek your Pwd",
    "red"
  );

  var tel = getValue("tel");
  // validation Tel
  var isTelValid = checkTel(tel, 8);
  checkCondtion(isTelValid, "telError", "please enter 8 number", "red");
  //réquipere l'adress
  var adress = getValue("adress");

  //validation
  //si toutes les conditions sont vraies,créer l'obj et enregistrer dans Ls
  if (
    isFirstNamevalid &&
    islastnameValid &&
    isPwdValid &&
    isConfirmPwdVaid &&
    isTelValid &&
    isEmailValid
  ) {
    // alert('test')
    //création de l'objet
    var user = {
      //attribut:value,
      id: generateId(usersTab) + 1,
      FN: firstName,
      LN: lastName,
      email: email,
      tel: tel,
      adress: adress,

      pwd: pwd,
      confirmPwd: confirmPwd,
      role: "client",
    };

    //insérer le nouveau obj dans un tab
    usersTab.push(user);
    //enregistrer le tab dans la clé user
    setToLs("users", usersTab);
    location.replace("login.html");
  }
}


//function pour enregistrer Owner
function signupOwner() {
  //récuperation des données
  var FNOwner = getValue("firstNameOwner");
  //validation firstNameOwner
  var isFirstNameOwnervalid = checkLength(FNOwner, 3);
  checkCondtion(
    isFirstNameOwnervalid,
    "firstnameOwnerError",
    "ownerFirstName requires a minimum of 3 characters",
    "red"
  );

  var LNOwner = getValue("lastNameOwner");
  var isLastNameOwnerValid = checkLength(LNOwner, 4);
  checkCondtion(
    isLastNameOwnerValid,
    "lastnameOwnerError",
    "ownerLastName requires a minimum of 4 characters",
    "red"
  );
  var emailOwner = getValue("emailOwner");

  //validation email
  var isEmailValid = true;
  var usersTab = getFormLs("users");

  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].email == emailOwner) {
      document.getElementById("emailOwnerError").innerHTML =
        "An account with this email already exists ";
      document.getElementById("emailOwnerError").style.color = "red";

      isEmailValid = false;
      break;
    } else {
      document.getElementById("emailOwnerError").innerHTML = "";
    }
  }
  var telOwner = getValue("telOwner");
  //validation tel Owner
  var isTelOwnerValid = checkTel(telOwner, 8);
  checkCondtion(
    isTelOwnerValid,
    "telOwnerError",
    "plase enter 8 number",
    "red"
  );

  var adressOwner = getValue("adressOwner");
  //validation adress Owner
  var isAdressOwnerValid = checkLength(adressOwner, 3);
  checkCondtion(
    isAdressOwnerValid,
    "adressOwnerError",
    "adress needs to be at least 3 characters long",
    "red"
  );

  var pwdOwner = getValue("pwdOwner");
  //validation pwd Owner
  var isPwdOwnerValid = validationPwd(pwdOwner);
  checkCondtion(
    isPwdOwnerValid,
    "pwdOwnerError",
    "Password must be at least 8 characters long with an uppercase character, a lowercase character and a number.",
    "red"
  );
  var confPwdOwner = getValue("ConfirmPwdOwner");
  //validation CofPwd==pwd
  var confPwdOwnerValid = checkPwd(pwdOwner, confPwdOwner);
  checkCondtion(
    confPwdOwnerValid,
    "confirmPwdOwnerError",
    "Please verify your password",
    "red"
  );
  if (
    isFirstNameOwnervalid &&
    isLastNameOwnerValid &&
    isEmailValid &&
    isTelOwnerValid &&
    isAdressOwnerValid &&
    isPwdOwnerValid &&
    confPwdOwnerValid
  ) {
    //création de l'objet
    var user = {
      //attribut:value,
      id: generateId(usersTab) + 1,
      FN: FNOwner,
      LN: LNOwner,
      email: emailOwner,
      tel: telOwner,
      adress: adressOwner,

      pwd: pwdOwner,
      confirmPwd: confPwdOwner,
      role: "owner",
      status: "not validate",
    };

    //insérer le nouveau obj dans un tab
    usersTab.push(user);
    //enregistrer le tab dans la clé user

    setToLs("users", usersTab);
    location.replace("login.html");

  }
}

// fct pour enregistrer Admin
function signupAdmin() {
  var firstNameAdmin = getValue("firstNameAdmin");
  //validation name Admin
  var isFirstNameValid = checkLength(firstNameAdmin, 3);
  checkCondtion(
    isFirstNameValid,
    "firstnameAdminError",
    "adminFirstName must contain a minimum of 3 characters",
    "red"
  );
  var lastNameAdmin = getValue("lastNameAdmin");
  // validation lastNameAdmin
  var isLastNameValid = checkLength(lastNameAdmin, 4);
  checkCondtion(
    isLastNameValid,
    "lastnameAdminError",
    "adminLastName must contain a minimum of 4 characters",
    "red"
  );
  var emailAdmin = getValue("emailAdmin");
  // validation email Admin

  var isEmailValid = true;
  var usersTab = getFormLs("users");

  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].email == emailAdmin) {
      document.getElementById("emailAdminError").innerHTML =
        "This email is already in use ";
      document.getElementById("emailAdminError").style.color = "red";

      isEmailValid = false;
      break;
    } else {
      document.getElementById("emailAdminError").innerHTML = "";
    }
  }

  var pwdAdmin = getValue("pwdAdmin");
  //validation pwd
  var isPwdAdminValid = validationPwd(pwdAdmin);
  checkCondtion(
    isPwdAdminValid,
    "pwdAdminError",
    "Password must be at least 8 characters long with an uppercase character, a lowercase character and a number.",
    "red"
  );
  var confirmPwdAdmin = getValue("confirmPwdAdmin");
  //validation confpwd==pwd
  var isConfPwdValid = checkPwd(pwdAdmin, confirmPwdAdmin);
  checkCondtion(
    isConfPwdValid,
    "confirmPwdAdminError",
    "Please confirm your password",
    "red"
  );
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPwdAdminValid &&
    isConfPwdValid
  ) {
    //création de l'objet
    var user = {
      //attribut:value,
      id: generateId(usersTab) + 1,
      FN: firstNameAdmin,
      LN: lastNameAdmin,
      email: emailAdmin,

      pwd: pwdAdmin,
      confirmPwd: confirmPwdAdmin,
      role: "admin",
    };

    //insérer le nouveau obj dans un tab
    usersTab.push(user);
    //enregistrer le tab dans la clé user

    setToLs("users", usersTab);
    location.replace("login.html");
  }
}
function login() {
  //récup des données
  var emailValue = getValue("emailValue");
  var pwdValue = getValue("pwdValue");
  //récup des users du Ls
  var usersTab = getFormLs("users");
  var foundUser;
  //parcourir
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].email == emailValue && usersTab[i].pwd == pwdValue) {
      foundUser = usersTab[i];
      break;
    }
  }

  if (foundUser) {
    //client
    if (foundUser.role == "client") {
      setToLs("connectedUserId", foundUser.id);
      location.replace("houses.html");
    } else if (foundUser.role == "admin") {
      setToLs("connectedUserId", foundUser.id);
      location.replace("admin.html");
    } else {
      //owner
      if (foundUser.status == "not validate") {
        document.getElementById("loginError").innerHTML =
          "account not yet validated";
        document.getElementById("loginError").style.color = "red";
      } else {
        setToLs("connectedUserId", foundUser.id);
        window.location.replace("addHouse.html");
      }
    }
  } else {
    document.getElementById("loginError").innerHTML =
      "please check email/pwd or signup";
    document.getElementById("loginError").style.color = "red";
  }
}

//fct pr ajouter un maison au LS
function addHome() {
  //récupérer les données
  var nameHome = getValue("nameHome");
  // validation name Home
  var isNameValid = checkLength(nameHome, 2);
  if (!isNameValid) {
    document.getElementById("nameHomeError").innerHTML =
      "name should have at least 2 charac";
    document.getElementById("nameHomeError").style.color = "red";
  } else {
    document.getElementById("nameHomeError").innerHTML = "";
  }
  //récupérer les données
  var adressHome = getValue("adressHome");
  // validation nadressHome
  var isadressHomeValid = checkLength(adressHome, 3);
  if (!isadressHomeValid) {
    document.getElementById("adressHomeError").innerHTML =
      "adress should have at least 2 charac";
    document.getElementById("adressHomeError").style.color = "red";
  } else {
    document.getElementById("adressHomeError").innerHTML = "";
  }
  //récupérer les données
  var villeHome = getValue("villeHome");
  // validation nvilleHome
  var isvilleHomeValid = checkLength(villeHome, 3);
  if (!isvilleHomeValid) {
    document.getElementById("villeHomeError").innerHTML =
      "ville should have at least 2 charac";
    document.getElementById("villeHomeError").style.color = "red";
  } else {
    document.getElementById("villeHomeError").innerHTML = "";
  }
  //récuperer les données
  var descriptionHome = getValue("descriptionHome");
  var isDescriptionHome = checkDescription(descriptionHome);
  if (!isDescriptionHome) {
    document.getElementById("descriptionHomeError").innerHTML =
      "Please create a short description";
    document.getElementById("descriptionHomeError").style.color = "red";
  } else {
    document.getElementById("descriptionHomeError").innerHTML = "";
  }

  if (
    isNameValid &&
    isadressHomeValid &&
    isvilleHomeValid &&
    isDescriptionHome
  ) {
    var homeTab = getFormLs("home");
    var connectedUserId = localStorage.getItem("connectedUserId");
    //creation de l'obj
    var home = {
      id: generateId(homeTab) + 1,
      homeName: nameHome,
      adressHome: adressHome,
      villeHome: villeHome,
      descriptionHome: descriptionHome,
      ownerId: connectedUserId,
    };

    //save into LS
    // var homeTab = JSON.parse(localStorage.getItem("home") || "[]");
    homeTab.push(home);
    localStorage.setItem("home", JSON.stringify(homeTab));
    for (let i = 0; i < homeTab.length; i++) {
      localStorage.setItem("homeId", homeTab[i].id);
      
    }
   // Redirection
   window.location.href = "addRoom.html";
  }
  
 
}


// fct pur add room
function addRoom() {
  // Récupérer les données
  var nameRoom = getValue("nameRoom");
  var price = getValue("priceRoom");
  var capacity = getValue("capacityRoom");
  var descriptionRoom = getValue("descriptionRoom");

  // Validation du nom de la chambre
  var isNameValid = checkLength(nameRoom, 2);
  if (!isNameValid) {
    document.getElementById("nameRoomError").innerHTML =
      "nameRomm should have at least 2 charac";
    document.getElementById("nameRoomError").style.color = "red";
  } else {
    document.getElementById("nameRoomError").innerHTML = "";
  }

  // Validation du prix
  var isPriceValid = checkNumber(price, 0);
  if (!isPriceValid) {
    document.getElementById("priceRoomError").innerHTML = "enter number>0";
    document.getElementById("priceRoomError").style.color = "red";
  } else {
    document.getElementById("priceRoomError").innerHTML = "";
  }

  // Validation de la capacité
  var isCapacityValid = checkNumber(capacity, 0);
  if (!isCapacityValid) {
    document.getElementById("capacityRoomError").innerHTML = "capacity >0";
    document.getElementById("capacityRoomError").style.color = "red";
  } else {
    document.getElementById("capacityRoomError").innerHTML = "";
  }

  // Validation de la description
  var isDescriptionValid = checkDescription(descriptionRoom);
  if (!isDescriptionValid) {
    document.getElementById("descriptionRoomError").innerHTML =
      "Please create a short description";
    document.getElementById("descriptionRoomError").style.color = "red";
  } else {
    document.getElementById("descriptionRoomError").innerHTML = "";
  }

  // Vérifier si toutes les validations sont correctes
  if (isNameValid && isPriceValid && isCapacityValid && isDescriptionValid) {
    var roomTab = getFormLs("Room");
    var connectedUserId = localStorage.getItem("connectedUserId");
    var homeOwnerId = localStorage.getItem("homeId");

    // Compter le nombre de chambres existantes pour cette maison spécifique
    var roomCount = 0;
    for (var i = 0; i < roomTab.length; i++) {
      if (roomTab[i].homeId === homeOwnerId) {
        roomCount++;
      }
    }
    // Vérification si le nombre de chambres dépasse 5
    if (roomCount >= 5) {
      document.getElementById("roomError").innerHTML =
        "please enter just 5 rooms !";
      document.getElementById("roomError").style.color = "red";
      return;
    } else {
    }

    // Création de l'objet chambre
    var room = {
      id: generateId(roomTab) + 1,
      roomName: nameRoom,
      priceRoom: price,
      capacity: capacity,
      descriptionRoom: descriptionRoom,
      ownerId: connectedUserId,
      homeId: homeOwnerId,
    };

    // Sauvegarder dans le localStorage
    roomTab.push(room);
    localStorage.setItem("Room", JSON.stringify(roomTab));
  }
}

// affichage dynamique de tous les houses dans ls
function bookNowHouses() {
  var homeTab = getFormLs("home");

  var content = "";
  for (let i = 0; i < homeTab.length; i++) {
    content =
      content +
      ` <div class="col-lg-3 col-sm-6">
                        <div class="accomodation_item text-center">
                            <div class="hotel_img">
                                <img src="img/banner33 dar-marsa-cubes.jpg" style=" width:170px; height: 215px;" alt="">
                                <button class="btn theme_btn button_hover" onclick="  checkRoomIdHome(${homeTab[i].id})">check Rooms</button>
                            </div>
                           <h4 class="sec_h4">${homeTab[i].homeName}</h4>
                            <h5>${homeTab[i].adressHome}</h5>
                            <h5>${homeTab[i].villeHome}</h5>

                        </div>
                    </div>
                   `;
  }
  document.getElementById("housesDiv").innerHTML = content;
}

// function pour affichage dynamique de tous les chambres dans LS
function checkRooms() {
  var roomTab = getFormLs("Room");
  var homeId = getFormLs("homeId");
  var content = "";
  for (let i = 0; i < roomTab.length; i++) {
    if (roomTab[i].homeId == homeId) {
      content =
        content +
        `   <div class="col-lg-6">
                        <div class="room-pic-slider owl-carousel">
                            <div class="single-room-pic">
                                <img src="img/room/rooms-1.jpg" alt="">
                            </div>
                            <div class="single-room-pic">
                                <img src="img/room/rooms-4.jpg" alt="">
                            </div>
                            <div class="single-room-pic">
                                <img src="img/room/rooms-2.jpg" alt="">
                            </div>
                            
                        </div>
                    </div>
      <div class="col-lg-6">
                        <div class="room-text">
                            <div class="room-title">
                                <h2>${roomTab[i].roomName}</h2>
                                <div class="room-price">
                                    <span>From</span>
                                    <h2>${roomTab[i].priceRoom}dt</h2>
                                    <sub>/night</sub>
                                </div>
                                
                            </div>
                            <div class="room-price">
                                <span>For</span>
                                <h2>${roomTab[i].capacity} people</h2>
                                
                            </div>
                            <div class="room-desc">
                                <p>${roomTab[i].descriptionRoom}.</p>
                            </div>
                            
                            <a href="#" class="primary-btn" onclick="goToCheckAvailability(${roomTab[i].id})">Check Availability <i class="lnr lnr-arrow-right"></i></a>
                        </div>
                    </div>`;
    }
  }
  document.getElementById("roomsDiv").innerHTML = content;
}

//function pour enregistrer room sélectionner dans Ls 
function goToCheckAvailability(id) {
  localStorage.setItem("roomId",id)
  location.replace("roomDetails.html")
  
}
//function pour afficher dynamique room selectionner avec l'id de roomId dans ls dans la page roomdetails
function checkRoomDetails() {
  var roomId=getFormLs("roomId");
  var roomTab = getFormLs("Room");
  var content=""
  for (let i = 0; i < roomTab.length; i++) {
   if (roomTab[i].id==roomId
   ) {
    content=content+`<div class="col-lg-6">
              <div class="room-item">
                <div class="room-pic-slider room-pic-item owl-carousel">
                  <div class="room-pic">
                    <img src="img/room-slider/room-1.jpg" alt="" />
                  </div>
                  <div class="room-pic">
                    <img src="img/room-slider/room-2.jpg" alt="" />
                  </div>
                  <div class="room-pic">
                    <img src="img/room-slider/room-3.jpg" alt="" />
                  </div>
                </div>
                <div class="room-text">
                  <div class="room-title">
                    <h2>${roomTab[i].roomName}</h2>
                    <div class="room-price">
                     
                      
                      <h2>${roomTab[i].priceRoom
                      }dt</h2>
                      
                    </div>
                    
                    
                  </div>
                  <div class="room-price">
                     
                      
                      <h2> capacity:${roomTab[i].capacity
                      }</h2>
                      
                    </div>
                    
                </div>
              </div>
            </div>`
    
   }
    
  }
  document.getElementById("roomdetailsDiv").innerHTML=content
 

    
  }
 
 

// Fonction pour reserver un chambre
function BookNow() {
  // Récupérer les valeurs directement des champs d'input
  var nbr = document.getElementById("number").value; // Nombre de personnes
  var checkIn = document.getElementById("checkIn").value; // Date d'entrée
  var checkOut = document.getElementById("checkOut").value; // Date de sortie
  var checkInMs = new Date(checkIn).getTime(); // Conversion de la date en millisecondes
  var checkOutMs = new Date(checkOut).getTime();
  var roomId = localStorage.getItem("roomId"); // ID de la chambre sélectionnée (reste une chaîne)
  var connectedUserId = localStorage.getItem("connectedUserId"); 
  var roomTab = JSON.parse(localStorage.getItem("Room") || "[]"); 
  var reservations = JSON.parse(localStorage.getItem("reservation") || "[]"); 

  var resultMessage = ""; // Variable pour stocker le message à afficher

  // Rechercher manuellement la chambre sélectionnée dans le tableau des chambres
  var room = null;
  for (var i = 0; i < roomTab.length; i++) {
    if (roomTab[i].id == roomId) { // Comparaison de l'ID (reste en chaîne)
      room = roomTab[i];
      break; // Quitter la boucle si la chambre est trouvée
    }
  }

  // Vérification si la chambre est trouvée et si la capacité est respectée
  if (!room) {
    resultMessage = "Chambre non trouvée."; // Si la chambre n'existe pas
  } else if (nbr > room.capacity) {
    resultMessage = "Erreur : Cette chambre a une capacité maximale de " + room.capacity + " personnes.";
  } else {
    var isNotAvailable = false;

    // Vérification manuelle de la disponibilité de la chambre pour les dates sélectionnées
    for (var j = 0; j < reservations.length; j++) {
      if (reservations[j].roomId == roomId) { // Comparaison des IDs de chambre (toujours chaîne)
        var resCheckInMs = new Date(reservations[j].checkIn).getTime();
        var resCheckOutMs = new Date(reservations[j].checkOut).getTime();

        // Vérification des conflits de dates
        if ((checkInMs >= resCheckInMs && checkInMs < resCheckOutMs) || 
            (checkOutMs > resCheckInMs && checkOutMs <= resCheckOutMs) || 
            (checkInMs <= resCheckInMs && checkOutMs >= resCheckOutMs)) {
          isNotAvailable = true;
          break; // Quitter la boucle si un conflit est trouvé
        }
      }
    }

    if (!isNotAvailable) {
     
      var reservation = {
        id:generateId(reservations)+1,
        userID: connectedUserId,
        roomId: roomId,
        checkIn: checkIn,
        checkOut: checkOut,
        nbr: nbr
      };

      reservations[reservations.length] = reservation; // Ajouter la réservation manuellement
      localStorage.setItem("reservation", JSON.stringify(reservations));
      location.replace("basket.html") // Mettre à jour le localStorage
      resultMessage = "Réservation effectuée avec succès pour la chambre " + roomId;
    } else {
      resultMessage = "La chambre " + roomId + " n'est pas disponible pour ces dates.";
    }
    
  }

  // Afficher le résultat dans un élément HTML
  document.getElementById("notAvailability").innerHTML = resultMessage;
}


//function pour afficher myReservation
function displayMyReservation() {
  var reserTab=getFormLs("reservation")
  var connectedUserID = localStorage.getItem("connectedUserId");
  var content=""
  var myReservation=[]
  var s=0;
  for (let i = 0; i <reserTab.length; i++) {
    if (connectedUserID == reserTab[i].userID) {
      //myOrders
      myReservation.push(reserTab[i]);
  }
    
  }
  for (let i = 0; i <myReservation.length; i++) {


    //calculer le nbr de jours réserver
    var checkInDate = new Date(myReservation[i].checkIn);
    var checkOutDate = new Date(myReservation[i].checkOut);
    var numOfDays = Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    var totalPrice=(searchObjByIdAndKey(myReservation[i].roomId, "Room").priceRoom)* numOfDays
    s=s+totalPrice
    content=content+` <tr>

      
    <td>${myReservation[i].id}</td>
    <td>${myReservation[i].checkIn
    } </td>
    <td>${reserTab[i].checkOut
    }</td>
     <td>${searchObjByIdAndKey(myReservation[i].roomId, "Room").roomName}
     </td>
      <td>${searchObjByIdAndKey(myReservation[i].roomId, "Room").descriptionRoom
      }</td>
      <td>${searchObjByIdAndKey(myReservation[i].roomId, "Room").priceRoom

      }</td>
      <td>${totalPrice}dt</td>
      
       
         <td>
         <div class="d-grid gap-2 d-md-block">
<button class="btn btn-danger" type="button" onclick="deletereservation(${myReservation[i].id})">Delete</button>

    
</div>
         </td>
  </tr>`
    
    
  }
  content = content + `total Sum: ${s} DT`
  document.getElementById("myReservationDiv").innerHTML = content;
  
}

//fct pr afficher tous les resr de chaque owner
function displayOwnerReservation() {
var roomTab=getFormLs("Room") 
var reserTab=getFormLs("reservation")
  var connectedUserID = localStorage.getItem("connectedUserId");
  var content=""
  var myRoom=[]
  var s=0; 
  for (let i = 0; i <roomTab.length; i++) {
    if (roomTab[i].ownerId == connectedUserID) {
      myRoom.push(roomTab[i]);
      
    }}
    //chercher les reservation sur mes rooms
    for (let j = 0; j < myRoom.length; j++) {
      for (let i = 0; i < reserTab.length; i++) {
        if (reserTab[i].roomId == myRoom[j].id
        ) {
           //calculer le nbr de jours réserver
    var checkInDate = new Date(reserTab[i].checkIn);
    var checkOutDate = new Date(reserTab[i].checkOut);
    var numOfDays = Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    var totalPrice=(searchObjByIdAndKey(reserTab[i].roomId, "Room").priceRoom)* numOfDays
    s=s+totalPrice
    content=content+` <tr>

      
    <td>${reserTab[i].id}</td>
    <td>${searchObjByIdAndKey(reserTab[i].roomId, "Room").id}</td>
    <td>${reserTab[i].checkIn
    } </td>
    <td>${reserTab[i].checkOut
    }</td>
     <td>${searchObjByIdAndKey(reserTab[i].roomId, "Room").roomName}
     </td>
      <td>${searchObjByIdAndKey(reserTab[i].roomId, "Room").descriptionRoom
      }</td>
      <td>${searchObjByIdAndKey(reserTab[i].roomId, "Room").priceRoom

      }</td>
      <td>${totalPrice}dt</td>
      
       
         <td>
         <div class="d-grid gap-2 d-md-block">
<button class="btn btn-danger" type="button" onclick="deletereservationOwner(${reserTab[i].id})">Delete</button>

    
</div>
         </td>
  </tr>`
          
        }
        
      }
      
      }
      content = content + `total Sum: ${s} DT`
  document.getElementById("OwnerReservationDiv").innerHTML = content;
      
    }


    //fct pr afficher tous les reservations a l'admin
function displayAllReservation() {
  var reserTab=getFormLs("reservation")
  var content="";
  var s=0
  for (let i = 0; i <reserTab.length; i++) {


    //calculer le nbr de jours réserver
    var checkInDate = new Date(reserTab[i].checkIn);
    var checkOutDate = new Date(reserTab[i].checkOut);
    var numOfDays = Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    var totalPrice=(searchObjByIdAndKey(reserTab[i].roomId, "Room").priceRoom)* numOfDays
    s=s+totalPrice
    content=content+` <tr>

      
    <td>${reserTab[i].id}</td>
    <td>${reserTab[i].roomId}</td>
     <td>${searchObjByIdAndKey(reserTab[i].roomId, "Room").roomName}
     </td>
    <td>${reserTab[i].checkIn
    } </td>
    <td>${reserTab[i].checkOut
    }</td>
    
      <td>${searchObjByIdAndKey(reserTab[i].roomId, "Room").descriptionRoom
      }</td>
      <td>${searchObjByIdAndKey(reserTab[i].roomId, "Room").priceRoom

      }dt</td>
      <td>${reserTab[i].userID}</td>

      <td>${searchObjByIdAndKey(reserTab[i].userID, "users").FN}  ${searchObjByIdAndKey(reserTab[i].userID, "users").LN} </td>
      <td>  ${searchObjByIdAndKey(reserTab[i].userID, "users").email}   </td>
      <td>  ${searchObjByIdAndKey(reserTab[i].userID, "users").tel}   </td>
      <td>${totalPrice}dt</td>
      
       
         <td>
         <div class="d-grid gap-2 d-md-block">
<button class="btn btn-danger" type="button" onclick="deletereservationAdmin(${reserTab[i].id})">Delete</button>

    
</div>
         </td>
  </tr>`
    
    
  }
  content = content + `total Sum: ${s} DT`
  document.getElementById("adminReservationDiv").innerHTML = content;
  
}
function deletereservationAdmin(id){
  var reserTab =getFormLs("reservation");

  // Filtrer les réservations pour exclure celle avec l'ID donné
  reserTab = reserTab.filter(reservation => reservation.id !== id);

  // Sauvegarder la liste mise à jour dans le stockage local 
 setToLs("reservation", reserTab);
 location.reload();

  // Réafficher les réservations après la suppression
  displayAllReservation();
 
}




    function deletereservationOwner(id){
      var reserTab =getFormLs("reservation");
    
      // Filtrer les réservations pour exclure celle avec l'ID donné
      reserTab = reserTab.filter(reservation => reservation.id !== id);
    
      // Sauvegarder la liste mise à jour dans le stockage local 
     location.reload();
    
      // Réafficher les réservations après la suppression
      displayOwnerReservation();
     
    }
    
  
  



function deletereservation(id){
  var reserTab =getFormLs("reservation");

  // Filtrer les réservations pour exclure celle avec l'ID donné
  reserTab = reserTab.filter(reservation => reservation.id !== id);

  // Sauvegarder la liste mise à jour dans le stockage local (ou autre méthode de persistance)
 setToLs("reservation", reserTab);

  // Réafficher les réservations après la suppression
  displayMyReservation();
}


//fct pour check room by id house
function checkRoomIdHome(id) {
  localStorage.setItem("homeId", id);

  location.replace("rooms.html");
}

//fct pour se déconnecter
function logOut() {
  localStorage.removeItem("connectedUserId");
  location.replace("login.html");
}

//chercher un home par son nom
function searchHouse() {
  var searchHouse = getValue("searchNameHouse");
  var homeTab = getFormLs("home");
  var content = "";
  for (let i = 0; i < homeTab.length; i++) {
    if (homeTab[i].homeName == searchHouse  ||  homeTab[i].adressHome == searchHouse ) {
      content =
        content +
        ` <div class="col-lg-3 col-sm-6">
                        <div class="accomodation_item text-center">
                            <div class="hotel_img">
                                <img src="img/banner33 dar-marsa-cubes.jpg" style=" width:170px; height: 215px;" alt="">
                                <button class="btn theme_btn button_hover" onclick="  checkRoomIdHome(${homeTab[i].id})">check Rooms</button>
                            </div>
                           <h4 class="sec_h4">${homeTab[i].adressHome
                           }</h4>
                            <h3>${homeTab[i].adressHome}</h3>
                            <h3>${homeTab[i].villeHome}</h3>

                        </div>
                    </div>`;
    }
  }
  document.getElementById("searchHouse").innerHTML = content;
}

//chercher un chambre par son nom
function searchRoom() {
  var searchRoom = getValue("searchNameRoom");
  var roomTab = getFormLs("Room");
  var content = "";
  for (let i = 0; i < roomTab.length; i++) {
    if (roomTab[i].roomName == searchRoom || roomTab[i].capacity == searchRoom
    ) {
      content =
        content +
        `  <section class="room-section spad">
    <div class="container">
        <div class="rooms-page-item">
            <div class="row"  >
                <div class="col-lg-6">
                    <img src="img/room/rooms-1.jpg" alt="">
                        
                   
                </div>
  <div class="col-lg-6">
                    <div class="room-text">
                        <div class="room-title">
                            <h2>${roomTab[i].roomName}</h2>
                            <div class="room-price">
                                <span>From</span>
                                <h2>${roomTab[i].priceRoom}dt</h2>
                                <sub>/night</sub>
                            </div>
                            
                        </div>
                        <div class="room-price">
                            <span>For</span>
                            <h2>${roomTab[i].capacity} people</h2>
                            
                        </div>
                        <div class="room-desc">
                            <p>${roomTab[i].descriptionRoom}.</p>
                        </div>
                        
                        <button class="primary-btn">check Availibality <i class="lnr lnr-arrow-right"></i></button>
                    </div>
                </div>
               
             
                

             
            </div>
        </div>
       
    </div>
</section>`;
    }
  }
  document.getElementById("searchRoom").innerHTML = content;
}

// afficher dunamique de données de la connected User
function displayprofile() {
  var connectedUserId = localStorage.getItem("connectedUserId");
  var user = searchObjByIdAndKey(connectedUserId, "users");
  document.getElementById("foundUserFName").innerHTML = user.FN;
  document.getElementById("foundUserLName").innerHTML = user.LN;
  document.getElementById("foundUserAdress").innerHTML = user.adress;
  document.getElementById("foundUserEmail").innerHTML = user.email;
  document.getElementById("foundUserTel").innerHTML = user.tel;
}

//fct pour modifier les coordonnées de connectedUser
function editProfile() {
  var connectedUserId = localStorage.getItem("connectedUserId");
  var user = searchObjByIdAndKey(connectedUserId, "users");
  var content = ` <div class="contact-form">
                        <h5>edit your information</h5>
                        <form action="#">
                            <div class="row">
                               
                                <div class="col-lg-6">
                                    <div class="input-group">
                                        <input type="email" id="newEmail" value="${user.email}" placeholder="Email">
                                        <img src="img/envelop-copy.png" alt="">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-group phone-num">
                                        <input type="tel" id="newTel" value="${user.tel}" placeholder="Phone">
                                        <img src="img/phone-copy.png" alt="">
                                    </div>
                                </div>
                                
                                <div class="col-lg-12">
                                    <button type="submit" onclick="validatedEditProfile()">Validate <i class="lnr lnr-arrow-right"></i></button>
                                    <span id="loginError"></span>
                                </div>
                            </div>
                        </form>
                    </div>`;
  document.getElementById("profileDiv").innerHTML = content;
}

//fct pour changer les nouveau donnéee de connected User tapé par user
function validatedEditProfile() {
  
  var newEmail = getValue("newEmail");
  var newTel = getValue("newTel");
  //récuperer all users
  var usersTab = getFormLs("users");
  var connectedUserId = localStorage.getItem("connectedUserId");
  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].id == connectedUserId) {
      
      usersTab[i].email = newEmail;
      usersTab[i].tel = newTel;
      break;
    }
  }
  setToLs("users", usersTab);
  setTimeout(() => {
    location.reload();
  }, 100); // délai de 100ms
}

//header dynamique
function generateHeader() {
  
  var connectedUserId= localStorage.getItem("connectedUserId")
  var content=""
  var user =searchObjByIdAndKey( connectedUserId,"users")
  // connected
  if (connectedUserId) {
    if (user.role=="client") {
      content=`<div class="container-fluid">
            <div class="inner-header">
                
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <nav class="main-menu mobile-menu">
                                <ul>
                                    <li><a href="./index.html">Home</a></li>
                                    <li><a href="./houses.html">Houses</a></li>
                                    <li><a href="./rooms.html">Rooms</a></li>
                                    <li><a href="./roomDetails.html">RoomDetails</a></li>
                                   
                                    <li><a href="./basket.html">Basket</a></li>
                                    <li><a href="#">search</a>
                                        <ul class="drop-menu">
                                            <li><a href="searchRoom.html">room</a></li>
                                            <li><a href="searchHouse.html">house</a></li>
                                          
                                           
                                        </ul>
                                    </li>
                                    <li><a href="./profile.html">Hello ${user.FN} ${user.LN}</a></li>
                                    
                                    <li><a href="login.html" onclick=" logOut()">logOut</a></li>
                                   
                                </ul>
                            </nav>
                           
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>`
      
    }
    else if(user.role=="owner"){
      content=`<div class="container-fluid">
            <div class="inner-header">
                
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <nav class="main-menu mobile-menu">
                                <ul>
                                    <li><a href="./index.html">Home</a></li>
                                    <li><a href="./addHouse.html">Add house</a></li>
                                    <li><a href="./addRoom.html"> Add Room</a></li>
                                  
                                   
                                    
                                    <li><a href="#">search</a>
                                        <ul class="drop-menu">
                                            <li><a href="searchRoom.html">room</a></li>
                                            <li><a href="searchHouse.html">house</a></li>
                                          
                                           
                                        </ul>
                                    </li>
                                    <li><a href="./owner.html">Dashboard</a></li>
                                    <li><a href="./profile.html">Hello ${user.FN} ${user.LN}</a></li>
                                    
                                    <li><a href="login.html" onclick=" logOut()">logOut</a></li>
                                   
                                </ul>
                            </nav>
                           
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>`
    }
    else{
      content=`<div class="container-fluid">
            <div class="inner-header">
                
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <nav class="main-menu mobile-menu">
                                <ul>
                                    <li><a href="./index.html">Home</a></li>
                                    <li><a href="./signupAdmin.html">signup</a></li>
                                    
                                   
                                    
                                
                                    <li><a href="./admin.html">Dashboard</a></li>
                                    <li><a href="./profile.html">Hello ${user.FN} ${user.LN}</a></li>
                                    
                                    <li><a href="login.html" onclick=" logOut()">logOut</a></li>
                                   
                                </ul>
                            </nav>
                           
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>`
    }
    
  } else {
    //not connected
    content=`  <div class="container-fluid">
            <div class="inner-header">
                
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <nav class="main-menu mobile-menu">
                                <ul>
                                    <li><a href="./index.html">Home</a></li>
                                    <li><a href="./houses.html">Houses</a></li>
                                    <li><a href="./rooms.html">Rooms</a></li>
                                    <li><a href="#">signup</a>
                                        <ul class="drop-menu">
                                            <li><a href="signup.html">Client</a></li>
                                            <li><a href="signupOwner.html">Owner</a></li>
                                            <li><a href="signupAdmin.html">Admin</a></li>
                                           
                                        </ul>
                                    </li>
                                    <li><a href="./login.html">Login</a></li>
                                   
                                </ul>
                            </nav>
                           
                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>`
    
  }
  document.getElementById("headerDiv").innerHTML=content

}

// afficher tous les clients est les owner à l'admin
function displayAdminUsers() {
  var usersTab=getFormLs("users");
  var content=""
  for (let i = 0; i < usersTab.length; i++) {
   if ( usersTab[i].role !="admin") {
    if (usersTab[i].role =="owner" && usersTab[i].status =="not validate") {
      content=content+` <tr>
      
      <td>${usersTab[i].id}</td>
      <td>${usersTab[i].FN}${usersTab[i].LN
      } </td>
      <td>${usersTab[i].email
      }</td>
       <td>${usersTab[i].tel}</td>
        <td>${usersTab[i].role
        }</td>
         <td>${usersTab[i].status
         }</td>
          <td>${usersTab[i].adress}</td>
           <td>
           <div class="d-grid gap-2 d-md-block">
  <button class="btn btn-danger" type="button" onclick="deleteUser(${usersTab[i].id})">Delete</button>
  <button class="btn btn-success" type="button" onclick="validateUser(${usersTab[i].id})">validate</button>
</div>
           </td>
    </tr>`
      
    } else {
      content=content+` <tr>
      
      <td>${usersTab[i].id}</td>
      <td>${usersTab[i].FN}${usersTab[i].LN
      } </td>
      <td>${usersTab[i].email
      }</td>
       <td>${usersTab[i].tel}</td>
        <td>${usersTab[i].role
        }</td>
         <td>${usersTab[i].status
         }</td>
          <td>${usersTab[i].adress}</td>
           <td>
           <div class="d-grid gap-2 d-md-block">
  <button class="btn btn-danger" type="button" onclick="deleteUser(${usersTab[i].id})">Delete</button>
  
           </td>
    </tr>`
      
      
    }
    
   }
  }
  document.getElementById("adminUsersDiv").innerHTML = content;
  
} 

//fct que permet l'admin delete user
function deleteUser(id) {
  var T = getFormLs('users');
  var pos = searchPosByIdAndKey(id, 'users')
  T.splice(pos, 1);
  setToLs('users', T);
  location.reload()
}
//fct que permet l'admin validate user

function validateUser(id) {
  var users = getFormLs('users');
  for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
          users[i].status = "validated";
          break;
      }

  }
  setToLs("users", users);
  location.reload()
}
function searchPosByIdAndKey(id, key) {
  var T = getFormLs(key);
  var pos;
  for (let i = 0; i < T.length; i++) {
      if (T[i].id == id) {
          pos = i;
          break;
      }
  }
  return pos;
}

function displayAdminHouses() {
  
  var homeTab=getFormLs("home")
  var content=""
  for (let i = 0; i < homeTab.length; i++) {
   content=content+` <tr>
      
      <td>${homeTab[i].id}</td>
      <td>${homeTab[i].homeName
      } </td>
      <td>${homeTab[i].ownerId
      }</td>
       <td>${homeTab[i].adressHome
       }</td>
        <td>${homeTab[i].villeHome}</td>
        
         
           <td>
           <div class="d-grid gap-2 d-md-block">
  <button class="btn btn-danger" type="button" onclick="deleteHouseAdmin(${homeTab[i].id})">Delete</button>
 
</div>
           </td>
    </tr>`
    
  }
  document.getElementById("adminHousesDiv").innerHTML=content

}

function deleteHouseAdmin(id) {
  // Recherche la position de la maison à supprimer
  var pos = searchObjByIdAndKey(id, "home");
  var homeTab = getFormLs("home");
  var roomTab = getFormLs("Room");

  // Supprimer les chambres associées à la maison
  for (let i = roomTab.length - 1; i >= 0; i--) {
    if (roomTab[i].homeId == id) {  // Comparer l'ID de la maison avec l'ID de la maison de la chambre
      roomTab.splice(i, 1);
    }
  }

  // Mettre à jour la liste des chambres dans le local storage
  setToLs("Room", roomTab);

  // Supprimer la maison
  homeTab.splice(pos, 1);
  setToLs("home", homeTab);

  // Recharger la page pour refléter les modifications
  location.reload();
}

 function editHouse(id){
  var house = searchObjByIdAndKey(id, "home")
    var content = ` <div class="contact-form">
                        <h5>edit your information</h5>
                        <form action="#">
                            <div class="row">
                               
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <input type="tesxt" id="newName" value="${house.homeName}" placeholder="newName">
                                        <img src="img/edit.png" alt="">
                                    </div>
                                </div>
                                
                                
                                <div class="col-lg-12">
                                    <button type="submit" onclick="validatedEditHouse(${id})">Validate <i class="lnr lnr-arrow-right"></i></button>
                                    
                                </div>
                            </div>
                        </form>
                    </div>`;
  document.getElementById("editHouseDiv").innerHTML = content;
  
 }
 //fct pour validatenewNameHouse
 function validatedEditHouse(id) {
  var newName=getValue("newName")
  var house=getFormLs("home")
  for (let i = 0; i < house.length; i++) {
    if (house[i].id == id) {
        house[i].homeName = newName;
        
        break;
    }
}
setToLs("home",house);
location.reload();


  
 }

 
 function displayAdminRoom() {
  var roomTab=getFormLs("Room")
  var content="";
  for (let i = 0; i < roomTab.length; i++) {
    content=content+`<tr>
      
      <td>${roomTab[i].id}</td>
      <td>${roomTab[i].roomName

      } </td>
      <td>${roomTab[i].homeId

      }</td>
       <td>${roomTab[i].ownerId

       }</td>
        <td>${roomTab[i].priceRoom}</td>
        <td>${roomTab[i].capacity
        }</td>
        
         
           <td>
           <div class="d-grid gap-2 d-md-block">
  <button class="btn btn-danger" type="button" onclick="deleteRoomAdmin(${roomTab[i].id})">Delete</button>

</div>
           </td>
    </tr>`
    
  }
  document.getElementById("adminRoomsDiv").innerHTML=content
  
 }

 //delete Room by admin
function deleteRoomAdmin( id) {
  var pos =searchObjByIdAndKey(id,"Room")
  var roomtab=getFormLs("Room")
  var reserTab=getFormLs("reservation")
  for (let i =reserTab.length - 1; i >= 0; i--) {
    if (id == reserTab[i].roomId) {
      reserTab.splice(i, 1);
    }

}
setToLs("reservation", reserTab);
roomtab.splice(pos, 1);
setToLs("Room", roomtab);
    location.reload();
  
}



 function displayOwnerHouses(){
  var homeTab=getFormLs("home")
  var connectedUserId=getFormLs("connectedUserId")
  var content=""
 for (let i = 0; i < homeTab.length; i++) {
  if (homeTab[i].ownerId==connectedUserId
  ) {
    content=content+` <tr>
      
    <td>${homeTab[i].id}</td>
    <td>${homeTab[i].homeName
    } </td>
    <td>${homeTab[i].ownerId
    }</td>
     <td>${homeTab[i].adressHome
     }</td>
      <td>${homeTab[i].villeHome}</td>
      
       
         <td>
         <div class="d-grid gap-2 d-md-block">
<button class="btn btn-danger" type="button" onclick="deleteHouse(${homeTab[i].id})">Delete</button>
<button class="btn btn-warning" type="button" onclick="editHouse(${homeTab[i].id})">Edit</button>
<button class="btn btn-primary" type="button" onclick="addHouse()">Add</button>
</div>
         </td>
  </tr>`
    
  }
  
  
 }
 document.getElementById("adminOwnerDiv").innerHTML=content
  
 }
 // fct pour ajouter autre house depuis dashboard
function addHouse() {
 location.replace("addHouse.html")

  
}

 function displayOwnerRoom() {
  var roomTab=getFormLs("Room")
  var connectedUserId=getFormLs("connectedUserId")
  var content=""
  for (let i = 0; i < roomTab.length; i++) {
    if (roomTab[i].ownerId==connectedUserId) {
      content=content+`<tr>
      
      <td>${roomTab[i].id}</td>
      <td>${roomTab[i].roomName

      } </td>
      <td>${roomTab[i].homeId

      }</td>
       <td>${roomTab[i].ownerId

       }</td>
        <td>${roomTab[i].priceRoom}</td>
        <td>${roomTab[i].capacity
        }</td>
        
         
           <td>
           <div class="d-grid gap-2 d-md-block">
  <button class="btn btn-danger" type="button" onclick="deleteRoomOwner(${roomTab[i].id})">Delete</button>
  <button class="btn btn-warning" type="button" onclick="editRoom(${roomTab[i].id})">Edit</button>
  <button class="btn btn-primary" type="button" onclick="addRoomOwner(${roomTab[i].homeId
  })">Add</button>
</div>
           </td>
    </tr>`
      
    }
  
    
  }
  document.getElementById("ownerRoomsDiv").innerHTML=content

  
 }
 function addRoomOwner(id) {
  
  var content = ` <div class="container">
            <div class="row">
             <div class="col-lg-3" ></div>  
                <div class="col-lg-6">
                    <div class="contact-form">
                        <h5>please Add your Rooms</h5>
                        <form action="#">
                            <div class="row">
                                <div class="col-lg-12">
                                   
                                    <div class="input-group">
                                        <input type="text" placeholder="nameRoom" id="nameRoom">
                                        <img src="img/edit.png" alt="">
                                       
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <input type="number" placeholder="price" id="priceRoom">
                                        
                                        
                                        
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-group phone-num">
                                        <input type="number" placeholder="capacity" id="capacityRoom">
                                        
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="message">
                                        
                                        <div class="textarea">
                                            <textarea placeholder="description" id="descriptionRoom"></textarea>
                                            <img src="img/speech-copy.png" alt="">
                                            <span id="descriptionRoomError"></span>
                                           
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="col-lg-12">
                                    <span id="roomError"></span>
                                    <button type="submit" value="submit"   onclick="ValidateAddRoom(${id})" class="primary-btn">Add </i></button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-3" ></div> 
            </div>
        </div>`
 document.getElementById("addRoomOwnerDiv").innerHTML = content;
  
 }
 function ValidateAddRoom(id) {
  var roomTab = getFormLs("Room"); // Récupérer la liste des chambres stockées
  var roomCount = 0;

  // Vérifier le nombre de chambres existantes pour cette maison spécifique
  for (let i = 0; i < roomTab.length; i++) {
    if (roomTab[i].homeId == id) {
      roomCount++;
    }
  }

  // Si le nombre de chambres pour cette maison est inférieur à 5, on peut ajouter une nouvelle chambre
  if (roomCount < 5) {
    addRoom(); // Appel à la fonction d'ajout de chambre
    location.reload(); // Recharger la page après l'ajout de la chambre
  } 
}





 //fct pr edit price,name and capacity room
 function editRoom(id) {
  var Room = searchObjByIdAndKey(id, "Room")
  var content =  ` <div class="contact-form">
  <h5>edit your information</h5>
  <form action="#">
      <div class="row">
       <div class="col-lg-12">
                                    <div class="input-group">
                                        <input type="tesxt" id="newNameRoom" value="${Room.roomName
                                        }" placeholder="newName">
                                        <img src="img/edit.png" alt="">
                                    </div>
                                </div>
         
          <div class="col-lg-6">
              <div class="input-group">
                  <input type="number" id="newPrice" value="${Room.priceRoom
                  }" placeholder="price">
                 
              </div>
          </div> 
          <div class="col-lg-6">
              <div class="input-group phone-num">
                  <input type="number" id="newCapacity" value="${Room.capacity}" placeholder="capacity">
                 
              </div>
          </div>
          
          <div class="col-lg-12">
              <button type="submit" onclick="validatedEditRoom(${id})">Validate <i class="lnr lnr-arrow-right"></i></button>
              <span id="loginError"></span>
          </div>
      </div>
  </form>
</div>`
document.getElementById("editRoomDiv").innerHTML = content;


  
 }

 function validatedEditRoom(id) {
  var newNameRoom=getValue("newNameRoom")
  var newPrice = getValue("newPrice");
  var newCapacity = getValue("newCapacity");
  var Room = getFormLs("Room");
  for (let i = 0; i < Room.length; i++) {
      if (Room[i].id == id) {
        Room[i].roomName = newNameRoom;
        Room[i].priceRoom = newPrice;
        Room[i].capacity = newCapacity;
          break;
      }
  }
  setToLs("Room", Room);
  setTimeout(() => {
    location.reload();
  }, 100); // délai de 100ms
}