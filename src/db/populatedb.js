import { Client } from "pg";
import "dotenv/config";

const client = new Client({ connectionString: process.env.DATABASE_URL });

const clearTables = `TRUNCATE TABLE game_genres, game_platforms, games, genres, platforms
                     RESTART IDENTITY CASCADE`;

const seedGenres = `INSERT INTO genres (name) VALUES
                      ('Action'),
                      ('RPG'),
                      ('Sports'),
                      ('Strategy'),
                      ('Adventure'),
                      ('Puzzle'),
                      ('Fighting'),
                      ('Horror'),
                      ('Simulation'),
                      ('Racing')`;

const seedPlatforms = `INSERT INTO platforms (name) VALUES
                        ('PC'),
                        ('PS5'),
                        ('PS4'),
                        ('Xbox Series X'),
                        ('Xbox One'),
                        ('Nintendo Switch')`;

const main = async () => {
  console.log("Seeding...");
  await client.connect();
  await client.query(clearTables);
  await client.query(seedGenres);
  await client.query(seedPlatforms);

  // 1. Elden Ring
  const eldenRing = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Elden Ring",
      "FromSoftware",
      "Bandai Namco",
      "2022-02-25",
      59.99,
      10,
      "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
      "A dark fantasy action RPG set in the Lands Between, featuring brutal combat and a vast open world.",
    ],
  );
  const eldenRingId = eldenRing.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id) 
    VALUES ($1, $2), ($1, $3)`,
    [eldenRingId, 1, 2],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4)`,
    [eldenRingId, 1, 2, 4],
  );

  // 2. The Legend of Zelda: Breath of the Wild
  const zelda = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "The Legend of Zelda: Breath of the Wild",
      "Nintendo",
      "Nintendo",
      "2017-03-03",
      59.99,
      15,
      "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
      "An open-world adventure game where Link explores the vast kingdom of Hyrule to defeat Calamity Ganon.",
    ],
  );
  const zeldaId = zelda.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2), ($1, $3)`,
    [zeldaId, 5, 1],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2)`,
    [zeldaId, 6],
  );

  // 3. FIFA 24
  const fifa = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "FIFA 24",
      "EA Sports",
      "Electronic Arts",
      "2023-09-29",
      69.99,
      20,
      "https://upload.wikimedia.org/wikipedia/en/a/a5/EA_Sports_FC_24_cover.jpg",
      "The world's most popular football simulation game featuring thousands of licensed teams and players.",
    ],
  );
  const fifaId = fifa.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2)`,
    [fifaId, 3],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)`,
    [fifaId, 1, 2, 3, 4],
  );

  // 4. Minecraft
  const minecraft = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Minecraft",
      "Mojang Studios",
      "Xbox Game Studios",
      "2011-11-18",
      29.99,
      25,
      "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
      "A sandbox survival game where players build and explore procedurally generated worlds made of blocks.",
    ],
  );
  const minecraftId = minecraft.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2), ($1, $3)`,
    [minecraftId, 9, 5],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, $6), ($1, $7)`,
    [minecraftId, 1, 2, 3, 4, 5, 6],
  );

  // 5. God of War Ragnarök
  const gow = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "God of War Ragnarök",
      "Santa Monica Studio",
      "Sony Interactive Entertainment",
      "2022-11-09",
      69.99,
      12,
      "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Rakar%C3%B6k_cover.jpg",
      "Kratos and Atreus journey through the Nine Realms to prevent the prophesied end of the world.",
    ],
  );
  const gowId = gow.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2), ($1, $3)`,
    [gowId, 1, 5],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3)`,
    [gowId, 2, 3],
  );

  // 6. Hades
  const hades = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Hades",
      "Supergiant Games",
      "Supergiant Games",
      "2020-09-17",
      24.99,
      18,
      "https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg",
      "A rogue-like dungeon crawler where you play as the son of Hades attempting to escape the Underworld.",
    ],
  );
  const hadesId = hades.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2), ($1, $3)`,
    [hadesId, 1, 2],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3)`,
    [hadesId, 1, 6],
  );

  // 7. Stardew Valley
  const stardew = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Stardew Valley",
      "ConcernedApe",
      "ConcernedApe",
      "2016-02-26",
      14.99,
      22,
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png",
      "A farming simulation RPG where you build and manage a farm, explore caves, and form relationships with townspeople.",
    ],
  );
  const stardewId = stardew.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2)`,
    [stardewId, 9],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)`,
    [stardewId, 1, 3, 5, 6],
  );

  // 8. Street Fighter 6
  const sf6 = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Street Fighter 6",
      "Capcom",
      "Capcom",
      "2023-06-02",
      59.99,
      14,
      "https://upload.wikimedia.org/wikipedia/en/6/6e/Street_Fighter_6_cover.jpg",
      "The newest entry in the iconic fighting game series, featuring new characters and a dynamic fighting system.",
    ],
  );
  const sf6Id = sf6.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2)`,
    [sf6Id, 7],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)`,
    [sf6Id, 1, 2, 3, 4],
  );

  // 9. Resident Evil 4
  const re4 = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Resident Evil 4",
      "Capcom",
      "Capcom",
      "2023-03-24",
      59.99,
      11,
      "https://upload.wikimedia.org/wikipedia/en/3/33/Resident_Evil_4_remake_cover_art.jpg",
      "A reimagining of the classic survival horror game following Leon Kennedy on a mission to rescue the President's daughter.",
    ],
  );
  const re4Id = re4.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2), ($1, $3)`,
    [re4Id, 8, 1],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)`,
    [re4Id, 1, 2, 3, 4],
  );

  // 10. Mario Kart 8 Deluxe
  const mk8 = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Mario Kart 8 Deluxe",
      "Nintendo",
      "Nintendo",
      "2017-04-28",
      59.99,
      30,
      "https://upload.wikimedia.org/wikipedia/en/5/56/Mario_Kart_8_Deluxe_box_art.jpg",
      "The definitive kart racing experience featuring beloved Nintendo characters across 48 thrilling courses.",
    ],
  );
  const mk8Id = mk8.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2)`,
    [mk8Id, 10],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2)`,
    [mk8Id, 6],
  );

  // 11. Civilization VI
  const civ6 = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Civilization VI",
      "Firaxis Games",
      "2K Games",
      "2016-10-21",
      49.99,
      8,
      "https://upload.wikimedia.org/wikipedia/en/7/7f/Civilization_VI_cover_art.jpg",
      "Build an empire to stand the test of time in this turn-based strategy game spanning all of human history.",
    ],
  );
  const civ6Id = civ6.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2)`,
    [civ6Id, 4],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)`,
    [civ6Id, 1, 3, 5, 6],
  );

  // 12. Tetris Effect: Connected
  const tetris = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Tetris Effect: Connected",
      "Enhance Games",
      "Enhance Games",
      "2021-10-08",
      39.99,
      9,
      "https://upload.wikimedia.org/wikipedia/en/4/4f/Tetris_Effect_Connected_cover.jpg",
      "A stunning reimagining of the classic puzzle game with mesmerizing music and visuals that react to your play.",
    ],
  );
  const tetrisId = tetris.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2)`,
    [tetrisId, 6],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4)`,
    [tetrisId, 1, 2, 3],
  );

  // 13. NBA 2K24
  const nba = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "NBA 2K24",
      "Visual Concepts",
      "2K Sports",
      "2023-09-08",
      69.99,
      16,
      "https://upload.wikimedia.org/wikipedia/en/6/6e/NBA_2K24_cover.jpg",
      "The premier basketball simulation game featuring NBA and WNBA teams with realistic gameplay and career modes.",
    ],
  );
  const nbaId = nba.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2)`,
    [nbaId, 3],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)`,
    [nbaId, 1, 2, 3, 4],
  );

  // 14. Hollow Knight
  const hollow = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Hollow Knight",
      "Team Cherry",
      "Team Cherry",
      "2017-02-24",
      14.99,
      19,
      "https://upload.wikimedia.org/wikipedia/en/8/8b/Hollow_Knight_first_cover.jpg",
      "A challenging action-adventure game set in a vast underground kingdom of insects and heroes.",
    ],
  );
  const hollowId = hollow.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2), ($1, $3)`,
    [hollowId, 1, 5],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)`,
    [hollowId, 1, 3, 5, 6],
  );

  // 15. Cyberpunk 2077
  const cyberpunk = await client.query(
    `INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      "Cyberpunk 2077",
      "CD Projekt Red",
      "CD Projekt",
      "2020-12-10",
      49.99,
      13,
      "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
      "An open-world action RPG set in the dystopian Night City where you play as mercenary V fighting for survival.",
    ],
  );
  const cyberpunkId = cyberpunk.rows[0].id;

  await client.query(
    `INSERT INTO game_genres (game_id, genre_id)
    VALUES ($1, $2), ($1, $3)`,
    [cyberpunkId, 2, 1],
  );

  await client.query(
    `INSERT INTO game_platforms (game_id, platform_id)
    VALUES ($1, $2), ($1, $3), ($1, $4)`,
    [cyberpunkId, 1, 2, 4],
  );

  await client.end();
  console.log("Done.");
};

main().catch((error) => {
  console.error("Seeding failed: ", error);
  process.exit(1);
});
