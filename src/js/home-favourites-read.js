import { onGetLocaleStorageData, refs } from './refs';

refs.newsGallery.addEventListener('click', onReadMoreClick);

//============== Функция обработчик по клику на ссылку ReadMore:
export function onReadMoreClick(event) {
  if (!event.target.classList.contains('markup-unit__global-link')) return;

  const clickDate = receiveDate(); // получаем дату клика в виде 20/02/2023
  const parsedCardData = makeParseJson(event.target.dataset.favorite); // получаем объект данных с карточки которая находится на странице
  const dataFromLocaleStorage = onGetLocaleStorageData(refs.READ_KEY); // получаем массив объектов прочитанных новостей из Локального Хранилища

  if (!dataFromLocaleStorage) {
    onSetLocaleStorageData(refs.READ_KEY, [{...parsedCardData, viewDate: clickDate}]);
    return;
  }

  if (!dataFromLocaleStorage.some(news => news.link === parsedCardData.link)) {
    onSetLocaleStorageData(refs.READ_KEY, [
      ...dataFromLocaleStorage,
      {...parsedCardData, viewDate: clickDate}
    ]);
    return;
  }
}

//============ Логика страницы Index, действие с Фавориты:
refs.newsGallery.addEventListener('click', onAddRemoveLocaleStorageData); // вешаем слушателя событий на контейнер с новостями

//=========== Функция-обработчик Клика на кнопку добавить/убрать в/из Фавориты:
export function onAddRemoveLocaleStorageData(event) {
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


//========== Функция парсинга данных из JSON файла:
export function makeParseJson(stringData) {
  try {
    return JSON.parse(stringData);
  } catch (error) {
    console.log(error);
  }
}

//========== Функкция Добавления Данных в Locale Storage:
export function onSetLocaleStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

//========== Функция получения даты в формате 20/02/2021
export function receiveDate() {
  const date = new Date();
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1);
  const year = addLeadingZero(date.getFullYear());
  return `${day}/${month}/${year}`;
}
export function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
