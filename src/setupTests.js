// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock @testing-library/react to use React's act
jest.mock('@testing-library/react', () => {
  const actual = jest.requireActual('@testing-library/react');
  const reactAct = jest.requireActual('react').act;
  return {
    ...actual,
    act: reactAct
  };
});
