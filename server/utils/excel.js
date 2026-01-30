const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs-extra');

const DATA_DIR = path.join(__dirname, '../data');
const USERS_DIR = path.join(DATA_DIR, 'users');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(USERS_DIR)) fs.mkdirSync(USERS_DIR, { recursive: true });

function getUserExcelPath(username) {
  return path.join(USERS_DIR, `${username}.xlsx`);
}

function initUserExcel(username) {
  const filePath = getUserExcelPath(username);
  if (fs.existsSync(filePath)) return;
  
  const wb = XLSX.utils.book_new();
  
  // Users sheet (for auth)
  const usersWs = XLSX.utils.aoa_to_sheet([
    ['username', 'password_hash', 'email', 'created_at']
  ]);
  XLSX.utils.book_append_sheet(wb, usersWs, 'users');
  
  // Todos sheet
  const todosWs = XLSX.utils.aoa_to_sheet([
    ['id', 'title', 'description', 'target_date', 'completed', 'created_at', 'updated_at']
  ]);
  XLSX.utils.book_append_sheet(wb, todosWs, 'todos');
  
  XLSX.writeFile(wb, filePath);
}

async function findUser(username, passwordHash) {
  const filePath = getUserExcelPath(username);
  if (!fs.existsSync(filePath)) return null;

  const wb = XLSX.readFile(filePath);
  const usersSheet = wb.Sheets['users'];
  const usersData = XLSX.utils.sheet_to_json(usersSheet);

  if (passwordHash) {
    return usersData.find(u => u.username === username && u.password_hash === passwordHash);
  }

  // If no passwordHash provided, return by username only (used for existence checks)
  return usersData.find(u => u.username === username);
}

async function createUser(username, passwordHash, email) {
  const filePath = getUserExcelPath(username);
  initUserExcel(username);
  
  const wb = XLSX.readFile(filePath);
  const usersSheet = wb.Sheets['users'];
  const usersData = XLSX.utils.sheet_to_json(usersSheet);
  
  usersData.push({
    username,
    password_hash: passwordHash,
    email,
    created_at: new Date().toISOString()
  });
  
  const newUsersSheet = XLSX.utils.json_to_sheet(usersData);
  // Replace the users sheet to avoid duplicate sheets with same name
  wb.Sheets['users'] = newUsersSheet;
  if (!wb.SheetNames.includes('users')) wb.SheetNames.push('users');
  XLSX.writeFile(wb, filePath);
  
  return true;
}

async function getTodos(username) {
  const filePath = getUserExcelPath(username);
  if (!fs.existsSync(filePath)) return [];
  
  const wb = XLSX.readFile(filePath);
  const todosSheet = wb.Sheets['todos'];
  return XLSX.utils.sheet_to_json(todosSheet);
}

async function addTodo(username, todo) {
  const filePath = getUserExcelPath(username);
  initUserExcel(username);
  
  const wb = XLSX.readFile(filePath);
  const todosSheet = wb.Sheets['todos'];
  const todos = XLSX.utils.sheet_to_json(todosSheet);
  
  const newTodo = {
    id: Date.now().toString(),
    ...todo,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  todos.push(newTodo);
  const newTodosSheet = XLSX.utils.json_to_sheet(todos);
  wb.Sheets['todos'] = newTodosSheet;
  if (!wb.SheetNames.includes('todos')) wb.SheetNames.push('todos');
  XLSX.writeFile(wb, filePath);
  
  return newTodo;
}

async function updateTodo(username, id, updates) {
  const filePath = getUserExcelPath(username);
  const wb = XLSX.readFile(filePath);
  const todosSheet = wb.Sheets['todos'];
  const todos = XLSX.utils.sheet_to_json(todosSheet);
  
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  todos[index] = { ...todos[index], ...updates, updated_at: new Date().toISOString() };
  const newTodosSheet = XLSX.utils.json_to_sheet(todos);
  wb.Sheets['todos'] = newTodosSheet;
  if (!wb.SheetNames.includes('todos')) wb.SheetNames.push('todos');
  XLSX.writeFile(wb, filePath);
  
  return todos[index];
}

async function deleteTodo(username, id) {
  const filePath = getUserExcelPath(username);
  const wb = XLSX.readFile(filePath);
  const todosSheet = wb.Sheets['todos'];
  const todos = XLSX.utils.sheet_to_json(todosSheet);
  
  const filteredTodos = todos.filter(t => t.id !== id);
  const newTodosSheet = XLSX.utils.json_to_sheet(filteredTodos);
  wb.Sheets['todos'] = newTodosSheet;
  if (!wb.SheetNames.includes('todos')) wb.SheetNames.push('todos');
  XLSX.writeFile(wb, filePath);
  
  return true;
}

module.exports = {
  initUserExcel,
  findUser,
  createUser,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
};
