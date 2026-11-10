import React from 'react';
import { CheckSquare, Calendar } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { ThemeSelector } from './components/ThemeSelector';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { EmptyState } from './components/EmptyState';

const themeGradients = {
  purple: 'from-purple-900/20 via-pink-900/10 to-purple-900/20',
  blue: 'from-blue-900/20 via-cyan-900/10 to-blue-900/20',
  green: 'from-green-900/20 via-emerald-900/10 to-green-900/20',
  pink: 'from-pink-900/20 via-rose-900/10 to-pink-900/20'
};

function App() {
  const { pendingTodos, completedTodos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos();
  const { theme, changeTheme } = useTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeGradients[theme]} bg-gray-900`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Lista de Afazeres
            </h1>
          </div>
          <p className="text-gray-400 text-lg tracking-wide mb-6">
            Organize suas tarefas com estilo
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <ThemeSelector currentTheme={theme} onThemeChange={changeTheme} />
          </div>
        </div>

        {/* Add Todo Form */}
        <AddTodoForm theme={theme} onAdd={addTodo} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
            <div className="text-2xl font-bold text-white">{pendingTodos.length}</div>
            <div className="text-gray-400 text-sm tracking-wide">Pendentes</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
            <div className="text-2xl font-bold text-green-400">{completedTodos.length}</div>
            <div className="text-gray-400 text-sm tracking-wide">Concluídas</div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Pending Todos */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 tracking-wide">
              Tarefas Pendentes
            </h2>
            <div className="space-y-3">
              {pendingTodos.length > 0 ? (
                pendingTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    theme={theme}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                  />
                ))
              ) : (
                <EmptyState type="pending" />
              )}
            </div>
          </div>

          {/* Completed Todos */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 tracking-wide">
              Tarefas Concluídas
            </h2>
            <div className="space-y-3">
              {completedTodos.length > 0 ? (
                completedTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    theme={theme}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                  />
                ))
              ) : (
                <EmptyState type="completed" />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm tracking-wide">
          Suas tarefas são salvas automaticamente no navegador
        </div>
      </div>
    </div>
  );
}

export default App;