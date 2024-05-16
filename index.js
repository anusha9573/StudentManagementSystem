const apiUrl = 'http://localhost:3000/students';

document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
});

async function fetchStudents() {
    try {
        const response = await axios.get(apiUrl);
        const students = response.data;
        const studentList = document.getElementById('student-list');
        studentList.innerHTML = '';
        students.forEach(student => {
            addRow(student);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

function addRow(student) {
    const studentList = document.getElementById('student-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${student.roll}</td>
        <td>${student.name}</td>
        <td>${student.branch}</td>
        <td>${student.gpa}</td>
        <td>
        <button class="action-button" onclick="editStudent('${student.roll}')"><i class="fas fa-edit"></i></button>
        <button class="action-button delete-button" onclick="deleteStudent('${student.roll}')"><i class="fas fa-trash-alt"></i></button>
        </td>
    `;
    studentList.appendChild(row);
}

async function addStudent() {
    const roll = document.getElementById('roll').value;
    const name = document.getElementById('name').value;
    const branch = document.getElementById('branch').value;
    const gpa = document.getElementById('gpa').value;

    if (roll && name && branch && gpa) {
        try {
            const response = await axios.post(apiUrl, { roll, name, branch, gpa });
            addRow(response.data);
            clearInputs();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    } else {
        alert('Please fill in all fields.');
    }
}

async function editStudent(roll) {
    const newName = prompt('Enter new name:');
    if (newName) {
        try {
            const response = await axios.patch(`${apiUrl}/${roll}`, { name: newName });
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    }
}

async function deleteStudent(roll) {
    try {
        await axios.delete(`${apiUrl}/${roll}`);
        fetchStudents();
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

//--

function clearInputs() {
    document.getElementById('roll').value = '';
    document.getElementById('name').value = '';
    document.getElementById('branch').value = '';
    document.getElementById('gpa').value = '';
}
