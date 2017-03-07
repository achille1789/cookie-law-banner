// Insert the message to display
var message = "This website uses cookie, are you agree?";
// Insert the Url with the page cookies description
var coockieUrl = "cookie.html";
// Insert number of days until the cookie expires
var cookieLife = 60;
// Text of buttons
var btnYes = "Yes, I agree";
var btnNo = "No, give me more info";
// Add banner to the top or bottom of the page
var position = true;    // Default is bottom
// To active extra feature give true
var anchor = false;    // User accept when a link is clicked
var scroll = false;    // User accept when the page is scrolled

// Event that triggers the cookie banner
document.body.addEventListener("load", checkCookie());

// This function checks if the user has already accepted the cookies
function getCookie() {
    var name = "cookie_yes" + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

// If cookie has not been accept, show banner
function checkCookie() {

    if (!getCookie()) {

        // Create button "Yes" with text
        var newbutton1 = document.createElement("button");
        newbutton1.setAttribute("id","yes");
        newbutton1.setAttribute("onclick","cookieYes()");
        var textButton1 = document.createTextNode(btnYes);
        newbutton1.appendChild(textButton1);

        // Create button "More Info" with text
        var newbutton2 = document.createElement("button");
        newbutton2.setAttribute("id","no");
        newbutton2.setAttribute("onclick","cookieNo()");
        var textButton2 = document.createTextNode(btnNo);
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

        if (position) {
            document.body.appendChild(newdiv);
            document.getElementById("cookie-banner").style.bottom = 0;
            document.getElementById("cookie-banner").style.position = "fixed";
        } else {
            document.body.insertBefore(newdiv, document.body.childNodes[0]);
            document.getElementById("cookie-banner").style.top = 0;
        }

        // EXTRA FEATURES
        // Acceptance of cookie law with a click in every "a" tag
        if (anchor) {
            var a = document.getElementsByTagName("a");
            for(var i = 0; i < a.length; i++) {
                a[i].setAttribute("onclick","cookieYes()");
            }
        }
        // Acceptance of cookie law with the scroll of the page
        if (scroll) {
            document.body.setAttribute("onscroll","cookieYes()");
        }
    }
}

// Function cookieYes() that installs the cookie
function cookieYes() {
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
