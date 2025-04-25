const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const postsContainer = document.getElementById('posts');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

// Alternar entre modo claro e escuro
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeToggle.textContent = body.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
});

// Função para adicionar novo post
function addPost() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  // Verificação se os campos estão vazios
  if (title === '' || content === '') {
    alert("Por favor, preencha os dois campos!");
    return;
  }

  // Criação do novo post
  const postDiv = document.createElement('div');
  postDiv.className = 'post';

  postDiv.innerHTML = `
    <h2>${title}</h2>
    <p>${content}</p>
  `;

  // Adicionar o novo post ao contêiner de posts
  postsContainer.appendChild(postDiv);

  // Limpar campos de entrada após adicionar o post
  titleInput.value = '';
  contentInput.value = '';
}
