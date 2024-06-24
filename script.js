let courseCount = 1;

document.getElementById('add-course').addEventListener('click', addCourse);
document.getElementById('calculate').addEventListener('click', calculateGPA);
document.getElementById('reset').addEventListener('click', resetForm);

function addCourse() {
    courseCount++;

    const coursesContainer = document.getElementById('courses-container');

    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';
    courseDiv.id = `course${courseCount}`;

    const courseNameInput = document.createElement('input');
    courseNameInput.type = 'text';
    courseNameInput.className = 'course-name';
    courseNameInput.placeholder = 'Course Name';
    courseNameInput.required = true;
    courseDiv.appendChild(courseNameInput);

    const gradeSelect = document.createElement('select');
    gradeSelect.className = 'grade-dropdown';
    gradeSelect.required = true;
    const grades = ['Grade', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
    });
    courseDiv.appendChild(gradeSelect);

    const creditsInput = document.createElement('input');
    creditsInput.type = 'number';
    creditsInput.className = 'credits';
    creditsInput.placeholder = 'Credits';
    creditsInput.required = true;
    courseDiv.appendChild(creditsInput);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.innerText = 'x';
    removeButton.className = 'remove-course';
    removeButton.addEventListener('click', () => removeCourse(courseDiv.id));
    courseDiv.appendChild(removeButton);

    coursesContainer.appendChild(courseDiv);
}

function removeCourse(courseId) {
    const courseDiv = document.getElementById(courseId);
    courseDiv.remove();
}

function calculateGPA() {
    const courses = [];
    const courseDivs = document.getElementsByClassName('course');

    for (let i = 0; i < courseDivs.length; i++) {
        const courseName = courseDivs[i].querySelector('.course-name').value.trim();
        const grade = courseDivs[i].querySelector('.grade-dropdown').value;
        const credits = parseFloat(courseDivs[i].querySelector('.credits').value);

        courses.push({
            courseName: courseName,
            grade: grade,
            credits: credits
        });
    }

    const gradeToPoints = {
        'A+': 4.0,
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'F': 0.0
    };

    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
        const grade = course.grade;
        const credits = course.credits;
        
        if (gradeToPoints.hasOwnProperty(grade)) {
            totalGradePoints += gradeToPoints[grade] * credits;
            totalCredits += credits;
        }
    });

    let gpa = 0;
    if (totalCredits > 0) {
        gpa = totalGradePoints / totalCredits;
    }

    const resultElement = document.getElementById('result');
    resultElement.innerText = `Your GPA is: ${gpa.toFixed(2)}`;

    
    if (gpa >= 3.8) {
        fireFireworks();
    }
}

function resetForm() {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';

    const resultElement = document.getElementById('result');
    resultElement.innerText = '';

    courseCount = 1;
    addCourse(); 
}

function fireFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);

  
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        fireworksContainer.appendChild(particle);

        const size = Math.floor(Math.random() * 20) + 5;
        const color = getRandomColor();

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;

       
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;

        // Randomize animation duration
        const duration = Math.random() * 2 + 1;
        particle.style.animation = `fireworkAnimation ${duration}s ease-out`;
    }

   
    setTimeout(() => {
        fireworksContainer.remove();
    }, 3000);
}

function getRandomColor() {
    const colors = ['#ff6347', '#ff7f50', '#ffa500', '#ffd700', '#ffdab9', '#f08080', '#20b2aa'];
    return colors[Math.floor(Math.random() * colors.length)];
}


addCourse();
