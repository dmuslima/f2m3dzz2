
  let kartochki = document.querySelector('.kartochki');
  let searchInput = document.getElementById('searchInput');
  let users = []; // сюда сохраним всех пользователей

  // Получаем пользователей
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users = data; // сохраняем в глобальную переменную
      renderUsers(users); // отображаем всех
    });

  // Функция отрисовки карточек
  function renderUsers(userArray) {
    kartochki.innerHTML = ''; // очищаем старые карточки

    userArray.forEach(element => {
      let divCard = document.createElement('div');
      divCard.classList.add('card');
      divCard.innerHTML = `
        <h2>${element.name}</h2>
        <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
        <p>Почта: ${element.email}</p>
        <p>Город проживания: ${element.address.city}</p>
      `;
      kartochki.appendChild(divCard);
    });
  }

  // Поиск по имени
  searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchValue)
    );

    renderUsers(filteredUsers); // показываем только отфильтрованных
  });

  // Тема
  const themeBtn = document.getElementById('toggleThemeBtn');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }

  themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

