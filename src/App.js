import './App.css';

import React, {useState} from 'react';

const App = () => {
    const [isAddRecipeFormDisplayed, setIsAddRecipeFormDisplayed] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        instructions: '',
    })

    const addNewRecipeForm = (
        <form id="recipe-form">
            <label htmlFor="newRecipeName">Recipe name: </label>
            <input type="text"
                   id="newRecipeName"
                   onChange={(event) => (updateNewRecipe(event, 'name'))}/>
            <label htmlFor="newRecipeInstructions">Recipe Instructions:</label>
            <textarea
                id="newRecipeInstructions"
                placeholder="write recipe instructions here..."
                onChange={(event) => (updateNewRecipe(event, 'instructions'))}
            />
            <input type="submit"
                   onClick={(event) => submitRecipe(event)}/>
        </form>
    );

    const updateNewRecipe = (event, key) => {
        const recipe = {...newRecipe};
        recipe[key] = event.target.value;
        setNewRecipe(recipe);
    };

    const submitRecipe = (event) => {
        event.preventDefault();

        // if (newRecipe.name.length > 0 && newRecipe.instructions.length > 0) { }
        setRecipeList([...recipeList, newRecipe]);
        setIsAddRecipeFormDisplayed(false);
    };

    const renderRecipeList = () => recipeList.map((r) =>
        // <li>Name: {r.name}<br/>
        //     Instructions: {r.instructions}</li>
        <li>{r.name}</li>
    );

    return (
        <div className="App">
            <h1 className="App-header">My Recipes</h1>
            {
                isAddRecipeFormDisplayed
                    ? addNewRecipeForm
                    : <button id="add-recipe"
                              onClick={() => setIsAddRecipeFormDisplayed(true)}> Add Recipe</button>
            }
            {
                recipeList.length > 0
                    ? <ul>
                        {renderRecipeList()}
                    </ul>
                    : <p>There are no recipes to list.</p>
            }
        </div>
    )
}

export default App;