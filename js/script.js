var scroll = new SmoothScroll('a[href*="#"]',{
    offset: 66
});

$('.background').flowtype({
    minimum: 200,
    maximum: 600,

});

$('#myNavbar').flowtype({
    minimum: 200,
    maximum: 1980,
    minFont: 16,
    maxFont: 24
});

$('#myNavbar li a').click(e => $('#myNavbar').collapse('hide'));