define(function(require, exports, module){
	var $ = require('jquery');
	var tools = require('comp/tools');
	var Tmpl = require('comp/template');
	var PopBox = require('./popbox');

	var tmpl = new Tmpl(require('text!./view/alert.tmpl'));

	var div = document.createElement('div');

	var AlertBox = function(options){
		this._initAlertBox(options);
	};

	AlertBox.prototype = {
		_initAlertBox: function(options){
			this.options = tools.mix({
				title: '兑换失败，请稍后再试。',
				confirmTxt: '我知道了',
				confirmCallback: null,
				template: tmpl,
                autoshow: true
			}, options);

			PopBox.call(this, this.options);
			
			this.options.autoshow && this.show();
		},

		_initEvents: function(){
			AlertBox.parent._initEvents.call(this);
			var self = this;
			$(this.container).on('click', '.btn-confirm', function(){
				self.options.confirmCallback && self.options.confirmCallback.call(self);
				self.hide();
			});
		},

		show: function(options){
			if(typeof options === 'string'){
				options = {
					content: options
				};
			}
			AlertBox.parent.show.call(this, options);
		}
	};
	
	tools.extend(AlertBox, PopBox);

	module.exports = AlertBox;
});