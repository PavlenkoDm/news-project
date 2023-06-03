import { uniq } from 'lodash';
import { refs, getNoFound, onGetLocaleStorageData } from './js/refs';
import './js/mobile_menu';

refs.accordionListRef.addEventListener('click', handleFavourites);
const favourites = onGetLocaleStorageData(refs.FAVORITES_KEY);

onOpenRead(refs.READ_KEY);

//=============== Функция при открытии страныцы "Прочитанные" ==================================
function onOpenRead(key) {
  const dataFromLocaleStorage = onGetLocaleStorageData(key); // получаем данные из избранных в Локальном Хранилище

  if (!dataFromLocaleStorage || dataFromLocaleStorage.length === 0) {
    // проверка на null или пустой массив
    getNoFound(refs.accordionRef);
    return;
  }

  onCreateReadMurkup(dataFromLocaleStorage);
}

//============== Функция рендера разметки ======================================
function onCreateReadMurkup(array) {
  const allViewDate = array.map(news => news.viewDate);
  const uniqViewDate = uniq(allViewDate);

  const accordionMurkup = uniqViewDate
    .map(
      date => `
      <li class="accordion-list_item">
        <div class="accordion-title_wrapper">
            <p class="accordion-list_title">
                ${date}
            </p>
            <div class="accordion-arrow__wraper">
                <svg width="14" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.7625 9L-3.18545e-07 7.28745L7.5 3.27835e-07L15 7.28745L13.2375 9L7.5 3.43725L1.7625 9Z" fill="#111321"/>
                </svg>
            </div>
        </div>
        <ul class="accordion-list_panel">
          ${newsCardMurkup(array, date)}
        </ul>
      </li>
  `
    )
    .join(' ');

  refs.accordionListRef.innerHTML = accordionMurkup;
}

function newsCardMurkup(array, date) {
  const card = array.filter(news => news.viewDate === date)
    .map(news => {
      const { title, category, date, link, description, imageURL } = news;
      const favorite = JSON.stringify(news);

      return `
            <div class="markup-unit markup-unit__read" name="card">
              <p class="markup-unit__section">${category}</p>
              <div class="markup-unit__image-wrapper">
    <img 
        class="markup-unit__card-image" 
        src="${imageURL}" 
        alt="placeholder"
        />
        ${
          array?.some(readNews => readNews.link === link)
            ? `<p class="markup-unit__already-read">
                  Already read
                  <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
                    <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
                  </svg>
            </p>`
            : ''
        }
    <button 
        class="markup-unit__add-favorite js-fbutton js-favorites" 
        type="button" 
        data-info
        data-favorite='${favorite}'
        data-id='${link}'
      >
      <p 
        class="markup-unit__favorite-text js-fbutton"
        data-favorite='${favorite}'
        style="pointer-events: none;"
      >
      ${
        favourites?.some(favouriteNews => favouriteNews.link === link)
          ? 'Remove from Favourites'
          : 'Add to Favourites'
      }
      </p>
      <svg 
          data-favorite='${favorite}'  
          class="${
            favourites?.some(favouriteNews => favouriteNews.link === link)
              ? 'markup-unit__favorite-icon--active js-fbutton'
              : 'markup-unit__favorite-icon'
          }" 
          width="15" 
          height="15" 
          viewBox="0 0 37 32"
          style="pointer-events: none;"
        >
        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
      </svg>
    </button>
    </div>
    <a class="markup-unit__global-link"
      href="${link}" 
      name="read_more"
      target="_blank"
      data-favorite='${favorite}'
    >
    <div class="markup-unit__details" style="pointer-events:none;">
      <div class="markup-unit__subdetails" style="pointer-events:none;">
       <h2 class="markup-unit__card-header" name="card_header" style="pointer-events:none;">
        ${title}
    </h2>
    <p class="markup-unit__card-text" name="card_text" style="pointer-events:none;">
        ${description}
    </p>
        <div class="markup-unit__card-footer" style="pointer-events:none;">
          <p class="markup-unit__card-date" style="pointer-events:none;">${date}</p>
          <p 
            class="markup-unit__read-more" style="pointer-events:none;"
          >
            Read more
          </p>
        </div>
      </div>
    </div>
  </a>
    </div>
          `;
    })
    .join(' ');
  
  return card;
}

function handleFavourites(event) {
  if (!event.target.hasAttribute("data-info")) return; // проверка туда ли тырнули

  const parsedCardData = makeParseJson(event.target.dataset.favorite); // получаем объект данных с карточки которая находится на странице
  const dataFromLocaleStorage = onGetLocaleStorageData(refs.FAVORITES_KEY); // получаем массив объектов из Локального Хранилища


  if (!dataFromLocaleStorage) {
    onSetLocaleStorageData(refs.FAVORITES_KEY, [parsedCardData]);
    changeButton(event.target, 'add')
    return;
  }

  if (!dataFromLocaleStorage.some(news => news.link === parsedCardData.link)) {
    onSetLocaleStorageData(refs.FAVORITES_KEY, [
      ...dataFromLocaleStorage,
      parsedCardData,
    ]);
    changeButton(event.target, 'add');
  } else {
    onSetLocaleStorageData(
      refs.FAVORITES_KEY,
      dataFromLocaleStorage.filter(news => news.link !== parsedCardData.link)
    );
    changeButton(event.target, 'remove');
    onGetLocaleStorageData(refs.FAVORITES_KEY).length === 0 ? localStorage.removeItem(refs.FAVORITES_KEY) : null;
  }
}

function changeButton(eTarget, action) {
  if (action === 'add') {
    eTarget.firstElementChild.textContent = 'Remove from Favourites';
    eTarget.firstElementChild.setAttribute('style', 'pointer-events: none');
    eTarget.lastElementChild.classList.replace(
      'markup-unit__favorite-icon',
      'markup-unit__favorite-icon--active'
    );
    eTarget.lastElementChild.setAttribute('style', 'pointer-events: none');
  }

  if (action === 'remove') {
    eTarget.firstElementChild.textContent = 'Add to Favourites';
    eTarget.firstElementChild.setAttribute('style', 'pointer-events: none');
    eTarget.lastElementChild.classList.replace(
      'markup-unit__favorite-icon--active',
      'markup-unit__favorite-icon'
    );
    eTarget.lastElementChild.setAttribute('style', 'pointer-events: none');
  }
}

function makeParseJson(stringData) {
  try {
    return JSON.parse(stringData);
  } catch (error) {
    console.log(error);
  }
}

export function onSetLocaleStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
