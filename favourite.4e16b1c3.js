!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a),a.register("hKHmD",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n;return e}}));var o=a("4Nugj"),i={};Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){l.default(e,t,n[t])}))}return e};var s,l=(s=a("hKHmD"))&&s.__esModule?s:{default:s};var c=a("8nrFW");function u(t){if(t.target.classList.contains("markup-unit__global-link")){var n,r,a,s,l=(n=new Date,r=v(n.getDate()),a=v(n.getMonth()+1),s=v(n.getFullYear()),"".concat(r,"/").concat(a,"/").concat(s)),u=d(t.target.dataset.favorite),p=(0,o.onGetLocaleStorageData)(o.refs.READ_KEY);p?p.some((function(e){return e.link===u.link}))||f(o.refs.READ_KEY,e(c)(p).concat([e(i)({},u,{viewDate:l})])):f(o.refs.READ_KEY,[e(i)({},u,{viewDate:l})])}}function d(e){try{return JSON.parse(e)}catch(e){console.log(e)}}function f(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.log(e)}}function v(e){return String(e).padStart(2,"0")}function p(e,t){"add"===t&&(e.firstElementChild.textContent="Remove from Favourites",e.firstElementChild.setAttribute("style","pointer-events: none"),e.lastElementChild.classList.replace("markup-unit__favorite-icon","markup-unit__favorite-icon--active"),e.lastElementChild.setAttribute("style","pointer-events: none")),"remove"===t&&(e.firstElementChild.textContent="Add to Favourites",e.firstElementChild.setAttribute("style","pointer-events: none"),e.lastElementChild.classList.replace("markup-unit__favorite-icon--active","markup-unit__favorite-icon"),e.lastElementChild.setAttribute("style","pointer-events: none"))}(o=a("4Nugj")).refs.newsGallery.addEventListener("click",u),o.refs.newsGallery.addEventListener("click",(function(t){if(!t.target.hasAttribute("data-info"))return;var n=d(t.target.dataset.favorite),r=(0,o.onGetLocaleStorageData)(o.refs.FAVORITES_KEY);if(!r)return f(o.refs.FAVORITES_KEY,[n]),void p(t.target,"add");r.some((function(e){return e.link===n.link}))?(f(o.refs.FAVORITES_KEY,r.filter((function(e){return e.link!==n.link}))),p(t.target,"remove"),0===(0,o.onGetLocaleStorageData)(o.refs.FAVORITES_KEY).length&&localStorage.removeItem(o.refs.FAVORITES_KEY)):(f(o.refs.FAVORITES_KEY,e(c)(r).concat([n])),p(t.target,"add"))})),a("9haEe"),o.refs.favouriteGallery.addEventListener("click",(function(e){if(!e.target.hasAttribute("data-info"))return;var t=(0,o.onGetLocaleStorageData)(o.refs.FAVORITES_KEY);e.target.closest(".markup-unit").remove(),t||(0,o.getNoFound)(o.refs.favouriteGallery)})),function(e){var t=(0,o.onGetLocaleStorageData)(e),n=(0,o.onGetLocaleStorageData)(o.refs.READ_KEY);if(!t||0===t.length)return void(0,o.getNoFound)(o.refs.favouriteGallery);r=t,a=n,i=r.map((function(e){var t=e.title,n=e.category,o=e.date,i=e.link,s=e.description,l=e.imageURL,c=JSON.stringify(e);return'<li class="markup-unit markup-unit__read" name="card">\n    <p class="markup-unit__section">'.concat(n,'</p>\n    <div class="markup-unit__image-wrapper">\n    <img \n        class="markup-unit__card-image" \n        src="').concat(l,'" \n        alt="placeholder"\n        />\n        ').concat((null==a?void 0:a.some((function(e){return e.link===i})))?'<p class="markup-unit__already-read">\n                  Already read\n                  <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">\n                    <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>\n                  </svg>\n            </p>':"",'\n    <button \n        class="markup-unit__add-favorite js-fbutton js-favorites" \n        type="button" \n        data-info\n        data-favorite=\'').concat(c,"'\n        data-id='").concat(i,"'\n      >\n      <p \n        class=\"markup-unit__favorite-text js-fbutton\"\n        data-favorite='").concat(c,'\'\n        style="pointer-events: none;"\n      >\n      ').concat((null==r?void 0:r.some((function(e){return e.link===i})))?"Remove from Favourites":"Add to Favourites","\n      </p>\n      <svg \n          data-favorite='").concat(c,"'  \n          class=\"").concat((null==r?void 0:r.some((function(e){return e.link===i})))?"markup-unit__favorite-icon--active js-fbutton":"markup-unit__favorite-icon",'" \n          width="15" \n          height="15" \n          viewBox="0 0 37 32"\n          style="pointer-events: none;"\n        >\n        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>\n      </svg>\n    </button>\n    </div>\n    <a class="markup-unit__global-link"\n      href="').concat(i,'" \n      name="read_more"\n      target="_blank"\n      data-favorite=\'').concat(c,'\'\n    >\n    <div class="markup-unit__details" style="pointer-events:none;">\n      <div class="markup-unit__subdetails" style="pointer-events:none;">\n       <h2 class="markup-unit__card-header" name="card_header" style="pointer-events:none;">\n        ').concat(t,'\n    </h2>\n    <p class="markup-unit__card-text" name="card_text" style="pointer-events:none;">\n        ').concat(s,'\n    </p>\n        <div class="markup-unit__card-footer" style="pointer-events:none;">\n          <p class="markup-unit__card-date" style="pointer-events:none;">').concat(o,'</p>\n          <p \n            class="markup-unit__read-more" style="pointer-events:none;"\n          >\n            Read more\n          </p>\n        </div>\n      </div>\n    </div>\n  </a>\n    </li>')})).join(" "),o.refs.favouriteGallery.innerHTML=i;var r,a,i}(o.refs.FAVORITES_KEY),o.refs.favouriteGallery.addEventListener("click",u)}();
//# sourceMappingURL=favourite.4e16b1c3.js.map
