# **Телеграм бот Уральского Гуманитарного Университета**
Ваше утро начнётся не с кофе, а с расписания пар

## **Использование**
Для использования бота нужно добавить бота `@GuUral_bot` ваш ТГ канал, либо написать ему. Запускается он командой `/start`,
в случае с чатом, нужно написать `/start@GuUral_bot`.  
Выберите группу и всё, вы молодец, завтра в 8 утра вам придёт расписание.

Бот шлёт расписание на сегодня и на завтра, если сегодня и завтра пар нет, то бот вас не побеспокоит

### **Апи**
Если вы хотите написать бота для другой платформы или вообще для чего-то другого, вы можете использовать наше Апи  
Домен: guural.ru  
**/getSchedule**  
_Получение расписания_  
```
form!: string
speciality!: string
course!: string
group!: string
normalize?: boolean
```
**/getGroup**  
_Получение групп_  
```
form!: string
speciality!: string
course!: string
```

## **Участие в проекте**
Бот разрабатывается под открытой лицензией, по этому можете присылать ваши пул реквесты.

### **Установка**
Клонируйте репозиторий к себе на сервер
```bash
npm install # Установит зависимости
cp .env.example .env # Создаст окружение
# Заполните .env
npx sequelize-cli db:migrate # Запустит миграции (создание в БД нужных таблиц и полей)
npm start # Запуск приложения

# Для настройки https на ноде
npx greenlock init --config-dir greenlock.d --maintainer-email jon@example.com
npx greenlock add --subject example.com --altnames example.com
```
jon@example.com — ваш email  
example.com — ваш домен

### **О порядке разработки**
Если у вас есть какие-то замечания, дополнения или фиксы, 
создавайте ветку от dev, проверьте, что я это ещё не поправил, поправьте и создавайте пул реквест.  
Все, кто принял участие в разработке, будут указаны на этой станице.

## **Капитальные красавчики**
- [@polyskalov](https://github.com/polyskalov) — помогал с БД

## **Лицензия**
MIT. Делайте с этим чё хотите, но не закрывайте код

***

**Если есть какие-то вопросы, пишите мне в ТГ @gurievvlad**