async function sendPostRequest() {
    // Get form values
  const name = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phoneno = document.getElementById('phoneno').value;
  const hobbies = document.getElementById('hobbies').value;

  // Create an object with the form data
  const formData = {
    username: name,
    email: email,
    phoneno: phoneno,
    hobbies: hobbies
  };

  // Send a POST request using the Fetch API
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const result = await response.text();
    console.log(result);
    // await fetchData();
  } else {
    console.log('Error saving data from front end to the server');
  }
}


async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/getData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 1000,
        }); 
    const data = await response.json();

    // Process the data as needed
    console.log(data);

    // Get the table body element
    const tbody = document.getElementById('dataBody');

    // Iterate over the data and create table rows
    data.forEach(row => {
    const tr = document.createElement('tr');

    // Create and append the cells to the row
    const checkboxCell = document.createElement('td');
    checkboxCell.innerHTML = '<input type="checkbox" class="row"/>';
    tr.appendChild(checkboxCell);

    const idCell = document.createElement('td');
    idCell.textContent = row._id;
    tr.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = row.username;
    tr.appendChild(nameCell);

    const phoneNumberCell = document.createElement('td');
    phoneNumberCell.textContent = row.phoneno;
    tr.appendChild(phoneNumberCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = row.email;
    tr.appendChild(emailCell);

    const hobbiesCell = document.createElement('td');
    hobbiesCell.textContent = row.hobbies;
    tr.appendChild(hobbiesCell);

    // Append the row to the table body
    tbody.appendChild(tr);
});
    } catch (error) {
      console.log('Error while loading data from the Database to the frontend',error);
    }
}

fetchData();

async function sendEmail() {

    const checkedEmails = await getEmailsOfCheckedRows();

    console.log('Emails of Checked Rows:', checkedEmails);
  
    //   for (let index = 0; index < checkedEmails.length; index++) {
    //     console.log(checkedEmails[index]);
    //   await fetch('http://localhost:8080/sendEmail', {
    //     method:'POST',
    //     mode: "cors",
    //     headers: {
    //       'Content-Type': 'text/plain',
    //     },
    //     body: checkedEmails[index],
    //   }).then(response=>{
    //     if (response.ok) {
    //       console.log('Emails sent successfully!');
    //     } else {
    //       console.log('Failed to send emails.');
    //     }
    //   });
      
    // }
    if (checkedEmails.length > 0) {
      try {
        for (let index = 0; index < checkedEmails.length; index++) {
          const response = await fetch('http://localhost:8080/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: checkedEmails[index] }), // Sending as JSON object
          });
  
          if (response.ok) {
            console.log('Emails sent successfully!');
          } else {
            console.log('Failed to send emails.');
          }
        }
      } catch (error) {
        console.error('Error sending emails:', error);
      }
    }
  } 



    async function getEmailsOfCheckedRows() {
      const checkedEmails = [];
      const checkboxes = document.querySelectorAll('#dataBody input.row:checked');
    
      checkboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');
        const emailCell = row.querySelector('td:nth-child(5)'); //email is in the 5th column
        const email = emailCell.textContent;
        checkedEmails.push(email);
      });
    
      return checkedEmails;
    }
  