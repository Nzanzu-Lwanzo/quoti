# QUOTI

`Public Api built with NestJs to share quotes from books we love`

```ts

    const books = [
        { title: "1984", publishYear: 1949, edition: "1st", publishingHouse: "Secker & Warburg", publishingTown: "London"},
        { title: "Animal Farm", publishYear: 1945, edition: "1st", publishingHouse: "Secker & Warburg", publishingTown: "London", authors: ["George Orwell"] },
        { title: "Pride and Prejudice", publishYear: 1813, edition: "1st", publishingHouse: "T. Egerton", publishingTown: "London", authors: ["Jane Austen"] },
        { title: "Emma", publishYear: 1815, edition: "1st", publishingHouse: "John Murray", publishingTown: "London", authors: ["Jane Austen"] },
        { title: "Adventures of Huckleberry Finn", publishYear: 1884, edition: "1st", publishingHouse: "Chatto & Windus", publishingTown: "London", authors: ["Mark Twain"] },
        { title: "The Adventures of Tom Sawyer", publishYear: 1876, edition: "1st", publishingHouse: "American Publishing Company", publishingTown: "Hartford", authors: ["Mark Twain"] },
        { title: "Harry Potter and the Sorcerer's Stone", publishYear: 1997, edition: "1st", publishingHouse: "Bloomsbury", publishingTown: "London", authors: ["J.K. Rowling"] },
        { title: "Harry Potter and the Chamber of Secrets", publishYear: 1998, edition: "1st", publishingHouse: "Bloomsbury", publishingTown: "London", authors: ["J.K. Rowling"] },
        { title: "Crime and Punishment", publishYear: 1866, edition: "1st", publishingHouse: "The Russian Messenger", publishingTown: "Moscow", authors: ["Fyodor Dostoevsky"] },
        { title: "The Brothers Karamazov", publishYear: 1880, edition: "1st", publishingHouse: "The Russian Messenger", publishingTown: "Moscow", authors: ["Fyodor Dostoevsky"] },
        { title: "The Old Man and the Sea", publishYear: 1952, edition: "1st", publishingHouse: "Charles Scribner's Sons", publishingTown: "New York", authors: ["Ernest Hemingway"] },
        { title: "A Farewell to Arms", publishYear: 1929, edition: "1st", publishingHouse: "Charles Scribner's Sons", publishingTown: "New York", authors: ["Ernest Hemingway"] },
        { title: "Mrs. Dalloway", publishYear: 1925, edition: "1st", publishingHouse: "Hogarth Press", publishingTown: "London", authors: ["Virginia Woolf"] },
        { title: "To the Lighthouse", publishYear: 1927, edition: "1st", publishingHouse: "Hogarth Press", publishingTown: "London", authors: ["Virginia Woolf"] },
        { title: "War and Peace", publishYear: 1869, edition: "1st", publishingHouse: "The Russian Messenger", publishingTown: "Moscow", authors: ["Leo Tolstoy"] },
        { title: "Anna Karenina", publishYear: 1877, edition: "1st", publishingHouse: "The Russian Messenger", publishingTown: "Moscow", authors: ["Leo Tolstoy"] },
        { title: "Murder on the Orient Express", publishYear: 1934, edition: "1st", publishingHouse: "Collins Crime Club", publishingTown: "London", authors: ["Agatha Christie"] },
        { title: "And Then There Were None", publishYear: 1939, edition: "1st", publishingHouse: "Collins Crime Club", publishingTown: "London", authors: ["Agatha Christie"] },
        { title: "Kafka on the Shore", publishYear: 2002, edition: "1st", publishingHouse: "Shinchosha", publishingTown: "Tokyo", authors: ["Haruki Murakami"] },
        { title: "Norwegian Wood", publishYear: 1987, edition: "1st", publishingHouse: "Kodansha", publishingTown: "Tokyo", authors: ["Haruki Murakami"] },
        { title: "One Hundred Years of Solitude", publishYear: 1967, edition: "1st", publishingHouse: "Harper & Row", publishingTown: "New York", authors: ["Gabriel García Márquez"] },
        { title: "Love in the Time of Cholera", publishYear: 1985, edition: "1st", publishingHouse: "Alfred A. Knopf", publishingTown: "New York", authors: ["Gabriel García Márquez"] },

        // Not stored in db
        { title: "The Trial", publishYear: 1925, edition: "1st", publishingHouse: "Verlag Die Schmiede", publishingTown: "Berlin", authors: ["Franz Kafka"] },
        { title: "The Metamorphosis", publishYear: 1915, edition: "1st", publishingHouse: "Kurt Wolff Verlag", publishingTown: "Leipzig", authors: ["Franz Kafka"] },
        { title: "Collaborative Novel A", publishYear: 2020, edition: "1st", publishingHouse: "Global Books", publishingTown: "New York", authors: ["J.K. Rowling", "Stephen King"] }, // Example multi-author
        { title: "Collaborative Novel B", publishYear: 2021, edition: "2nd", publishingHouse: "Global Books", publishingTown: "London", authors: ["Jane Austen", "Mark Twain"] },
        { title: "The Garden of Forking Paths", publishYear: 1941, edition: "1st", publishingHouse: "Sur", publishingTown: "Buenos Aires", authors: ["Jorge Luis Borges"] },
        { title: "A Clean, Well-Lighted Place", publishYear: 1933, edition: "1st", publishingHouse: "Scribner", publishingTown: "New York", authors: ["Ernest Hemingway"] },
        { title: "The Waves", publishYear: 1931, edition: "1st", publishingHouse: "Hogarth Press", publishingTown: "London", authors: ["Virginia Woolf"] },
        { title: "What I Talk About When I Talk About Running", publishYear: 2007, edition: "1st", publishingHouse: "Kodansha", publishingTown: "Tokyo", authors: ["Haruki Murakami"] },
    ]

```