'use strict';
((window, document, undefined) => {
	var ownerDocument = (document._currentScript || document.currentScript).ownerDocument;

	// Define custom elements used in templates
	ownerDocument.registerElement('pc-stage');
	ownerDocument.registerElement('pc-thumbnails');

	// Gather templates
	var template = ownerDocument.querySelector('template#main').content;
	var thumbnailTemplate = ownerDocument.querySelector('template#thumbnail').content;
	var mainImageTemplate = ownerDocument.querySelector('template#mainImage').content;

	// Create proto
	var pikachoosePrototype = Object.create(HTMLElement.prototype);

	// Cheap template replacement
	var simpleDomReplacement = function(template, replacements) {
		var replacementKeys = Object.keys(replacements);
		[].forEach.call(template.querySelectorAll('*'), function(element){
			for(let j = 0; j < element.attributes.length; j++){
				let attributeValue = element.attributes[j].value.substring(2, element.attributes[j].value.length -2);
				if(replacementKeys.indexOf(attributeValue) !== -1){
					element.setAttribute(element.attributes[j].name, replacements[attributeValue]);
				}
			}

			let textContent = element.innerHTML.trim();
			textContent = textContent.substring(2, textContent.length -2);
			if(replacementKeys.indexOf(textContent) !== -1){
				element.innerHTML = replacements[textContent];
			}
		});
	};

	pikachoosePrototype.createdCallback = function() {
		this.originalImages = this.querySelectorAll('img');
		this.innerHTML = '';
		this.activeImage = 0;

		this.shadowRoot = this.createShadowRoot();
		this.shadowRoot.appendChild(document.importNode(template, true));
		this.thumbnailContainer = this.shadowRoot.querySelector('pc-thumbnails');
		this.stageContianer = this.shadowRoot.querySelector('pc-stage');

		this.initialize();
	};

	pikachoosePrototype.initialize = function(){
		// Determine if the user had embedded the elements or will be passing in data
		if(this.originalImages.length){
			for(let j = 0; j < this.originalImages.length; j++){
				let image = this.originalImages[j];
				this.addThumbnail({
					source: image.getAttribute('data-thumbnail-src') || image.getAttribute('src')
				});
				this.addGalleryItem({
					source: image.getAttribute('src') || '',
					link: image.getAttribute('data-link') || '',
					caption: image.getAttribute('data-caption') || '',
					title: image.getAttribute('title') || '',
					linkTarget: image.getAttribute('data-link-target') || '_self'
				});
			}
		}
	}

	pikachoosePrototype.addThumbnail = function(source){
		var cloneNode = thumbnailTemplate.cloneNode(true);
		simpleDomReplacement(cloneNode, source);
		this.thumbnailContainer.appendChild(cloneNode);
	}

	pikachoosePrototype.addGalleryItem = function(replacements){
		var cloneNode = mainImageTemplate.cloneNode(true);
		simpleDomReplacement(cloneNode, replacements);
		this.stageContianer.appendChild(cloneNode);
	}

	pikachoosePrototype.forward = function(){
		this.setActiveImage(this.activeImage+1);
	}

	pikachoosePrototype.backward = function(){
		this.setActiveImage(this.activeImage-1);
	}

	pikachoosePrototype.setActiveImage = function(position){
		this.activeImage = position;
		if(this.activeImage < 0){
			this.activeImage = this.originalImages.length -1
		}
		if(this.activeImage > this.originalImages.length -1){
			this.activeImage = 0;
		}
		this.updateDisplay();
	}

	pikachoosePrototype.sizeImages = function(){
		var clientWidth = this.clientWidth;
		// Regrabbing images since I plan to add the option
		[].forEach.call(this.stageContianer.querySelectorAll('figure'), function(element){
			element.style.width = clientWidth+'px';
		});
	}

	pikachoosePrototype.updateDisplay = function(){
		this.setLeft(this.stageContianer, -(this.activeImage*this.clientWidth));
		this.stageContianer.style.width = this.originalImages.length * this.clientWidth + 'px';
	}

	pikachoosePrototype.attachedCallback = function() {
		// Hack to allow the correct width to get returned
		setTimeout(function(event) {
			this.updateDisplay();
		}.bind(this), 0);

		this.addEventListener('forward', this.forward.bind(this));
		this.addEventListener('backward', this.backward.bind(this));
		this.shadowRoot.querySelector('pc-stage').addEventListener('click', this.forward.bind(this));

		this.shadowRoot.querySelector('pc-thumbnails').addEventListener('click', function(e){
			var element = e.target;
			if(e.target.nodeName === 'IMG'){
				element = e.target.parentNode;
			}
			this.setActiveImage([].indexOf.call(
				this.shadowRoot.querySelectorAll('pc-thumbnail'),
				element
			));
		}.bind(this));
	};

	pikachoosePrototype.setLeft = function(element, left){
		// TODO: more prefixes!
		element.style.transform = 'translateX('+ left +'px)';
	}

	window.pikachoose = ownerDocument.registerElement('pikachoose-gallery', {
		prototype: pikachoosePrototype
	});
})(window, document);
