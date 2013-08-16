(function(F){"function"==typeof define&&define.amd?define(["backbone","underscore"],F):"object"==typeof exports?module.exports=F(require("backbone"),require("underscore")):F(window.Backbone,window._)})(function(F,u){"use strict";var t=F.Validator={version:"0.2.2",validate:function(F,t,e){var n={};return u.chain(F).each(function(F,i){var a=t[i],r=this._validateAll(a,i,F,e);r.length&&(n[i]=u.uniq(r))},this),u.size(n)?n:null},_validateAll:function(F,t,e,n){return n=n||this,u.inject(u.flatten([F||[]]),function(F,i){return u.chain(i).omit("message").each(function(r,d){var s=this._validators[d];if(!s)throw Error("Missed validator: "+d);var o=s.fn.apply(n,[e,r]);if(o!==!0){var l=i.message||o||a(t,e,r,d,n)||s.message||"Invalid";u.isFunction(l)&&(l=l.apply(n,[t,e,r,d])),F.push(l)}},this),F},[],this)},add:function(F,u,t){this._validators[F]={fn:u,message:t}},_validators:{}};t.Extensions={View:{bindValidation:function(F,e){if(F=F||this.model,!F)throw"Model is not provided";this.listenTo(F,"validated",function(F,n,i){var a=u.extend({},t.ViewCallbacks,u.pick(this,"onInvalidField","onValidField"),e);i=i||{},u.each(n,function(u,t){var e=i[t];e&&e.length?a.onInvalidField.call(this,t,u,e,F):a.onValidField.call(this,t,u,F)},this)})}},Model:{validate:function(F,e){var i=u.result(this,"validation")||{},a=n(this,F),r=t.validate(a,i,this);return e=e||{},e.silent||u.defer(u.bind(this.triggerValidated,this),a,r),e&&e.suppress?null:r},_validate:function(F,t){if(!t.validate||!this.validate)return!0;var e=n(this,F),i=this.validationError=this.validate(e,t)||null;return i&&this.trigger("invalid",this,i,u.extend(t||{},{validationError:i})),!i},triggerValidated:function(F,u){var t=n(this,F),e=i(u);this.validationError=e,this.trigger("validated",this,t,e),this.trigger("validated:"+(e?"invalid":"valid"),this,t,e)},isValid:function(F,u){var t=n(this,F);return!this.validate||!this.validate(t,u)}}};var e=function(F,t){return u.inject(u.flatten([t]),function(u,t){return u[t]=F[t],u},{})},n=function(F,t){var n,i,a=F.attributes,r=u.result(F,"validation");return u.isArray(t)||u.isString(t)?n=e(a,t):t?n=t:(i=u.extend({},a,r||{}),n=e(a,u.keys(i))),n},i=function(F){var t=u.inject(F,function(F,u,t){return u.length&&(F[t]=u),F},{});return u.size(t)?t:null},a=function(){return t.createMessage?t.createMessage.apply(null,arguments):!1};t.ViewCallbacks={onValidField:function(F){var u=this.$('input[name="'+F+'"]');u.removeClass("error"),u.next(".error-text").remove()},onInvalidField:function(F,u,t){var e=this.$('input[name="'+F+'"]');e.next(".error-text").remove(),e.addClass("error").after('<div class="error-text">'+t.join(", ")+"</div>")}};var r=[{name:"required",message:"Is required",fn:function(F,u){return u===!1||!!F}},{name:"blank",message:"Could not be blank",fn:function(F,t){return t===!0?!0:u.isString(F)?!F.match(/^[\s\t\r\n]*$/):u.isArray(F)?!!F.length:u.isObject(F)?!u.isEmpty(F):!!F}},{name:"collection",fn:function(F,t){if(t===!1)return!0;var e=u.inject(F.models||F,function(F,u,t){var e=u.validate();return e&&F.push([t,e]),F},[]);return e.length?e:!0}},{name:"minLength",message:"Is too short",fn:function(F,u){return!F||F.length>=u}},{name:"maxLength",message:"Is too long",fn:function(F,u){return!F||u>=F.length}},{name:"format",message:"Does not match format",fn:function(F,u){return!F||!!F.match(t.formats[u]||u)}},{name:"fn",fn:function(F,u){return u.call(this,F)}}];return t.formats={digits:/^\d+$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},u.each(r,function(F){t.add(F.name,F.fn,F.message)}),u.extend(F.Model.prototype,t.Extensions.Model),u.extend(F.View.prototype,t.Extensions.View),t});