var sectionScrolling = function() {

	// var options = {
	// 	// root: document.querySelector("#scrollArea"),
	// 	// rootMargin: "0px",
	// 	threshold: 0,
	// 	// rootMargin: "0px 0px ${window.innerHeight / 2}px 0px"
	// };

	var winHeight = window.innerHeight;

	var sections = document.querySelectorAll('.section');

	var observer = new IntersectionObserver(function(entries, observer){

		winHeight = window.innerHeight;

		entries.forEach(function(entry) {


			if(entry.isIntersecting){
				entry.target.classList.add('vis');
			}
			else{
				entry.target.classList.remove('vis');

			}
		});

	},
	{
		// root: document.querySelector("#scrollArea"),
		// rootMargin: "0px",
		threshold: 0,
		rootMargin: '-' + winHeight/2 + 'px 0px -' + winHeight/2 + 'px 0px'
	});

	sections.forEach(function(el) {
		// console.log(el);
		observer.observe(el);
	});
};

sectionScrolling();


var makeParticle = function() {
	var el = document.querySelector('.particles');
	var dot = document.createElement('span');
	dot.className = 'dot';

	dot.style.top = ((Math.floor(Math.random() * 100) + 1) / 2) + '%';
	dot.style.left = Math.floor(Math.random() * 100) + 1 + '%';

	var dotSize = Math.floor(Math.random() * 20) + 5;
	dot.style.width = dotSize;
	dot.style.height = dotSize;

	el.appendChild(dot);
	
	setTimeout(function() {
		el.removeChild(dot);
	}, 900);

	doParticles();
};

var doParticles = function() {
	setTimeout(function() {
		makeParticle();
	}, 100);
};

doParticles();


var accordion = function() {

	var items = document.querySelectorAll(".accordion-item");

	items.forEach(function(item) {
		item.addEventListener("click", function(event){
			item.classList.toggle('vis');

			var thisItem = item;
			
			items.forEach(function(el) {
				// console.log(el, thisItem);
				if(el !== thisItem){
					el.classList.remove('vis');
				}
			});

		});
	});

};
accordion();


var hoverTransform = function() {
	let constrain = 20;
	let mouseOverContainer = document.getElementById('rot-container');
	let ex1Layer = document.getElementById('rot-layer');

	function transforms(x, y, el) {
	  let box = el.getBoundingClientRect();
	  let calcX = -(y - box.y - (box.height / 2)) / constrain;
	  let calcY = (x - box.x - (box.width / 2)) / constrain;
	  
	  return "perspective(1000px) "
	    + "   rotateX("+ (-calcX) +"deg) "
	    + "   rotateY("+ (-calcY) +"deg) ";
	};

	 function transformElement(el, xyEl) {
	  el.style.transform  = transforms.apply(null, xyEl);
	}

	mouseOverContainer.onmousemove = function(e) {
	  let xy = [e.clientX, e.clientY];
	  let position = xy.concat([ex1Layer]);

	  window.requestAnimationFrame(function(){
	    transformElement(ex1Layer, position);
	  });
	};
}
hoverTransform();