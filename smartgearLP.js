$(function(){
	if ($('body').hasClass('landingpage')) {
		var header = $('.headerFW').headerFW('get');
		header.$el.find('a').add('.goto').on('click',function(e){
			e.preventDefault();
			var target = document.querySelector(this.getAttribute('href'));
			if (target) {
				if ($(target).innerHeight()<viewport.height)
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

	    $('html').css('scroll-padding',header.$el.outerHeight());


	    // EVENTS MATOMO
		header.$el.find('a').on('click',function(){
			console.log('trackEvent Navigation '+this.innerText); 
			_paq.push(['trackEvent', 'Navigation', 'Click', this.innerText]); 
		})
		$('.mod_article:first-of-type .heroFW:first-of-type a.goto').on('click',function(){
			console.log('trackEvent Navigation Hero - Le Produit'); 
			_paq.push(['trackEvent', 'Navigation', 'Click', 'Hero - Le Produit']); 
		})
		$('.sliderFW.ce_rsce_tabs\\+\\+ .sliderFW__nav__item ').on('click',function(){
			if (typeof _paq != 'undefined'){
				console.log('trackEvent Navigation '+this.innerText); 
				_paq.push(['trackEvent', 'Navigation', 'Click', this.innerText]); 
			}
		});
		// $('input[name=email]').on('blur',function(){
		// 	if (this.value != '') {
		// 		console.log('trackEvent Contact '+ this.value); 
		// 		_paq.push(['trackEvent', 'Contact', 'Fill', 'Email',this.value]); 
		// 	}
		// });
		$('input[name=consent_newsletter]').on('change',function(){
			console.log('trackEvent Contact '+ $(this).isChecked()); 
			_paq.push(['trackEvent', 'Contact', 'Fill', 'Newsletter',$(this).isChecked()]); 
		});
		$('#contact form [type=submit]').on('click',function(){
			_paq.push(['trackEvent', 'Contact', 'Click', 'sendContact']); 
		})
	}

	$('.sliderFW.ce_rsce_tabs\\+\\+ .tab__picture.multiple').each(function(){
		var $wrapper = $(this);
		setInterval(function(){
			var current = $wrapper.find('img.active');
			var next = current.next('img').length ? current.next('img') : $wrapper.find('img').first();
			current.add(next).toggleClass('active');
		},8000)
	});
	$('.sliderFW.ce_rsce_tabs\\+\\+').each(function(){
		var slider = $(this).sliderFW('get');
		var nav = slider.$nav.get(0);
		var isDown = false;
		var startX;
		var scrollLeft;
		var clickHandler = function(){
			var item = this;
			slider.$nav.animate({scrollLeft: item.offsetLeft-(slider.$nav.outerWidth()/2)+(item.offsetWidth/2)}, 1000,'swing')
		};

		slider.$nav.find('.sliderFW__nav__item').on('click', clickHandler);
		nav.addEventListener('mousedown', (e) => {
		  isDown = true;
		  nav.classList.add('dragged');
		  startX = e.pageX - nav.offsetLeft;
		  scrollLeft = nav.scrollLeft;
		});
		nav.addEventListener('mouseleave', () => {
		  isDown = false;
		  nav.classList.remove('dragged');
		});
		nav.addEventListener('mouseup', () => {
		  isDown = false;
		  nav.classList.remove('dragged');
		});
		nav.addEventListener('mousemove', (e) => {
		  if(!isDown) return;
		  e.preventDefault();
		  const x = e.pageX - nav.offsetLeft;
		  const walk = (x - startX) * 1; //scroll-fast
		  nav.scrollLeft = scrollLeft - walk;
		  // console.log(walk);
		});
	});



	$('.blob').each(function(i,el){
		// generateBlob(el);
		if (el.className.includes('animate')){
			var delay = getComputedStyle(el).transitionDuration.replace('s','') * 1000 * 2;
			setTimeout(function(){
				setInterval(function(){generateBlob(el)},delay);
			},1500*i)
		}
	});

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