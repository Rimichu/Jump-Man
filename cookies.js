function setcookie(name, value){
    document.cookie = name+"="+value+";";

}
function getCookie(cname) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      var cookiesplit = c.split("=")
      if(cookiesplit[0] == cname || cookiesplit[0] == " " + cname){
          return(cookiesplit[1])
      }
    }
    return "";
  }