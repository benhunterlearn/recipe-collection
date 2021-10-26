import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";
import userEvent from "@testing-library/user-event";

test('Add recipe button toggles visibility of the new recipe form.', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  // queryBy... methods return null if element is not found
  const recipeForm = screen.queryByText("Instructions:");

  // getBy... methods "throw" an error if element is not found
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Recipe Instructions:")).toBeInTheDocument();

  expect(screen.queryByText("DOES NOT EXIST")).toBeNull();

});

test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
});

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Recipe Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  const {instructionsInput} = setup();

  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
});


test('recipe name from state appears in an unordered list', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})