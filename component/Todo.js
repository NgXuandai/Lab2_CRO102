// components/Todo.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const count = todos.filter(todo => todo.completed).length;
    setCompletedCount(count);
  }, [todos]);

  const addTodo = () => {
    if (title && content) {
      setTodos([...todos, { id: Date.now(), title, content, completed: false }]);
      setTitle('');
      setContent('');
    }
  };

  const updateTodo = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
        {item.title}: {item.content}
      </Text>
      <Button title={item.completed ? "Undo" : "Complete"} onPress={() => updateTodo(item.id)} />
      <Button title="Delete" onPress={() => deleteTodo(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <Text>Completed: {completedCount}</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Content" value={content} onChangeText={setContent} style={styles.input} />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList data={todos} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  todoItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
});

export default Todo;
