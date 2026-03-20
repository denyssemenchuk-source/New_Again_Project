import './style.css'

// --- Завдання 2: Змінні ---
let name: string = "Василь";
let admin: string = name;
console.log("Значення змінної admin:", admin);

// --- Завдання 3: Робота з API (Fetch) ---
let countiesData: any[] = [];

async function fetchCounties() {
    try {
        const response = await fetch('https://api.census.gov/data/2020/acs/acs5/profile?get=NAME&for=county:*');
        const data = await response.json();

        countiesData = data.slice(1).map((item: any[]) => ({
            name: item[0],
            state: item[1],
            county: item[2],
            code: item[1] + item[2]
        }));
        console.log("Дані API завантажені!");
    } catch (error) {
        console.error("Помилка завантаження даних:", error);
    }
}

function getCountyCode(countyName: string): string {
    const county = countiesData.find(c => c.name.toLowerCase() === countyName.trim().toLowerCase());
    return county ? county.code : "Округ не знайдено";
}

document.getElementById('search-btn')?.addEventListener('click', () => {
    const inputElement = document.getElementById('county-input') as HTMLInputElement;
    const code = getCountyCode(inputElement.value);

    const resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.textContent = `Код округу: ${code}`;
});
fetchCounties(); // Запуск завантаження при старті

// --- Завдання 4: Валідація форми ---
document.getElementById('user-form')?.addEventListener('submit', function(event: Event) {
    const firstName = (document.getElementById('first_name') as HTMLInputElement).value.trim();
    const lastName = (document.getElementById('last_name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();

    if (!firstName || !lastName || !email) {
        event.preventDefault();
        alert('Помилка: Будь ласка, заповніть усі поля!');
    } else {
        event.preventDefault();
        alert(`Дані користувача:\nІм'я: ${firstName}\nПрізвище: ${lastName}\nEmail: ${email}`);
    }
});

// --- Завдання 5: Анімація ---
let currentPosition = 0;
const box = document.getElementById('elid') as HTMLDivElement;

document.getElementById('btn-left')?.addEventListener('click', () => {
    if (box) {
        currentPosition -= 100;
        box.style.left = currentPosition + 'px';
    }
});

document.getElementById('btn-right')?.addEventListener('click', () => {
    if (box) {
        currentPosition += 100;
        box.style.left = currentPosition + 'px';
    }
});