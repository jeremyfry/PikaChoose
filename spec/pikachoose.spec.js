'use strict';
// Add the web component to the page
var link = document.createElement('link');
link.rel = 'import';
link.href = 'demo/pikachoose.html';
document.body.appendChild(link);

describe('PikaChoose', function() {
	var gallery;
	var image;
	beforeEach(function() {
		gallery = document.createElement('pikachoose-gallery');
		image = document.createElement('img');
		image.setAttribute('src', 'image');
		image.setAttribute('data-link', 'link');
		image.setAttribute('data-caption', 'caption');
	});

	afterEach(function(){
		if(document.querySelector('pikachoose-gallery')){
			document.body.removeChild(document.querySelector('pikachoose-gallery'));
		}
	});


	describe('Simple Dom Replacement', function() {
		it('should be able to make template replacements', function() {
			var fragment = document.createDocumentFragment();
			var div = document.createElement('div');
			div.setAttribute('class', '{{class-replace}}');
			fragment.appendChild(div);

			pikachoose.prototype.simpleDomReplacement(fragment, {
				'class-replace': 'replacementClass',
				'data-replace': 'replacementData'
			})

			expect(fragment.querySelector('div').getAttribute('class')).toBe('replacementClass');

			div.innerHTML = '{{content-replace}}';
			pikachoose.prototype.simpleDomReplacement(fragment, {
				'content-replace': 'replacementContent'
			})

			expect(fragment.querySelector('div').textContent).toBe('replacementContent');

		});
	});

	describe('Setup', function(){
		it('creates the appropriate dom elements', function(){
			var galleryClone = gallery.cloneNode();
			galleryClone.appendChild(image.cloneNode());
			galleryClone.appendChild(image.cloneNode());
			document.body.appendChild(galleryClone);

			expect(galleryClone.shadowRoot.querySelectorAll('pc-stage').length).toBe(1);
			expect(galleryClone.shadowRoot.querySelectorAll('pc-thumbnails').length).toBe(1);
			expect(galleryClone.shadowRoot.querySelectorAll('pc-thumbnail').length).toBe(2);
		});

		it('fills in the main image settings', function(){
			var galleryClone = gallery.cloneNode();
			galleryClone.appendChild(image.cloneNode());
			document.body.appendChild(galleryClone);

			var mainImage = galleryClone.shadowRoot.querySelector('pc-stage figure');
			expect(mainImage.querySelector('img').getAttribute('src')).toBe('image');
			expect(mainImage.querySelector('a').getAttribute('href')).toBe('link');
			expect(mainImage.querySelector('figcaption').textContent).toBe('caption');
		});
	});

	describe('Functionality', function(){
		it('can be manipulated with custom events', function(){
			var galleryClone = gallery.cloneNode();
			galleryClone.appendChild(image.cloneNode());
			image.setAttribute('src', 'image2');
			galleryClone.appendChild(image.cloneNode());
			document.body.appendChild(galleryClone);

			expect(galleryClone.activeImage).toBe(0);
			galleryClone.dispatchEvent(new CustomEvent('forward'));
			expect(galleryClone.activeImage).toBe(1);

			galleryClone.dispatchEvent(new CustomEvent('backward'));
			expect(galleryClone.activeImage).toBe(0);
		});
	});
});