import styled from 'styled-components';
import { Form } from 'formik';

export const Container = styled.div`
  width: 100%;
  max-width: 140rem;
  margin: 0 auto;
  height: 100%;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 50rem;
  border-radius: 1rem;
  margin: 0 auto;
  padding: 6rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-main);
  box-shadow: 0 0.5rem 3.5rem var(--shadow);
`;

export const StyledForm = styled(Form)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 35rem;
`;
