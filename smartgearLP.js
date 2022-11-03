$(function(){
	var header = $('.headerFW').headerFW('get');
	header.$el.find('a').add('.goto').on('click',function(e){
		e.preventDefault();
		var target = document.querySelector(this.getAttribute('href'));
		if (target) {
			if ($(target).innerHeight()<=viewport.height)
				target.scrollIntoView({behavior: "smooth", block: 'start', inline: "nearest"});
			else {
				target.scrollIntoView({behavior: "smooth", block: 'start', inline: "nearest"});
			}

		}
	});

	header.$logo.on('click',function(e){
		e.preventDefault();
		document.getElementById('wrapper').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	});

	header.$navPanel.find('a').add(header.$logo).on('click',function(){
		if (header.$el.hasClass('is-open')) 
			header.$toggler.trigger('click');
	})

	// section scroll observer
    var section_obs = new IntersectionObserver(
        (entries, section_obs) => {
        	entries.forEach(entry => {
		        if(entry.isIntersecting) {
		          // console.log(entry.target);
		          if (header.$el.find('a[href="#'+entry.target.id+'"]').length) {
			          	header.$el.find('a').parent('li').removeClass('active');
			          	header.$el.find('a[href="#'+entry.target.id+'"]').parent('li').addClass('active');
			          	history.replaceState({}, "", "#"+entry.target.id)
		          }
		        }
		    });
        },
        { 
        	rootMargin: '0px',
    		threshold: 0.5 
    	}
    );
    document.querySelectorAll('.mod_article.snap').forEach((i) => {
    	if(i) section_obs.observe(i);
    });

    // $('.ce_rsce_tabs\\+\\+ .sliderFW__nav__item').on('click',function(){})

    $('html').css('scroll-padding',header.$el.outerHeight())

	$('.blob').each(function(i,el){
		// generateBlob(el);
		if (el.className.includes('animate')){
			var delay = getComputedStyle(el).transitionDuration.replace('s','') * 1000 * 2;
			setTimeout(function(){
				setInterval(function(){generateBlob(el)},delay);
			},1500*i)
		}
	})
});


function generateBlob(el) {
	const randMin = 25;
	const randMax = 75;
	const percentage1 = rand(randMin, randMax); // rand(25, 75)
	const percentage2 = rand(randMin, randMax); 
	const percentage3 = rand(randMin, randMax); 
	const percentage4 = rand(randMin, randMax); 
	var percentage11 = 100 - percentage1;
	var percentage21 = 100 - percentage2;
	var percentage31 = 100 - percentage3;
	var percentage41 = 100 - percentage4;
	var borderRadius = `${percentage1}% ${percentage11}% ${percentage21}% ${percentage2}% / ${percentage3}% ${percentage4}% ${percentage41}% ${percentage31}%`;
  	$(el).css("border-radius", borderRadius);
}
function rand(min,max){
	return Math.random() * (max - min) + min;
}