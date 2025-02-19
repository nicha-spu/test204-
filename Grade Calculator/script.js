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
        
        scores.forEach(score => {
            if (isNaN(score) || score < 0 || score > 100) throw "กรุณากรอกคะแนนระหว่าง 0-100";
            totalPoints += convertToGPA(score) * 3; // คะแนนแปลงเป็นเกรด แล้วคูณด้วยหน่วยกิต
        });

        let gpa = totalPoints / credits;
        document.getElementById("gpaResult").innerText = gpa.toFixed(2);
    } catch (error) {
        alert(error);
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
