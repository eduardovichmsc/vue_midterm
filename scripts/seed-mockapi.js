import { initialBooks } from "../src/services/mockData.js";

const BASE_URL = "https://6ad67c77f71f154ac486daeb.mockapi.io/api";

async function seed() {
  console.log("🔍 Проверяем доступность ресурса /books на вашем MockAPI...");
  try {
    const testRes = await fetch(`${BASE_URL}/books`);
    if (testRes.status === 404) {
      console.log("\n⚠️ Внимание: ресурс 'books' пока не создан в панели MockAPI!");
      console.log("👉 Шаги:");
      console.log("1. Откройте ваш проект на mockapi.io");
      console.log("2. Нажмите синюю кнопку 'New Resource'");
      console.log("3. В поле Resource name напишите: books");
      console.log("4. Нажмите 'Create' внизу");
      console.log("5. Запустите этот скрипт снова: node scripts/seed-mockapi.js\n");
      return;
    }

    console.log("🚀 Начинаем импорт 12 книг в MockAPI...\n");
    for (const book of initialBooks) {
      const res = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        console.log(`✅ [${book.id}/12] Добавлена: "${book.title}" (${book.author})`);
      } else {
        console.error(`❌ Ошибка добавления "${book.title}":`, res.statusText);
      }
    }
    console.log("\n🎉 Готово! Все книги теперь реально живут на сервере MockAPI.io!");
  } catch (err) {
    console.error("Ошибка сети:", err.message);
  }
}

seed();
