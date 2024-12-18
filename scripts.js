// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput');  // Pega o campo de entrada onde o usuário digita a tarefa
    const taskText = taskInput.value.trim();  // Pega o texto da tarefa e remove espaços extras ao redor

    // Verifica se o campo de entrada não está vazio
    if (taskText === '') {
        alert('Antes disso, digite uma tarefa!');  // Exibe um alerta caso o campo esteja vazio
        return;  // Não faz nada se o campo estiver vazio
    }

    // Cria um novo item de lista (li) para a tarefa
    const taskItem = document.createElement('li');
    
    // Cria o texto da tarefa dentro de uma tag <span>
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;  // Define o texto da tarefa

    // Cria a div para armazenar os botões de editar e excluir
    const buttonContainer = document.createElement('div');  // Cria uma div para armazenar os botões

    // Cria o botão de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';  // Define o texto do botão
    editButton.classList.add('edit');  // Adiciona uma classe CSS ao botão
    editButton.onclick = function() {  // Define a ação que será executada ao clicar no botão
        editTask(taskItem, taskTextSpan);  // Chama a função de edição da tarefa
    };

    // Cria o botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';  // Define o texto do botão
    deleteButton.classList.add('delete');  // Adiciona uma classe CSS ao botão
    deleteButton.onclick = function() {  // Define a ação que será executada ao clicar no botão
        deleteTask(taskItem);  // Chama a função para excluir a tarefa
    };

    // Adiciona os botões à div
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Adiciona o texto da tarefa ao item da lista (li)
    taskItem.appendChild(taskTextSpan);

    // Adiciona o item na lista (ul) no HTML
    document.getElementById('taskList').appendChild(taskItem);

    // Limpa o campo de entrada
    taskInput.value = '';

    // Adiciona a div de botões abaixo do item da lista
    taskItem.appendChild(buttonContainer);
}

// Função para excluir uma tarefa
function deleteTask(taskItem) {
    taskItem.remove();  // Remove o item da lista
}

// Função para editar uma tarefa
function editTask(taskItem, taskTextSpan) {
    // Remove os botões de Editar e Excluir
    taskItem.querySelector('div').remove();  // Remove a div que contém os botões de editar e excluir

    // Cria um campo de entrada (input) para editar a tarefa
    const newInput = document.createElement('input');
    newInput.type = 'text';  // Define o tipo do campo como texto
    newInput.value = taskTextSpan.textContent;  // Preenche o campo com o texto atual da tarefa

    // Substitui o texto da tarefa por esse campo de entrada
    taskItem.replaceChild(newInput, taskTextSpan);

    // Cria o botão de salvar edição
    const saveEditButton = document.createElement('button');
    saveEditButton.textContent = 'Salvar';  // Define o texto do botão
    saveEditButton.onclick = function() {  // Define a ação que será executada ao clicar no botão
        saveEdit(taskItem, newInput, taskTextSpan, saveEditButton);  // Chama a função para salvar a edição
    };

    // Adiciona o botão de salvar edição ao item da tarefa
    taskItem.appendChild(saveEditButton);
}

// Função para salvar a edição da tarefa
function saveEdit(taskItem, input, taskTextSpan, saveEditButton) {
    const updatedText = input.value.trim();  // Pega o novo texto da tarefa e remove espaços extras

    // Se o campo de entrada estiver vazio, exibe um alerta
    if (updatedText === '') {
        alert('A tarefa não pode estar vazia.');
        return;  // Não faz nada se o campo estiver vazio
    }

    // Cria um novo elemento <span> com o texto editado
    const newTaskTextSpan = document.createElement('span');
    newTaskTextSpan.textContent = updatedText;  // Define o texto atualizado da tarefa

    // Substitui o campo de entrada pelo novo texto
    taskItem.replaceChild(newTaskTextSpan, input);

    // Remove o botão de salvar edição
    taskItem.removeChild(saveEditButton);

    // Restaura os botões de Editar e Excluir
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';  // Define o texto do botão
    editButton.classList.add('edit');  // Adiciona a classe CSS
    editButton.onclick = function() {  // Define a ação para editar novamente
        editTask(taskItem, newTaskTextSpan);  // Chama a função de edição
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';  // Define o texto do botão
    deleteButton.classList.add('delete');  // Adiciona a classe CSS
    deleteButton.onclick = function() {  // Define a ação para excluir a tarefa
        deleteTask(taskItem);  // Chama a função para excluir
    };

    // Cria a div de botões fora do li
    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(editButton);  // Adiciona o botão de editar
    buttonContainer.appendChild(deleteButton);  // Adiciona o botão de excluir

    // Adiciona a div com os botões ao item da tarefa
    taskItem.appendChild(buttonContainer);
}

// Função para marcar a tarefa como concluída
function toggleComplete(taskItem) {
    // Alterna a classe 'completed' para a tarefa
    taskItem.classList.toggle('completed');  // Se a tarefa já tiver a classe 'completed', remove; se não, adiciona
}
