
// Cargar la info guaradada en Local Storage
async function loadPreviousWorkout() {
  const card = document.getElementById("card");
  card.textContent = "";

  try {
    const response = await fetch("exercises.json");
    const exerciseData = await response.json();

    const storedWorkout = JSON.parse(localStorage.getItem("exercisesGenerated"));

    if (storedWorkout) {
      for (const exerciseName of storedWorkout) {
        const workoutItem = document.createElement("li");
        workoutItem.textContent = exerciseName;
        card.appendChild(workoutItem);
      }
    } else {
      card.textContent = "No previous workout found. Generate a new one.";
    }
  } catch (error) {
    console.error("Error loading previous workout:", error);
    card.textContent = "Error loading previous workout.";
  }
}


// Función para generar workouts random
async function getRandomItems() {
  const card = document.getElementById("card");
  card.textContent = "";

  try {
    const response = await fetch("exercises.json");
    const exercisesGenerated = await response.json();

    const selectedCategories = [];

    if (document.getElementById("check-bicep").checked) {
      selectedCategories.push("bicep");
    }
    if (document.getElementById("check-tricep").checked) {
      selectedCategories.push("tricep");
    }
    if (document.getElementById("check-chest").checked) {
      selectedCategories.push("chest");
    }
    if (document.getElementById("check-shoulder").checked) {
      selectedCategories.push("shoulder");
    }
    if (document.getElementById("check-leg").checked) {
      selectedCategories.push("leg");
    }


    if (selectedCategories.length === 0) {
      card.textContent = "Choose one or more muscle groups";
    } else {
      let generatedWorkout = [];

      for (let i = 0; i < 4; i++) {
        const randomCategory =
          selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
        const randomExercise =
          exercisesGenerated[randomCategory][
          Math.floor(Math.random() * exercisesGenerated[randomCategory].length)
          ];

        generatedWorkout.push(randomExercise.name);
        const workoutItem = document.createElement("li");
        workoutItem.textContent = randomExercise.name;
        card.appendChild(workoutItem);
      }

      // Almacenar en Local Storage
      localStorage.setItem("exercisesGenerated", JSON.stringify(generatedWorkout));
    }
  } catch (error) {
    console.error("Error generating random workout:", error);
    card.textContent = "Error generating random workout.";
  }
}
