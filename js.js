const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const postsContainer = document.getElementById('posts');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

// Alternar entre modo claro e escuro
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeToggle.textContent = body.classList.contains('dark')
    ? '☀️ Modo Claro'
    : '🌙 Modo Escuro';
});

// Função para adicionar novo post
function addPost() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === '' || content === '') {
    showError('Por favor, preencha os dois campos!');
    return;
  }

  const article = document.createElement('article');
  article.className = 'post';

  const postTitle = document.createElement('h2');
  postTitle.textContent = title;

  const postContent = document.createElement('p');
  postContent.textContent = content;

  article.appendChild(postTitle);
  article.appendChild(postContent);

  postsContainer.appendChild(article);

  titleInput.value = '';
  contentInput.value = '';
  titleInput.focus();

  clearError();
}

// Mostrar erro sem usar alert()
function showError(msg) {
  let error = document.getElementById('form-error');
  if (!error) {
    error = document.createElement('p');
    error.id = 'form-error';
    error.style.color = 'red';
    error.style.fontWeight = 'bold';
    contentInput.parentElement.appendChild(error);
  }
  error.textContent = msg;
}

function clearError() {
  const error = document.getElementById('form-error');
  if (error) {
    error.textContent = '';
  }
}

// Espera o DOM carregar pra garantir que os elementos existem
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o reload da página
    addPost(); // Chama a função para adicionar o post
  });
});


