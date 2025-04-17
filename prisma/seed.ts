import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const authors = await prisma.author.createMany({
        data: [
            { name: "George Orwell", bio: "English novelist and essayist, known for his works '1984' and 'Animal Farm'." },
            { name: "Jane Austen", bio: "Renowned English novelist known for romantic fiction set among the British gentry." },
            { name: "Mark Twain", bio: "American writer famous for 'Adventures of Huckleberry Finn' and sharp wit." },
            { name: "J.K. Rowling", bio: "British author, best known for the Harry Potter fantasy series." },
            { name: "Fyodor Dostoevsky", bio: "Russian novelist known for exploring human psychology in 'Crime and Punishment'." },
            { name: "Ernest Hemingway", bio: "American novelist with a distinctive writing style, author of 'The Old Man and the Sea'." },
            { name: "Virginia Woolf", bio: "English writer and modernist icon, author of 'Mrs. Dalloway' and 'To the Lighthouse'." },
            { name: "Leo Tolstoy", bio: "Russian author of epic novels 'War and Peace' and 'Anna Karenina'." },
            { name: "Agatha Christie", bio: "Prolific British mystery writer, creator of Hercule Poirot and Miss Marple." },
            { name: "Haruki Murakami", bio: "Japanese author known for surreal and emotionally deep novels like 'Kafka on the Shore'." },
            { name: "Gabriel García Márquez", bio: "Colombian author of magical realism, famous for 'One Hundred Years of Solitude'." },
            { name: "Franz Kafka", bio: "German-speaking Bohemian writer, known for existential and absurdist fiction." },
        ]
    })

}

main()
    .then(() => {
        console.log('Seed complete.');
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        return prisma.$disconnect();
    });
