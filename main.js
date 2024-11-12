//Service Worker

if('serviceWorker'in navigator){

    console.log('si tiene sw');

    navigator.serviceWorker.register('./sw.js')
                            .then(res=> console.log('serviceWorker cargado correctamente',res))
                            .catch(err=> console.log('serviceWorker no se pudo registrar',err));
}           
else{
    console.log('no se localiza');
}

/*
//Scroll
$(document).redy(function()
{
    $("#menu a").click(function(e)
    {
        e.preventDefault();
        $("html,body").animate(
        {
            scrollTop: $($(this).attr('href')).offset().top

        });
        
        return false,

    })

});
*/
