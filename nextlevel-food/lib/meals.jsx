import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";

const db = sql('meals.db');

export function getMeals() {
    return db.prepare('SELECT * FROM meals').all();
}
export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    //Create a slug and sanitize User Input for XSS Protection
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    /*const bufferedImage = await meal.image.arrayBuffer();

    s3.putObject({
        Bucket: '...',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });*/

    //Store uploaded images and store data in the database
    meal.image = fileName;

    db.prepare(
        `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
    ).run(meal);
}

