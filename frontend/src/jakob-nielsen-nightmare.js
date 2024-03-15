let jakobNielsenNightmareActive = false;

export function toggleNightmare(){
    jakobNielsenNightmareActive = !jakobNielsenNightmareActive;
    console.log('set Jakob Nielsen’s Nightmare on(true)/off(false)', jakobNielsenNightmareActive)

    var body = document.getElementsByTagName('body')[0]
    body.classList.toggle('jakobNielsenNightmareActive');

    var allElementsToFuckUp = document.querySelectorAll('textarea,input,button,a');

    if(jakobNielsenNightmareActive){
        allElementsToFuckUp.forEach((element) => {
            element.tabIndex = "-1";
        });
    } else {
        allElementsToFuckUp.forEach((element) => {
            element.tabIndex = "";
        });
    }
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
docReady(function() {
    // DOM is loaded and ready for manipulation here
});




