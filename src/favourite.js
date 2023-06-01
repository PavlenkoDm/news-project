import { receiveDate, addLeadingZero, makeParseJson, onSetLocaleStorageData, onReadMoreClick } from './js/home-favourites-read';
import { refs, getNoFound, onGetLocaleStorageData } from './js/refs';
import './js/mobile_menu';
// import { onInputSubmit } from './js/themeSwitcher';
// export const formEl = document.querySelector('.toggle-mode');
// formEl.addEventListener('submit', onInputSubmit);

onOpenFavorites(refs.FAVORITES_KEY);

//=============== Функция при открытии страныцы "Фавориты":
function onOpenFavorites(key) {
  const dataFromLocaleStorage = onGetLocaleStorageData(key);
  const currentRead = onGetLocaleStorageData(refs.READ_KEY);

  if (!dataFromLocaleStorage || dataFromLocaleStorage.length === 0) {
    getNoFound(refs.favouriteGallery);
    return;
  }

  onCreateMurkup(dataFromLocaleStorage, currentRead);
}

//============= Функция удаления элементов из ДОМ:
function onRemoveElement(element) {
  element.remove();
}
//============= Функция-обработчик удаления из Фаворитов:
function onRemoveFromFavorites(event) {
  if (!event.target.hasAttribute('data-info')) return;

  const card = event.target.closest('.markup-unit');

  const cardIDLink = event.target.dataset.id; // получаем ID карточки в виде линка на первоисточник

  const dataFromLocaleStorage = onGetLocaleStorageData(refs.FAVORITES_KEY); // получаем массив из Локального хранилища

  if (!dataFromLocaleStorage) {
    return;
  }

  const index = dataFromLocaleStorage.find((card, index) => {
    // получаем индекс нужной карточки
    if (card.link === cardIDLink) {
      return index;
    }
  });

  dataFromLocaleStorage.splice(index, 1); // удаляем карточку по индексу

  if (dataFromLocaleStorage.length === 0) {
    localStorage.removeItem(refs.FAVORITES_KEY);
    onRemoveElement(card);
    return;
  }

  onSetLocaleStorageData(refs.FAVORITES_KEY, dataFromLocaleStorage); // сетаем в локальное хранилище модифицированный массив

  onRemoveElement(card);
}

//============= Функция для рендера страницы:
function onCreateMurkup(arrayOfObjects, read) {
  const favoritesMurkup = arrayOfObjects
    .map(newsObject => {
      // перебираем массив из Локального хранилища и создаем разметку для карточки
      const { title, category, date, link, description, imageURL } = newsObject;
      const favorite = JSON.stringify(newsObject);

      return `<li class="markup-unit markup-unit__read" name="card">
    <p class="markup-unit__section">${category}</p>
    <div class="markup-unit__image-wrapper">
    <img 
        class="markup-unit__card-image" 
        src="${imageURL}" 
        alt="placeholder"
        />
        ${read?.some(readNews => readNews.link === link)
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
        arrayOfObjects?.some(favouriteNews => favouriteNews.link === link)
          ? 'Remove from Favourites'
          : 'Add to Favourite'
      }
      </p>
      <svg 
          data-favorite='${favorite}'  
          class="${
            arrayOfObjects?.some(
              favouriteNews => favouriteNews.link === link
            )
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
    </li>`;
    })
    .join(' ');

  return (refs.favouriteGallery.innerHTML = favoritesMurkup);
}


refs.favouriteGallery.addEventListener('click', onRemoveFromFavorites);
refs.favouriteGallery.addEventListener('click', onReadMoreClick);
