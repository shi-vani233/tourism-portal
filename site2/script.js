function validate() 
{
  var name=document.forms["signform"]["Username"]; 
  var p1=document.forms["signform"]["Password"];  
  var p2=document.forms["signform"]["RePassword"]; 
  var phone=document.forms["signform"]["Phone Number"];
  var email=document.forms["signform"]["Email address"];
  var phonrex=/[7-9]\d{9}/;
  var emailrex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(name.value.length<1)
  {
    document.getElementById("nam").innerHTML="enter the name please!"; 
      return false;  
  }
  if(p1.value.length<6)
  {
    document.getElementById("pass").innerHTML="password length should be minimum 6"; 
      return false;  
  }
  if(p1.value!=p2.value)
  {
    document.getElementById("pass").innerHTML="password and re-password must be same."; 
            return false;  
   
  }
  if(!(phonrex.test(phone.value)))
  {
    document.getElementById("pn").innerHTML="Please enter mobile number of length 10!!!"; 
            return false;  
      
  }
  if(!(emailrex.test(email.value)))
  {
    document.getElementById("em").innerHTML="Please enter valid email ID!!"; 
            return false;  
  }
  alert("succesfully registered,now go for login!!");
   return true;
   
}

function logvalidate()
{
  var name=document.forms["logform"]["Username"]; 
  var p1=document.forms["logform"]["Password"];  
  if(name.value.length<1)
  {
    document.getElementById("nam").innerHTML="Enter the name please!!"; 
      return false;  
  }
  if(p1.value.length<1)
  {
    document.getElementById("pass").innerHTML="Enter the password please!!"; 
      return false;  
  }
}


function mysearch()
{
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("places");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}