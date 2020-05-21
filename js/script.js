//****************************************************************************************************
//Variables ******************************************************************************************
//****************************************************************************************************
//name and email variables
let name_field = document.getElementById('name');
name_field.focus();
let email_field = document.getElementById('mail');
name_field.style.border='2px solid red';

//job title variables *******************************************************************************
let jobTitle = document.getElementById('title');
jobTitle.addEventListener('change', TitleChange);
let jobDiv = document.getElementById('jobDiv');
let job_field = jobDiv.parentElement;
job_field.removeChild(jobDiv);

//t-shirt variables *********************************************************************************
let designSelect = document.getElementById('design');
designSelect.addEventListener('change', DesignChange);
let colorSelect = document.getElementById('color');
while (colorSelect.options.length){
    colorSelect.remove(0);
}
let colorDefault = document.createElement('option');
colorDefault.text = "Please select a T-shirt theme."
colorSelect.options.add(colorDefault,0);
colorSelect.style.visibility = 'hidden';
let colorLabel = document.getElementById('colors-js-puns').childNodes[1];
colorLabel.style.visibility = 'hidden';

//activity check-box variables **********************************************************************
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let costs = [];
let dates = [];
for(i=0;i<checkboxes.length;i++){
    costs.push(checkboxes[i].getAttribute('data-cost'));
    dates.push(checkboxes[i].getAttribute('data-day-and-time'));
    checkboxes[i].addEventListener('change', CheckBoxChange);
}
let activities_container = document.getElementById('activities');
let total_element = document.createElement('div');
let total = 0;
total_element.innerHTML = `Total: $${total}`;
activities_container.appendChild(total_element);

let reg_title = document.querySelectorAll('legend')[2];
reg_title.innerText = "Please register for at least one activity.";
reg_title.style.color = 'red';

//payment info variables ****************************************************************************
let payment_element = document.getElementById('payment');
payment_element.value = "Credit Card";
payment_element.addEventListener('change',ChangePayment);
let choose_element = payment_element.childNodes[1];
payment_element.removeChild(choose_element);
let creditCard_element = document.getElementById('credit-card');
let paypal_element = document.getElementById('paypal');
let bitcoin_element = document.getElementById('bitcoin');
let payment_field = payment_element.parentElement;
payment_field.removeChild(bitcoin_element);
payment_field.removeChild(paypal_element);

//****************************************************************************************************
//live form validation *******************************************************************************
//****************************************************************************************************
//name
let name_valid = false;
name_field.addEventListener('keyup',() => {
    if (name_field.value === ""){
        name_field.style.border='2px solid red';
        name_valid = false;
    }else{
        name_field.style.border='2px solid lightgreen';
        name_valid = true;
    }
});

//email
let email_valid = false;
email_field.style.border='2px solid red';
email_field.addEventListener('keyup',() => {
    let email_entry = email_field.value;
    let email_at = email_entry.includes('@');
    if(email_at){
        let email_dot = email_entry.split(".");
        if(email_dot.length > 1 && !email_dot[email_dot.length - 1].includes('@')){
            let email_com = email_dot[email_dot.length - 1];
            if (email_com.length === 3){
                email_valid = true;
                email_field.style.border='2px solid lightgreen';
            }else{
                email_field.style.border='2px solid red';
                email_valid = false;
            }
        }else{
            email_field.style.border='2px solid red';
            email_valid = false;
        }
    }else{
        email_field.style.border='2px solid red';
        email_valid = false;
    }
});

//job role (handled in title change function)
let job_valid = true;

//t-shirt style
let tshirt_valid = false;
designSelect.style.border = '3px solid red';

//registered for activities
let registered_for_activities = false;

//payment info / credit card
let card_number = document.getElementById('cc-num');
let card_zip = document.getElementById('zip');
let card_cvv = document.getElementById('cvv');
card_number.style.border = "2px solid red";
card_number.placeholder = "Please enter 16 digit card number"
card_zip.style.border = "2px solid red";
card_zip.placeholder = "5 digit zip"
card_cvv.style.border = "2px solid red";
card_cvv.placeholder = "3 digit CVV"

let card_number_valid = false;
card_number.addEventListener('keyup',()=>{
    if (!isNaN(card_number.value) && card_number.value.length === 16){
        card_number.style.border = '2px solid lightgreen';
        card_number_valid = true;
    }else{
        card_number.style.border = '2px solid red';
        card_number_valid = false;
    }
});

let card_zip_valid = false;
card_zip.addEventListener('keyup',()=>{
    if (!isNaN(card_zip.value) && card_zip.value.length === 5){
        card_zip.style.border = '2px solid lightgreen';
        card_zip_valid = true;
    }else{
        card_zip.style.border = '2px solid red';
        card_zip_valid = false;
    }    
});

let card_cvv_valid = false;
card_cvv.addEventListener('keyup',()=>{
    if (!isNaN(card_cvv.value) && card_cvv.value.length === 3){
        card_cvv.style.border = '2px solid lightgreen';
        card_cvv_valid = true;
    }else{
        card_cvv.style.border = '2px solid red';
        card_cvv_valid = false;
    }    
});

//****************************************************************************************************
//submit code and form validation ********************************************************************
//****************************************************************************************************

let form = document.querySelector('form');

let error_box = document.createElement('div');
error_box.attributes.id="error_box";
error_box.style.textAlign = 'left';
error_box.style.color = 'red';
form.appendChild(error_box);

function SubmitForm() {
    error_box.innerHTML = "";
    let form_valid = false;
    if(!name_valid || !email_valid || !job_valid || !tshirt_valid || !registered_for_activities){
        form_valid = false;
    }else{
        form_valid = true;
        if(payment_element.value === "credit card"){
            if(!card_number_valid || !card_zip_valid || !card_cvv_valid){
                form_valid = false;
            }
        }
    }

    if(!form_valid){
        if(!name_valid){
            let name_error = document.createElement('h5');
            name_error.innerText = "Please enter your name."
            error_box.appendChild(name_error);
        }
        if(!email_valid){
            let email_error = document.createElement('h5');
            email_error.innerText = "Please enter a valid email address."
            error_box.appendChild(email_error);
        }
        if(!job_valid){
            let job_error = document.createElement('h5');
            job_error.innerText = "Please enter a job title."
            error_box.appendChild(job_error);
        }
        if(!tshirt_valid){
            let tshirt_error = document.createElement('h5');
            tshirt_error.innerText = "Please choose a t-shirt style."
            error_box.appendChild(tshirt_error);
        }
        if(!registered_for_activities){
            let registered_error = document.createElement('h5');
            registered_error.innerText = "Please register for an activity."
            error_box.appendChild(registered_error);
        }
        if(payment_element.value === "credit card"){
            if(!card_number_valid){
                let cn_error = document.createElement('h5');
                cn_error.innerText = "Please enter a valid 16 digit card number."
                error_box.appendChild(cn_error);
            }
            if(!card_zip_valid){
                let zip_error = document.createElement('h5');
                zip_error.innerText = "Please enter a valid 5 digit zip code."
                error_box.appendChild(zip_error);
            }
            if(!card_cvv_valid){
                let cvv_error = document.createElement('h5');
                cvv_error.innerText = "Please enter a valid 3 digit CVV security code number."
                error_box.appendChild(cvv_error);
            }
        }
        return false;
    }else{
        alert(`Thank you ${name_field.value}!  Your registration has been submitted successfully!`);
        return true;
    }
};

//****************************************************************************************************
//form functions *************************************************************************************
//****************************************************************************************************
//change job title function
function TitleChange() {
    if (jobTitle.value== 'other') {
        job_field.appendChild(jobDiv);
        job_valid = false
        let job_input = document.getElementById('other-title');

        job_input.style.border = "2px solid red";
        job_input.addEventListener('keyup',()=>{
            if (job_input.value===""){
                job_input.style.border = "2px solid red";
                job_valid = false;
            }else{
                job_input.style.border = "2px solid lightgreen";
                job_valid = true;
            }
        });
    }else{
        if (job_field.contains(jobDiv)){
            job_field.removeChild(jobDiv);
            job_valid = true;
        }
    }
}

//change t-shirt design function ********************************************************************
function DesignChange() {
    while (colorSelect.options.length){
        colorSelect.remove(0);
    }
    if (designSelect.value == 'js puns'){
        colorSelect.style.visibility = 'visible';
        colorLabel.style.visibility = 'visible';
        tshirt_valid = true;
        designSelect.style.border = '3px solid lightgreen';
        let colors = ["Cornflower Blue","Dark Slate Grey","Gold"];
        for(i=0;i<colors.length;i++){
            let color = document.createElement('option');
            color.text = colors[i];
            colorSelect.options.add(color,i);
        }
    }else if (designSelect.value == 'heart js'){
        colorSelect.style.visibility = 'visible';
        colorLabel.style.visibility = 'visible';
        tshirt_valid = true;
        designSelect.style.border = '3px solid lightgreen';
        let colors = ["Tomato","Steel Blue","Dim Grey"];
        for(i=0;i<colors.length;i++){
            let color = document.createElement('option');
            color.text = colors[i];
            colorSelect.options.add(color,i);
        }
    }else{
        colorSelect.options.add(colorDefault,0);
        colorSelect.style.visibility = 'hidden';
        colorLabel.style.visibility = 'hidden';
        tshirt_valid = false;
        designSelect.style.border = '3px solid red';
    }
}

//activity checkbox function ************************************************************************

function CheckBoxChange() {

    //reset all checkboxes and run total
    total = 0;
    for(i=0;i<checkboxes.length;i++){
        checkboxes[i].disabled = false;
        checkboxes[i].parentElement.style.textDecoration = "none";
        if(checkboxes[i].checked == true){
            total += parseInt(costs[i]);
        }
    }
    total_element.innerHTML = `Total: $${total}`;
    if(total > 0){
        reg_title.innerText = "Register for Activities";
        reg_title.style.color = 'black';
        registered_for_activities = true;
    }else{
        reg_title.innerText = "Please register for at least one activity.";
        reg_title.style.color = 'red';
        registered_for_activities = false;
    }
    //if time conflict, disable conflicting boxes
    for(i=1;i<checkboxes.length;i++){
        if(checkboxes[i].checked == true){
            for(j=1;j<checkboxes.length;j++){
                if(j!=i && dates[i] === dates[j]){
                    checkboxes[j].parentElement.style.textDecoration = "line-through";
                    checkboxes[j].disabled = true;
                    
                }
            }
        }
    }
}

//change payment function ***************************************************************************
function ChangePayment() {
    console.log(payment_element.value);
    //reset payment elements
    if (payment_field.contains(creditCard_element)){
        payment_field.removeChild(creditCard_element);
    }else if (payment_field.contains(bitcoin_element)){
        payment_field.removeChild(bitcoin_element);
    }else if (payment_field.contains(paypal_element)) {
        payment_field.removeChild(paypal_element);
    }

    if(payment_element.value === "credit card"){
        payment_field.appendChild(creditCard_element);
    }else if(payment_element.value === "paypal"){
        payment_field.appendChild(paypal_element);
    }else if(payment_element.value === "bitcoin"){
        payment_field.appendChild(bitcoin_element);
    }
}