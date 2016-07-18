define(function(require, exports, module){
	var $ = require('jquery');
	var tools = require('dtools');
	var Tmpl = require('template');

	var tmpl = new Tmpl(require('text!./view/popbox.tmpl'));

	var div = tools.$c('div');

	document.body.appendChild(div);


	var cover = $('.cover');
	if(cover.length == 0){
		cover = div.cloneNode();
		cover.className = 'cover';
		document.body.appendChild(cover);
		cover = $(cover);
	}

	var PopBox = function(options){
		this._initPopBox(options);
	};

	PopBox.prototype = {
		_initPopBox: function(options){
			this.options = tools.mix({
				title: '提醒',
				content: '',
				cancelTxt: '取消',
				confirmTxt: '兑换',
				cancelCallback: null,
				confirmCallback: null,
				template: null,
				customProperties: {}//模板自定义属性
			}, options);


			this.container = div.cloneNode();
			this.panel = $(this.container);
			this.initStatus = false;
			this.lockScroll = false;

			this.panel.hide();
			if(this.options.template == null){
				this.options.template = tmpl;
			}
			this.container.innerHTML = this.options.template.render(tools.mix({
				title: this.options.title,
				content: this.options.content,
				cancelTxt: this.options.cancelTxt,
				confirmTxt: this.options.confirmTxt
			}, this.options.customProperties));

			document.body.appendChild(this.container);
			// this.show();
			this._initEvents();
		},
		initOpitions: function(options){
			this.options = tools.mix(this.options, options);
		},
		_initEvents: function(){
			var self = this;

			$(this.container).on('click', '.btn-close', function(){
				self.options.closeCallback && self.options.closeCallback.call(self);
				self.hide();
			});

		},

		show: function(options){
			if(arguments.length > 0){
				this.options = tools.mix(this.options, options);
				this.container.innerHTML = this.options.template.render(tools.mix({
					title: this.options.title,
					content: this.options.content,
					cancelTxt: this.options.cancelTxt,
					confirmTxt: this.options.confirmTxt
				}, this.options.customProperties));
			}
			this.panel.show();
			cover.show();
			this.lockScroll = true;
		},

		hide: function(){
			this.container.style.display = 'none';
			this.lockScroll = false;
			cover.hide();
		}
	};

	module.exports = PopBox;

});