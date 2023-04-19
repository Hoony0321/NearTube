document.addEventListener('DOMContentLoaded', () => {
    // Load the saved state of the pop-up window from chrome.storage
    chrome.storage.local.get(['popupState'], (result) => {
        console.log(result);
        if (result.popupState) {
            if(result.popupState.status === 'loggedin') {
                document.getElementById('email').textContent = result.popupState.email;
                document.getElementById('email').style.display = "block";
                document.getElementById('successMessage').style.display = "block";
                document.getElementById('loginMessage').style.display = "none";
                document.getElementById('loginBtn').style.display = 'none';
            }
        }
    });
});

document.getElementById('loginBtn').addEventListener('click', () => {
    chrome.identity.getAuthToken({interactive: true}, async (token) => {
        if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
            return;
        }
  
        // Use the token to make requests to Google APIs
      
        // Get the user's email address
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        // Update the pop-up page with the user's email address
        // Save the state of the pop-up window to chrome.storage
        chrome.storage.local.set({
            popupState: {
              status: 'loggedin',
              email : data.email
            }
          });

        document.getElementById('email').textContent = data.email;
        document.getElementById('email').style.display = "block";
        document.getElementById('successMessage').style.display = "block";

        document.getElementById('loginMessage').style.display = "none";
        document.getElementById('loginBtn').style.display = 'none';
  
        await chrome.runtime.sendMessage({type: 'loggedin'});
        // window.close();
    });
  });
  