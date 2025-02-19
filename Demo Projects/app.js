document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

/* ------------------ To-Do List ------------------ */
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    
    if (task === "") return;

    let list = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(this)">ลบ</button>`;
    list.appendChild(li);

    saveTasks();
    input.value = "";
}

function removeTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.innerText.replace("ลบ", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let list = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="removeTask(this)">ลบ</button>`;
        list.appendChild(li);
    });
}

/* ------------------ Student GPA Calculator ------------------ */
function calculateGPA() {
    try {
        let scores = [
            parseFloat(document.getElementById("score1").value),
            parseFloat(document.getElementById("score2").value),
            parseFloat(document.getElementById("score3").value),
            parseFloat(document.getElementById("score4").value),
            parseFloat(document.getElementById("score5").value)
        ];

        let credits = 3 * 5; // ทุกวิชา 3 หน่วยกิต
        let totalPoints = 0;
        let errorMessage = document.getElementById("errorMessage");

        errorMessage.style.display = "none"; // Hide error message if no error

        scores.forEach(score => {
            if (isNaN(score) || score < 0 || score > 100) {
                throw "กรุณากรอกคะแนนระหว่าง 0-100";
            }
            totalPoints += convertToGPA(score) * 3; // คะแนนแปลงเป็นเกรด แล้วคูณด้วยหน่วยกิต
        });

        let gpa = totalPoints / credits;
        document.getElementById("gpaResult").innerText = gpa.toFixed(2);
    } catch (error) {
        let errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
        errorMessage.innerText = error;
    }
}

function convertToGPA(score) {
    if (score >= 80) return 4.0;
    if (score >= 75) return 3.5;
    if (score >= 70) return 3.0;
    if (score >= 65) return 2.5;
    if (score >= 60) return 2.0;
    if (score >= 55) return 1.5;
    if (score >= 50) return 1.0;
    return 0.0;
}

function clearForm() {
    document.getElementById("gradeForm").reset();
    document.getElementById("gpaResult").innerText = "-";
    document.getElementById("errorMessage").style.display = "none";
}

/* ------------------ API Data Fetching ------------------ */
function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            let list = document.getElementById("userList");
            list.innerHTML = "";

            users.forEach(user => {
                let li = document.createElement("li");
                li.innerHTML = `
                    <strong>${user.name}</strong><br>
                    อีเมล: ${user.email}<br>
                    ที่อยู่: ${user.address.street}, ${user.address.city}, ${user.address.zipcode}<br><br>
                `;
                list.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

/* ------------------ Lottery Generator ------------------ */
let lotteryNumber = "";

function generateLottery() {
    lotteryNumber = Math.floor(100000 + Math.random() * 900000).toString();
    document.getElementById("lotteryNumber").innerText = "เลขที่ออก: " + lotteryNumber;
}

function checkLottery() {
    let guess = document.getElementById("userGuess").value;
    let resultText = (guess === lotteryNumber) ? "🎉 คุณถูกหวย! 🎉" : "❌ ไม่ถูกต้อง ลองใหม่!";
    document.getElementById("result").innerText = resultText;
}
