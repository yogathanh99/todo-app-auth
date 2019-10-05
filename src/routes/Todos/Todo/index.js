import React, { useState } from 'react';
import styled from 'styled-components';

import Heading from '../../../components/UI/Form/Heading';
import DeleteTodo from './DeleteTodo';
import EditTodo from '../EditTodo';

const Wrapper = styled.div`
  width: 80%;
  position: relative;
  padding: 4rem 3rem;
  background-color: var(--color-mainLighter);
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  margin-bottom: 3.5rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const editStyles = {
  color: 'var(--color-edit)',
  margin: '0 .5rem',
  cursor: 'pointer',
};

const deleteStyles = {
  color: 'var(--color-error)',
  margin: '0 .5rem',
  cursor: 'pointer',
};

const Todo = ({ todo }) => {
  const [isDeleting, setisDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Wrapper>
      <Heading size='h3' noMargin color='white' fontWeight={`true`}>
        {todo.todo}
      </Heading>
      <Controls>
        <i
          className='far fa-edit'
          style={editStyles}
          onClick={() => setIsEditing(true)}
        />
        <i
          className='fas fa-trash'
          style={deleteStyles}
          onClick={() => setisDeleting(true)}
        />
        <DeleteTodo
          show={isDeleting}
          close={() => setisDeleting(false)}
          todo={todo}
        />
        <EditTodo
          todo={todo}
          opened={isEditing}
          close={() => setIsEditing(false)}
        />
      </Controls>
    </Wrapper>
  );
};

export default Todo;
