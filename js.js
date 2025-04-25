const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  themeToggle.textContent = body.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
});

function addPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (title.trim() === '' || content.trim() === '') {
    alert("Por favor, preencha os dois campos!");
    return;
  }

  const postDiv = document.createElement('div');
  postDiv.className = 'post';

  postDiv.innerHTML = `
    <h2>${title}</h2>
    <p>${content}</p>
  `;

  document.getElementById('posts').appendChild(postDiv);

  // Limpar campos
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
}