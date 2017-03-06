// Insert the message to display
var message = "This website uses cookie, are you agree?";
// Insert the Url with cookies description
var coockieUrl = "cookie.html";
// Insert number of days for the cookie life
var cookieLife = 60;
// Event that triggers checkCookie(), to active extra feature give a value to the parameters
document.body.addEventListener("load", checkCookie(null, null));

// This function checks if there is already the cookie/s and stores it/s name/s
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

// Check if cookie_yes exists, otherwise creates the banner
function checkCookie(anchor, scroll) {

    if (!getCookie("cookie_yes")) {

        // Create button "Yes" with text
        var newbutton1 = document.createElement("button");
        newbutton1.setAttribute("id","yes");
        newbutton1.setAttribute("onclick","cookieYes()");
        var textButton1 = document.createTextNode("Yes");
        newbutton1.appendChild(textButton1);

        // Create button "More Info" with text
        var newbutton2 = document.createElement("button");
        newbutton2.setAttribute("id","no");
        newbutton2.setAttribute("onclick","cookieNo()");
        var textButton2 = document.createTextNode("More Info");
        newbutton2.appendChild(textButton2);

        // Create p with message
        var newp = document.createElement("p");
        var text = document.createTextNode(message);
        newp.appendChild(text);

        // Create banner
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id","cookie-banner");
        newp.appendChild(newbutton1);
        newp.appendChild(newbutton2);
        newdiv.appendChild(newp);
        document.body.appendChild(newdiv);

        // EXTRA FEATURES
        // Acceptance of cookie law with a click in every "a" tag
        if (anchor) {
            var a = document.getElementsByTagName("a");
            for(var i = 0; i < a.length; i++) {
                a[i].setAttribute("onclick","cookieYes(cookieLife)");
            }
        }
        // Acceptance of cookie law with the scroll of the page
        if (scroll) {
            document.body.setAttribute("onscroll","cookieYes(cookieLife)");
        }
    }
}

// Function cookieYes() that installs the cookie
function cookieYes(cookieLife) {
    var d = new Date();
    d.setTime(d.getTime() + (cookieLife * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "cookie_yes=yes; " + expires + "; path=/";
    document.getElementById("cookie-banner").style.display = "none";
}

// Function cookieNo() that opens the cookie page
function cookieNo() {
    location.href = coockieUrl;
}
