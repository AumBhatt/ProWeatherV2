var installBtn = document.querySelector('.installBtn');
var loader = document.querySelector('.loader');
var installed = document.querySelector('.installed');

var deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
});

installBtn.addEventListener('click', function(){
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        document.querySelector('.startInstall').style.display = "none";
        loader.style.display = "flex";
        } else {
        console.log('User dismissed the install prompt');
        }
    });
});

window.addEventListener('appinstalled', (evt) => {
  // Log install to analytics
  console.log('INSTALL: Success');
  setTimeout(function(){
    loader.style.display = "none";
    installed.style.display = "flex";
    installed.style.animationName = "installed";
  } ,4500);
});