module.exports = {
    moduleNameMapper: {
      '^react-router-dom$': require.resolve('react-router-dom'),
      '^@testing-library/react$': require.resolve('@testing-library/react'),
      '^@testing-library/jest-dom$': require.resolve('@testing-library/jest-dom'),
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Process JS/JSX files with Babel
      },
      transformIgnorePatterns: [
        '/node_modules/(?!axios|react-router-dom|@testing-library)/', // Make sure axios is transformed
      ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
  };
  