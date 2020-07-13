window.onload = function(){
 // Buttons
 var quickAddBtn = document.getElementById('QuickAdd');
 var quickAddFormDiv = document.querySelector('.quickaddForm')
 var cancelBtn = document.getElementById('Cancel');
 var AddBtn = document.getElementById('Add');
 // Form Fields
 var fullname = document.getElementById('fullname');
 var mail = document.getElementById('mail');
  var pswrd = document.getElementById('pswrd');

 var cpswrd = document.getElementById('cpswrd');

 // Divs etc.
 var addBookDiv = document.querySelector('.addbook');
 quickAddBtn.addEventListener("click", function(){
 // display the form div
 quickAddFormDiv.style.display = "block";
 });
 cancelBtn.addEventListener("click", function(){
 quickAddFormDiv.style.display = "none";
 });
 AddBtn.addEventListener("click", addToBook);
 addBookDiv.addEventListener("click", removeEntry);
 // Storage Array
 var addressBook = [];
 //localStorage['addbook'] = '[{"fullname":"Vasavi G","mail":"vasavi@gmail.com","pswrd":"vasavi","cpswrd":"vasavi"}]';
 function jsonStructure(fullname,mail,pswrd,cpswrd){
 this.fullname = fullname;
 this.mail = mail;
  this.pswrd = pswrd;
 this.cpswrd = cpswrd;

 }
 function addToBook(){
 var isNull = fullname.value!='' && mail.value!=''&&pswrd.value!=''&&cpswrd.value!='' ;
 if(isNull){
 // format the input into a valid JSON structure
 var obj = new jsonStructure(fullname.value,mail.value,pswrd.value,cpswrd.value);
 addressBook.push(obj);
 localStorage['addbook'] = JSON.stringify(addressBook);
 quickAddFormDiv.style.display = "none";
 clearForm();
 showAddressBook();
 }
 }
 function removeEntry(e){
 // Remove an entry from the addressbook
 if(e.target.classList.contains('delbutton')){
 var remID = e.target.getAttribute('data-id');
 addressBook.splice(remID,1);
 localStorage['addbook'] = JSON.stringify(addressBook);
 showAddressBook();
 }
 }
 function clearForm(){
 var formFields = document.querySelectorAll('.formFields');
 for(var i in formFields){
 formFields[i].value = '';
 }
 }
 function showAddressBook(){
 if(localStorage['addbook'] === undefined){
 localStorage['addbook'] = '';
 } else {
 addressBook = JSON.parse(localStorage['addbook']);
 // Loop over the array addressBook and insert into the page
 addBookDiv.innerHTML = '';
 for(var n in addressBook){
 var str = '<div class="entry">';
 str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
 str += '<div class="mail"><p>' + addressBook[n].mail + '</p></div>';
  //str += '<div class="pswrd"><p>' + addressBook[n].pswrd + '</p></div>';
 //str += '<div class="cpswrd"><p>' + addressBook[n].cpswrd + '</p></div>';

 str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
 str += '</div>';
 addBookDiv.innerHTML += str;
 }
 }
 }
 showAddressBook();
}