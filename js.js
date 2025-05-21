const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const postsContainer = document.getElementById('posts');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

// Alternar entre modo claro e escuro
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Função para adicionar novo post
function addPost(title, content, save = true) {
  if (!title || !content) {
    showError('Por favor, preencha os dois campos!');
    return;
  }

  const article = document.createElement('article');
  article.className = 'post';

  const postTitle = document.createElement('h2');
  postTitle.textContent = title;

  const postContent = document.createElement('p');
  postContent.textContent = content;

  const postDate = document.createElement('small');
  const date = new Date();
  postDate.textContent = `Postado em: ${date.toLocaleString()}`;
  postDate.style.display = 'block';
  postDate.style.marginTop = '5px';
  postDate.style.fontStyle = 'italic';

  article.appendChild(postTitle);
  article.appendChild(postContent);
  article.appendChild(postDate);

  postsContainer.appendChild(article);

  if (save) {
    savePostToStorage(title, content, date.toISOString());
  }

  titleInput.value = '';
  contentInput.value = '';
  titleInput.focus();
  clearError();
}

// Mostrar erro
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

// Limpar erro
function clearError() {
  const error = document.getElementById('form-error');
  if (error) {
    error.textContent = '';
  }
}

// Salvar post no localStorage
function savePostToStorage(title, content, date) {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  posts.push({ title, content, date });
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Carregar posts do localStorage
function loadPostsFromStorage() {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  posts.forEach(post => {
    addPost(post.title, post.content, false);
  });
}

// Modal: mostrar
function showConfirmModal() {
  const modal = document.getElementById('confirmModal');
  modal.classList.remove('hidden');
}

// Modal: esconder
function hideConfirmModal() {
  const modal = document.getElementById('confirmModal');
  modal.classList.add('hidden');
}

// Apagar todos os posts
function clearAllPosts() {
  postsContainer.innerHTML = '';
  localStorage.removeItem('posts');
  hideConfirmModal();
}

// Restaurar o tema salvo
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️ Modo Claro';
  } else {
    themeToggle.textContent = '🌙 Modo Escuro';
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    addPost(titleInput.value.trim(), contentInput.value.trim());
  });

  // Botão que mostra o modal
  const clearButton = document.getElementById('clearPosts');
  if (clearButton) {
    clearButton.addEventListener('click', showConfirmModal);
  }

  // Botões do modal
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');

  if (confirmYes) confirmYes.addEventListener('click', clearAllPosts);
  if (confirmNo) confirmNo.addEventListener('click', hideConfirmModal);

  loadSavedTheme();
  loadPostsFromStorage();
});




