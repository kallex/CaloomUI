/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: *//**
 * Tabzilla global navigation for Mozilla projects
 *
 * This code is licensed under the Mozilla Public License 1.1.
 *
 * Event handling portions adapted from the YUI Event component used under
 * the following license:
 *
 *   Copyright © 2012 Yahoo! Inc. All rights reserved.
 *
 *   Redistribution and use of this software in source and binary forms,
 *   with or without modification, are permitted provided that the following conditions
 *   are met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   - Neither the name of Yahoo! Inc. nor the names of YUI's contributors may
 *     be used to endorse or promote products derived from this software
 *     without specific prior written permission of Yahoo! Inc.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 *   PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Portions adapted from the jQuery Easing plugin written by Robert Penner and
 * used under the following license:
 *
 *   Copyright 2001 Robert Penner
 *   All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following conditions are
 *   met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   - Neither the name of the author nor the names of contributors may be
 *     used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 *   PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * @copyright 2012 silverorange Inc.
 * @license   http://www.mozilla.org/MPL/MPL-1.1.html Mozilla Public License 1.1
 * @author    Michael Gauthier <mike@silverorange.com>
 * @author    Steven Garrity <steven@silverorange.com>
 */function Tabzilla(){typeof jQuery!="undefined"&&jQuery?jQuery(document).ready(Tabzilla.init):Tabzilla.run()}Tabzilla.READY_POLL_INTERVAL=40;Tabzilla.readyInterval=null;Tabzilla.jQueryCDNSrc="//www.mozilla.org/media/js/libs/jquery-1.7.1.min.js";Tabzilla.LINK_TITLE={CLOSED:"Aalto University links",OPENED:"Close (Esc)"};Tabzilla.smallMode=!1;Tabzilla.hasMediaQueryWidths=function(){return!/MSIE\ (4|5|6|7|8)/.test(navigator.userAgent)}();Tabzilla.run=function(){var e=0,t=!1,n=navigator.userAgent,r=n.match(/AppleWebKit\/([^\s]*)/);if(r&&r[1])e=parseInt(r[1],10);else{r=n.match(/Opera[\s\/]([^\s]*)/);if(!r||!r[1]){r=n.match(/MSIE\s([^;]*)/);r&&r[1]&&(t=!0)}}if(t)if(self!==self.top)document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;Tabzilla.ready()}};else{var i=document.createElement("p");Tabzilla.readyInterval=setInterval(function(){try{i.doScroll("left");clearInterval(Tabzilla.readyInterval);Tabzilla.readyInterval=null;Tabzilla.ready();i=null}catch(e){}},Tabzilla.READY_POLL_INTERVAL)}else e&&e<525?Tabzilla.readyInterval=setInterval(function(){var e=document.readyState;if("loaded"==e||"complete"==e){clearInterval(Tabzilla.readyInterval);Tabzilla.readyInterval=null;Tabzilla.ready()}},Tabzilla.READY_POLL_INTERVAL):Tabzilla.addEventListener(document,"DOMContentLoaded",Tabzilla.ready)};Tabzilla.ready=function(){if(!Tabzilla.DOMReady){Tabzilla.DOMReady=!0;var e=function(){Tabzilla.init();Tabzilla.removeEventListener(document,"DOMContentLoaded",Tabzilla.ready)};if(typeof jQuery=="undefined"){var t=document.createElement("script");t.type="text/javascript";t.src=Tabzilla.jQueryCDNSrc;document.getElementsByTagName("body")[0].appendChild(t);t.readyState?t.onreadystatechange=function(){(t.readyState=="loaded"||t.readyState=="complete")&&e()}:t.onload=e}else e()}};Tabzilla.init=function(){jQuery.extend(jQuery.easing,{easeInOut:function(e,t,n,r,i){return(t/=i/2)<1?r/2*t*t+n:-r/2*(--t*(t-2)-1)+n}});Tabzilla.link=document.getElementById("tabzilla");Tabzilla.panel=Tabzilla.buildPanel();var e=document.getElementsByTagName("body")[0];e.insertBefore(Tabzilla.panel,e.firstChild);Tabzilla.addEventListener(Tabzilla.link,"click",function(e){Tabzilla.preventDefault(e);Tabzilla.toggle()});Tabzilla.$panel=jQuery(Tabzilla.panel);Tabzilla.$link=jQuery(Tabzilla.link);Tabzilla.$panel.addClass("tabzilla-closed");Tabzilla.$link.addClass("tabzilla-closed");Tabzilla.$panel.removeClass("tabzilla-opened");Tabzilla.$link.removeClass("tabzilla-opened");Tabzilla.$panel.attr("tabindex","-1");Tabzilla.$link.attr({role:"button","aria-expanded":"false","aria-controls":Tabzilla.$panel.attr("id"),title:Tabzilla.LINK_TITLE.CLOSED});Tabzilla.opened=!1;jQuery(document).keydown(function(e){e.which===27&&Tabzilla.opened&&Tabzilla.toggle()});Tabzilla.$link.keypress(function(e){if(e.which===32){Tabzilla.toggle();Tabzilla.preventDefault(e)}});Tabzilla.$panel.keypress(function(e){if(e.which===13&&!Tabzilla.smallMode){Tabzilla.toggle();Tabzilla.$link.focus()}});if(Tabzilla.hasMediaQueryWidths){jQuery(window).resize(Tabzilla.handleResize);Tabzilla.handleResize()}};Tabzilla.buildPanel=function(){var e=document.createElement("div");e.id="tabzilla-panel";e.innerHTML=Tabzilla.content;return e};Tabzilla.addEventListener=function(e,t,n){typeof e.attachEvent!="undefined"?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)};Tabzilla.removeEventListener=function(e,t,n){typeof e.detachEvent!="undefined"?e.detachEvent("on"+t,n):e.removeEventListener(t,n,!1)};Tabzilla.toggle=function(){Tabzilla.opened?Tabzilla.close():Tabzilla.open()};Tabzilla.open=function(){if(Tabzilla.opened)return;Tabzilla.$panel.toggleClass("open");var e=Tabzilla.$panel.children("#tabzilla-contents"),t=e.height();Tabzilla.$panel.animate({height:t},200,"easeInOut",function(){Tabzilla.$panel.css("height","auto")});Tabzilla.$link.attr({"aria-expanded":"true",title:Tabzilla.LINK_TITLE.OPENED}).addClass("tabzilla-opened").removeClass("tabzilla-closed");Tabzilla.$panel.focus();Tabzilla.opened=!0};Tabzilla.close=function(){if(!Tabzilla.opened)return;Tabzilla.$panel.animate({height:0},200,"easeInOut",function(){Tabzilla.$panel.toggleClass("open")});Tabzilla.$link.attr({"aria-expanded":"false",title:Tabzilla.LINK_TITLE.CLOSED}).addClass("tabzilla-closed").removeClass("tabzilla-opened");Tabzilla.opened=!1};Tabzilla.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1};Tabzilla.handleResize=function(e){var t=jQuery(window).width();t<=719&&!Tabzilla.smallMode&&Tabzilla.enterSmallMode();t>719&&Tabzilla.smallMode&&Tabzilla.leaveSmallMode()};Tabzilla.toggleSmallMode=function(){Tabzilla.smallMode?Tabzilla.leaveSmallMode():Tabzilla.enterSmallMode()};Tabzilla.enterSmallMode=function(){jQuery("#tabzilla-nav h2").attr({role:"menuitem",tabindex:"0","aria-expanded":"false","aria-haspopup":"true"}).each(function(e,t){var n=jQuery(t).siblings("ul"),r=jQuery(t);Tabzilla.initSubmenu(r,n);Tabzilla.closeSubmenu(r,n)});Tabzilla.smallMode=!0};Tabzilla.leaveSmallMode=function(){jQuery("#tabzilla-nav h2").removeAttr("role").removeAttr("tabindex").removeAttr("aria-haspopup").removeAttr("aria-expanded").each(function(e,t){var n=jQuery(t).siblings("ul"),r=jQuery(t);Tabzilla.denitSubmenu(r,n)});Tabzilla.smallMode=!1};Tabzilla.initSubmenu=function(e,t){e.click(function(n){Tabzilla.toggleSubmenu(e,t)});e.keyup(function(n){if(n.keyCode===13){Tabzilla.preventDefault(n);Tabzilla.toggleSubmenu(e,t)}if(n.keyCode===39){Tabzilla.preventDefault(n);Tabzilla.openSubmenu(e,t)}if(n.keyCode===37){Tabzilla.preventDefault(n);Tabzilla.closeSubmenu(e,t)}});t.attr("role","menu");var n=t.find("a");n.attr("role","menuitem")};Tabzilla.denitSubmenu=function(e,t){e.unbind("click");t.removeAttr("role");t.css("height","auto");var n=t.find("a");n.removeAttr("role").removeAttr("tabindex").unbind("keypress")};Tabzilla.toggleSubmenu=function(e,t){e.attr("aria-expanded")==="true"?Tabzilla.closeSubmenu(e,t):Tabzilla.openSubmenu(e,t)};Tabzilla.openSubmenu=function(e,t){e.attr("aria-expanded","true");var n=t.find("a");n.attr("tabindex","0");var r=0;t.find("li").each(function(e,t){r+=jQuery(t).height()+1});r--;t.css("height",r+"px").attr("aria-hidden","false")};Tabzilla.closeSubmenu=function(e,t){e.attr("aria-expanded","false");t.css({overflow:"hidden",height:"0"}).attr("aria-hidden","true");var n=t.find("a");n.attr("tabindex","-1")};Tabzilla.content='<div id="tabzilla-contents">  <div id="tabzilla-nav">    <ul>      <li><h2>Aalto University</h2>          <li><a href="http://eng.aalto.fi/fi/" style="font-size: 11px;">Insinööritieteiden korkeakoulu</a>          <li><a href="http://business.aalto.fi/fi/">Kauppa-<br>korkeakoulu</a></li>          <li><a href="http://chem.aalto.fi/fi/">Kemian tekniikan korkeakoulu</a></li>          <li><a href="http://sci.aalto.fi/fi/">Perustieteiden korkeakoulu</a></li>          <li><a href="http://elec.aalto.fi/fi/">Sähkötekniikan korkeakoulu</a></li>          <li><a href="http://arts.aalto.fi/fi/">Taiteiden ja suunnittelun korkeakoulu</a></li>      </li>    </ul>  </div></div>';Tabzilla();