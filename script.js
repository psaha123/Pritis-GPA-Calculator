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
    courseNameInput.className = 'course-name'; // Class name changed to 'course-name'
    courseNameInput.placeholder = 'Course Name'; // Placeholder updated
    courseNameInput.required = true;
    courseDiv.appendChild(courseNameInput);

    const gradeSelect = document.createElement('select');
    gradeSelect.className = 'grade-dropdown'; // Class name corrected to 'grade-dropdown'
    gradeSelect.required = true;
    const grades = ['Grade', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F']; // Updated dropdown options
    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
    });
    courseDiv.appendChild(gradeSelect);

    const creditsInput = document.createElement('input');
    creditsInput.type = 'number';
    creditsInput.className = 'credits'; // Class name corrected to 'credits'
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
        const courseName = courseDivs[i].querySelector('.course-name').value.trim(); // Changed to get course name input
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

    let letterEquivalent = '';

    if (gpa >= 97) {
        letterEquivalent = 'A+';
    } else if (gpa >= 93) {
        letterEquivalent = 'A';
    } else if (gpa >= 90) {
        letterEquivalent = 'A-';
    } else if (gpa >= 87) {
        letterEquivalent = 'B+';
    } else if (gpa >= 83) {
        letterEquivalent = 'B';
    } else if (gpa >= 80) {
        letterEquivalent = 'B-';
    } else if (gpa >= 77) {
        letterEquivalent = 'C+';
    } else if (gpa >= 73) {
        letterEquivalent = 'C';
    } else if (gpa >= 70) {
        letterEquivalent = 'C-';
    } else if (gpa >= 67) {
        letterEquivalent = 'D+';
    } else if (gpa >= 65) {
        letterEquivalent = 'D';
    } else {
        letterEquivalent = 'F';
    }

    const resultElement = document.getElementById('result');
    resultElement.innerText = `Your GPA is: ${gpa.toFixed(2)} (${letterEquivalent})`;
}

function resetForm() {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';

    const resultElement = document.getElementById('result');
    resultElement.innerText = '';

    courseCount = 1;
    addCourse(); // Re-add the initial course input
}

// Initialize with one course
addCourse();
