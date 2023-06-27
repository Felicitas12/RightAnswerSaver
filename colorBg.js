var enabledBox = document.getElementById('switch');
 
function onclick(e){
    var printBlock = document.getElementById("printBlock");
    var enabled = e.target.checked;
    if(enabled){
        $('#page-my-index').css({'background': 'linear-gradient(149deg, rgba(24,187,156,1) 0%, rgba(106,57,175,1) 42%, rgba(187,24,148,1) 72%, rgba(115,53,134,1) 100%)', 'animation': 'gradient 10s infinite linear' , 'background-size':'400%'});
    }
    printBlock.textContent = enabled;
}
 
//enabledBox.addEventListener("click", onclick);