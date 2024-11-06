function validateForm() {
    const name = document.getElementById('name');
    const variant = document.getElementById('variant');
    const group = document.getElementById('group');
    const phone = document.getElementById('phone');
    const idCard = document.getElementById('idCard');
    const namePattern = /^[А-ЯІЇЄ][а-яіїє]{1,20}\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$/;
    const variantPattern = /^\d{1,2}$/;
    const groupPattern = /^[А-ЯІЇЄ]{2}-\d{2}$/;
    const phonePattern = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
    const idCardPattern = /^[А-ЯІЇЄ]{2}\s№\d{6}$/;
    let isValid = true;

    function checkField(field, pattern, errorElement, errorMessage) {
        if (!pattern.test(field.value)) {
            field.classList.add("error-border");
            errorElement.textContent = errorMessage;
            errorElement.style.display = "block";
            isValid = false;
        } else {
            field.classList.remove("error-border");
            errorElement.style.display = "none";
        }
    }

    checkField(name, namePattern, document.getElementById('nameError'), "ПІБ має бути у форматі 'Прізвище І.Б.'");
    checkField(variant, variantPattern, document.getElementById('variantError'), "Варіант має містити 1 або 2 цифри");
    checkField(group, groupPattern, document.getElementById('groupError'), "Група має бути у форматі 'ТТ-ЧЧ'");
    checkField(phone, phonePattern, document.getElementById('phoneError'), "Телефон має бути у форматі '(ЧЧЧ)-ЧЧЧ-ЧЧ-ЧЧ'");
    checkField(idCard, idCardPattern, document.getElementById('idCardError'), "ID-картка має бути у форматі 'ТТ №ЧЧЧЧЧЧ'");

    if (isValid) {
        document.getElementById('infoForm').submit();
    }
}
if (window.location.pathname.endsWith("result.html")) {
    window.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        document.getElementById('nameOutput').textContent = params.get('name');
        document.getElementById('variantOutput').textContent = params.get('variant');
        document.getElementById('groupOutput').textContent = params.get('group');
        document.getElementById('phoneOutput').textContent = params.get('phone');
        document.getElementById('idCardOutput').textContent = params.get('idCard');
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('table');
    const colorPicker = document.getElementById('colorPicker');
    const variantNumber = 1;
    let counter = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('td');
            cell.textContent = counter;
            cell.addEventListener('mouseover', () => {
                if (parseInt(cell.textContent) === variantNumber) {
                    cell.style.backgroundColor = getRandomColor();
                }
            });
            cell.addEventListener('click', () => {
                if (parseInt(cell.textContent) === variantNumber) {
                    cell.style.backgroundColor = colorPicker.value;
                }
            });
            cell.addEventListener('dblclick', () => {
                if (parseInt(cell.textContent) === variantNumber) {
                    const rowCells = cell.parentNode.children;
                    for (const rowCell of rowCells) {
                        rowCell.style.backgroundColor = colorPicker.value;
                    }
                }
            });
            row.appendChild(cell);
            counter++;
        }
        table.appendChild(row);
    }
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
