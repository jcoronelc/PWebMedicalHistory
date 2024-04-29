

let personalData = document.getElementById("submitForm");

// const age  = calculateAge('2020-01-23','04:00')
// console.log(age);

personalData.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(personalData);
    let formValues = {};
    formData.forEach((value, key) => {
        formValues[key] = value;
    });
    console.log(formValues);

    if(formValues['country']=='Ecuador'){
        if (validateCedula(formValues['cedula']) ) {
        console.log("Cédula válida");

        } else {
        document.querySelector('.cedula-message').style.display = 'block'; 
        return false;
    }
    }

    if(isNaN(formValues['cedula'])){
        document.querySelector('.error-message').style.display = 'block'; 
        return false;
    }

    if(isNaN(formValues['phone'])){
        document.querySelector('.error-numeric-message').style.display = 'block'; 
        return false;
    }

    alert("Datos guardados correctamente");
    
    document.querySelector('.error-numeric-message').style.display = 'none';
    document.querySelector('.cedula-message').style.display = 'none';
    document.querySelector('.error-message').style.display = 'none'; 

    const age = calculateAge(formValues['dateofbirth'], formValues['timeBirth']);
    alert(age);
    console.log(`Su edad es ${age}`);

    let jsonData = JSON.stringify(formValues);
    localStorage.setItem('formData', jsonData);
    
    personalData.reset();
    
});


document.getElementById('inputFile').addEventListener('change', function() {
    var fileName = this.files[0].name;
    document.getElementById('file-name').innerText = 'Archivo seleccionado: ' + fileName;
});

document.querySelector('.custom-file-upload button').addEventListener('click', function() {
    document.getElementById('inputFile').click();
});


document.getElementById('inputFile').addEventListener('change', function() {
 
    var preview = document.getElementById('preview-image');
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function() {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});


document.getElementById('preview-image').addEventListener('click', function() {
    document.getElementById('inputFile').click();
});


let jsonData = localStorage.getItem('formData');
let formData = JSON.parse(jsonData);
let patientSelects = document.querySelectorAll('#patientSelect');

let name = formData['name'];
let lastName = formData['lastName'];
let fullName = name + " " + lastName;

patientSelects.forEach(select => {
    let option = document.createElement('option');
    option.value = fullName;
    option.textContent = fullName;
    select.appendChild(option);
});


function saveConsultation() {


    var consultationForm = document.getElementById('consultationForm');
    if(consultationForm.checkValidity()) {


        var patient = document.getElementById("patientSelect").value;
        var dateConsulta = document.getElementById("medicalConsultation").value;
        var timeConsulta = document.getElementById("timeMedicalConsultation").value;

        var table = document.getElementById("consultaTable");
        var newRow = table.insertRow();
        var nroRows = table.rows.length;

        var cellNumero = newRow.insertCell(0);
        var cellPaciente = newRow.insertCell(1);
        var cellFechaConsulta = newRow.insertCell(2);
        var cellHoraConsulta = newRow.insertCell(3);

        cellNumero.innerHTML = nroRows; 
        cellPaciente.innerHTML = patient;
        cellFechaConsulta.innerHTML = dateConsulta;
        cellHoraConsulta.innerHTML = timeConsulta;

        alert("Datos guardados correctamente");  
        $('#modalAddConsultation').modal('hide');

    }else{

        alert("Por favor, complete todos los campos requeridos");
    
       }

      
}

function saveFamily() {

    var familyForm = document.getElementById('familyForm');
    if(familyForm.checkValidity()) {

        var patient = document.getElementById("patientSelect").value;
        var parentesco = document.getElementById("parentesco").value;
        var nameFamily = document.getElementById("nameFamily").value;
        var lastNameFamily = document.getElementById("lastNameFamily").value;
        var cedulaFamily = document.getElementById("cedulaFamily").value;
    
        var table = document.getElementById("familyTable");
        var newRow = table.insertRow();
        var nroRows = table.rows.length;
    
        var cellNumero = newRow.insertCell(0);
        var cellPaciente = newRow.insertCell(1);
        var cellParentesco = newRow.insertCell(2);
        var cellNameFamily = newRow.insertCell(3);
        var cellCedulaFamily= newRow.insertCell(4);
    
        cellNumero.innerHTML = nroRows; 
        cellPaciente.innerHTML = patient;
        cellParentesco.innerHTML = parentesco;
        cellNameFamily.innerHTML = nameFamily + " " + lastNameFamily;
        cellCedulaFamily.innerHTML = cedulaFamily;
        
        alert("Datos guardados correctamente");

        $('#modalAddFamily').modal('hide');

   }else{

    alert("Por favor, complete todos los campos requeridos");


   }

   
}

function calculateAge(birthDate, birthTime) {
    const now = new Date();
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const nowTime = now.getHours() * 60 + now.getMinutes();

    const birthDateObj = new Date(birthDate);
    const birthTimeHours = parseInt(birthTime.split(':')[0]);
    const birthTimeMinutes = parseInt(birthTime.split(':')[1]);
    const birthTimeTotalMinutes = birthTimeHours * 60 + birthTimeMinutes;
    
    const timeDiffMs = nowDate.getTime() - birthDateObj.getTime() + (nowTime - birthTimeTotalMinutes) * 60000;
  
    const years = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24 * 365));
  
    const monthsDiffMs = timeDiffMs % (1000 * 60 * 60 * 24 * 365);
    const months = Math.floor(monthsDiffMs / (1000 * 60 * 60 * 24 * 30.44));

    const daysDiffMs = monthsDiffMs % (1000 * 60 * 60 * 24 * 30.44);
    const days = Math.floor(daysDiffMs / (1000 * 60 * 60 * 24));
  
    const hoursDiffMs = daysDiffMs % (1000 * 60 * 60 * 24);
    const hours = Math.floor(hoursDiffMs / (1000 * 60 * 60));

    const minutesDiffMs = hoursDiffMs % (1000 * 60 * 60);
    const minutes = Math.floor(minutesDiffMs / (1000 * 60));
    const age = `${years} años, ${months} meses, ${days} día(s) y ${hours} horas`;
  
    return age;
  }
  



function validateCedula(cedula) {
    if (cedula.length !== 10) {
        return false;
    }

    var lastDigit = Number(cedula.charAt(9));
    var cedulaDigits = cedula.substring(0, 9);
    var expectedDigit = 0;
    var sum = 0;

    for (var i = 0; i < cedulaDigits.length; i++) {
        var digit = Number(cedulaDigits.charAt(i));

        if (i % 2 === 0) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }
    expectedDigit = (Math.ceil(sum / 10) * 10) - sum;
    return lastDigit === expectedDigit;
}



populateCountries();


async function populateCountries() {

    const countries = await fetchCountries();
    const countrySelect = document.getElementById('country');
    countries.forEach(iter => {
      const option = document.createElement('option');
      option.value = iter.country;
      option.textContent = iter.country;
      countrySelect.appendChild(option);
    });
  }
  

  async function populateStates(countryCode) {
    try {
        const countryData = await fetchStates(countryCode);
        const states = countryData.states; 
        console.log('Estados de', countryCode, ':', states);
  
        const stateSelect = document.getElementById('state');
        stateSelect.innerHTML = '';
  
        if (states.length > 0) {
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state.name;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No se encontraron estados';
            stateSelect.appendChild(option);
        }
    } catch (error) {
        console.error('Error al obtener los estados:', error);
    }
}

async function populateCities(countryName, stateCode) {

    try {
        const countryData = await fetchCities(countryName, stateCode);
        const cities = countryData; 
        console.log('Ciudades de', stateCode, ':', cities);
  
        const stateSelect = document.getElementById('city');
        stateSelect.innerHTML = '';
  
        if (countryData.length > 0) {
            countryData.forEach(iter => {
                const option = document.createElement('option');
                option.value = iter;
                option.textContent = iter;
                stateSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No se encontraron estados';
            stateSelect.appendChild(option);
        }
    } catch (error) {
        console.error('Error al obtener los estados:', error);
    }


}

  
  

  document.getElementById('country').addEventListener('change', async (event) => {
    const selectedCountry = event.target.value;
    populateStates(selectedCountry);
    
  });
  

  document.getElementById('state').addEventListener('change', async (event) => {
    const selectedState = event.target.value;
    const selectedCountry = document.getElementById('country').value;
    populateCities(selectedCountry, selectedState);
    
  });



  async function fetchCountries() {
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        if (!response.ok) {
            throw new Error('Error al obtener la lista de países');
        }
        const data = await response.json();
        console.log('Datos de países:', data.data); 
        return data.data;
    } catch (error) {
        console.error('Error al obtener la lista de países:', error);
        return []; 
    }
}



  
  async function fetchStates(countryName) {
    const url = 'https://countriesnow.space/api/v0.1/countries/states';
    const data = {
      country: countryName
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch states');
      }
  
      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error('Error fetching states:', error.message);
      return [];
    }
  }

  

  async function fetchCities(countryName, stateName) {
   
    const url = 'https://countriesnow.space/api/v0.1/countries/state/cities';
    const data = {
        country: countryName,
        state: stateName
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching cities by state:', error.message);
        return [];
    }
}

  
  
  