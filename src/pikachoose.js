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
					linkTarget: image.getAttribute('data-link-target') || 'self'
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

	pikachoosePrototype.attachedCallback = function() {
		var swipeEvent = "";
		var input = this.shadowRoot.querySelector('pc-stage');
		input.addEventListener(swipeEvent, function(){});
	};

	pikachoosePrototype.detachedCallback = function() {
	};

	window.pikachoose = ownerDocument.registerElement('pikachoose-gallery', {
		prototype: pikachoosePrototype
	});
})(window, document);
