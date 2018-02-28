var scroll = new SmoothScroll('a[href*="#"]',{
    offset: 66
});

$('.background').flowtype({
    minimum: 200,
    maximum: 600,

});

$('.social').flowtype({
    minimum: 500,
    maximum: 1980,
    minFont: 20,
    maxFont: 100
});

$('#myNavbar').flowtype({
    minimum: 200,
    maximum: 1980,
    minFont: 16,
    maxFont: 24
});

$('#myNavbar a').click(e => $('#myNavbar').collapse('hide'));