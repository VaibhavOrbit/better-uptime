import { prismaClient } from "db/client";
import { xAddBulk } from "redisstream/client";

async function main() {
    let websites = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true
        }
    })
    console.log(websites.length);
    await xAddBulk(websites.map(w => ({
        url: w.url,
        id: w.id
    })));
}

setInterval(() => {
    main()
}, 3 * 1000 * 60)

main()


// 1000 ms = 1 second
// 1000 * 60 = 60,000 ms = 1 minute
// 3 * 1000 * 60 = 180,000 ms = 3 minutes

// docker run -d -p 3892:2383 redis

// docker exec -it e40b1bba0b5e sh
//It’s basically like “SSH-ing” into a Docker container.

//psql -U postgres → opens a PostgreSQL client session inside that container as user postgres