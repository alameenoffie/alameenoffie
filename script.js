let data = [];

// تحميل ملف Excel وتحويله لبيانات قابلة للبحث
async function loadExcel() {
    try {
        const response = await fetch("data.xlsx");
        if (!response.ok) throw new Error("تعذر تحميل ملف Excel.");
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(firstSheet);
        
        console.log("تم تحميل البيانات بنجاح:", data); // تأكيد تحميل البيانات
    } catch (error) {
        console.error("خطأ في تحميل البيانات:", error);
        alert("حدث خطأ أثناء تحميل ملف Excel. تحقق من مسار الملف.");
    }
}

function search() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const results = data.filter(row => Object.values(row).some(
        cell => cell.toString().toLowerCase().includes(query)
    ));
    
    console.log("نتائج البحث:", results); // عرض نتائج البحث في وحدة التحكم
    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.textContent = "لم يتم العثور على نتائج.";
        return;
    }

    results.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.textContent = JSON.stringify(row);
        resultsDiv.appendChild(rowDiv);
    });
}

// تحميل البيانات عند فتح الصفحة
window.onload = loadExcel;
