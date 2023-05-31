import { onGetLocaleStorageData, refs } from './refs';

refs.newsGallery.addEventListener('click', onReadMoreClick);


//============== Функция обработчик по клику на ссылку ReadMore ==============================================
function onReadMoreClick(event) {
  if (!event.target.classList.contains('markup-unit__global-link')) return; // проверяем туда ли тырнули

  const clickDate = receiveDate(); // получаем дату клика в виде 20/02/2023
  const parsedCardData = makeParseJson(event.target.dataset.favorite); // получаем объект данных с карточки которая находится на странице
  const urlFromLocaleStorage = onGetLocaleStorageData(refs.READ_URL_KEY); // получаем из локального хранилища массив URL прочитанных новстей
  const dataFromLocaleStorage = onGetLocaleStorageData(refs.READ_KEY); // получаем массив объектов прочитанных новостей из Локального Хранилища

  //------ Логика для массива ссылок прочитаных новостей
  addHaveReadLink(urlFromLocaleStorage, parsedCardData.link, refs.READ_URL_KEY);

  //------ Логика для массива объектов с датой и новостями
  addHaveReadNews(
    dataFromLocaleStorage,
    parsedCardData,
    clickDate,
    refs.READ_KEY
  );
}



//================================= Логика страницы Index, действие с Фавориты ============================================================

refs.newsGallery.addEventListener('click', onAddRemoveLocaleStorageData); // вешаем слушателя событий на контейнер с новостями

//=========== Функция-обработчик Клика на кнопку добавить/убрать в/из Фавориты ==============================================
function onAddRemoveLocaleStorageData(event) {
  if (!event.target.hasAttribute('data-info')) return; // проверка туда ли тырнули

  const parsedCardData = makeParseJson(event.target.dataset.favorite); // получаем объект данных с карточки которая находится на странице
  const dataFromLocaleStorage = onGetLocaleStorageData(refs.FAVORITES_KEY); // получаем массив объектов из Локального Хранилища

  if (!dataFromLocaleStorage) {
    onSetLocaleStorageData(refs.FAVORITES_KEY, [parsedCardData]);
    changeButton(event.target, 'add');
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
  }
}

//========== Функция парсинга данных из JSON файла =================================================
function makeParseJson(stringData) {
  try {
    return JSON.parse(stringData);
  } catch (error) {
    console.log(error);
  }
}

//========== Функкция Добавления Данных в Locale Storage ========================================
function onSetLocaleStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

//========== Функция получения даты в формате 20/02/2021
function receiveDate() {
  const date = new Date();
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1);
  const year = addLeadingZero(date.getFullYear());
  return `${day}/${month}/${year}`;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//========== Функция добавления ссылок на новости в отдельный массив в Locale Storage ============
function addHaveReadLink(array, link, key) {
  if (array) {
    // если вернулся массив ссылок
    const urlPresenceResult = array.some(item => item === link); // ищем есть ли совпадение с link результат

    if (!urlPresenceResult) {
      // если нету такого URL в массиве прочитанных новостей
      array.push(link); //добавляем в массив URL из локального хранилища URL текущей новости
      onSetLocaleStorageData(key, array); // сетаем в хранилище обновленный массив URL прочитанных новостей
    }

    return;
  }

  onSetLocaleStorageData(key, [link]); // если массива нет, создаем массив и помещаем туда url прочитанной новости и сетаем в Хранилище
}

//========== Функция добавления объекта прочитанных новостей согласно дате просмотра =============
function addHaveReadNews(newsArr, cardObj, date, key) {
  if (newsArr) {
    // если возвращается массив дат с новостями из Локального Хранилища

    let resultsArr = []; // Массив-прокладка

    newsArr.forEach(object => {
      // перебираем все двухуровневые объекты прочитанных новостей с датами из Локального Хранилища
      const { newsArray } = object;

      const isPresent = newsArray.some(news => news.link === cardObj.link); // проверяем есть ли новость в коллекции
      resultsArr.push(isPresent);
    });

    const isNewsPresent = resultsArr.some(result => result); // проверка присутствия новости, если присутствует то выходим
    resultsArr = []; // очищаем массив-прокладку на всякий случай

    if (!isNewsPresent) {
      // Если новость не присутствует в прочитанных
      const datePresence = newsArr.some(item => item.whenRead === date); // проверяем есть ли сегодняшняя дата в массиве прочитанных

      if (datePresence) {
        // если дата уже присутствует в массиве
        const arrWithNewObject = newsArr.map(item => {
          // создаем новый массив перебирая массив из Локального Хранилища
          const { whenRead, newsArray } = item;
          if (whenRead === date) {
            //когда совпадение по дате
            newsArray.push(cardObj); // пушим в массив новостей объект с карточки
            return { whenRead, newsArray };
          }
        });

        onSetLocaleStorageData(key, arrWithNewObject); // сетаем модифицированный массив в локальное хранилище
        return;
      }

      const whenHaveReadObject = {
        // создаем новый объект с датой когда новость прочитана и массивом для Прочитанных на эту дату
        whenRead: date,
        newsArray: [cardObj],
      };

      newsArr.push(whenHaveReadObject); // пушим объект с новостью и датой в существующий массив из Локального Хранилища

      onSetLocaleStorageData(key, newsArr); // сетаем новый массив в локальное хранилище
    }

    return;
  }
  // Если не возвращается массив
  const haveReadArray = []; // создаем массив который будем сетать в Локальное хранилище
  const whenHaveReadObject = {
    // создаем новый объект с датой когда новость прочитана и массивом прочитанных на эту дату
    whenRead: date,
    newsArray: [cardObj],
  };

  haveReadArray.push(whenHaveReadObject); // пушим в новый массив объект с датой и массивом прочитанных новостей

  onSetLocaleStorageData(key, haveReadArray); // сетаем массив с прочитанными новостями и датой в Локальное Хранилище
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
